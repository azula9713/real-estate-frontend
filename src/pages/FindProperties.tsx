import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { authState } from "../atoms/globalAtoms";
import { allListingsState } from "../atoms/listingAtoms";
import { DropDown, Paginate } from "../components/common";
import ListingCard from "../components/home/ListingCard";
import listingPurpose from "../data/listingPurpose";
import { IDistrict } from "../interfaces/CityInterface";
import { IListing } from "../interfaces/ListingInterface";
import MainLayout from "../layout/MainLayout";
import ListingServices from "../services/ListingService";
import UserServices from "../services/UserServices";
import CityUtils from "../utils/locationUtils";

function FindProperties() {
  const districts = CityUtils.getAllDistricts();

  const [auth, setAuth] = useRecoilState(authState);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentListings, setCurrentListings] = useState<IListing[]>([]);
  const [allListings, setAllListings] = useRecoilState(allListingsState);

  const [selectedDistrict, setSelectedDistrict] = useState<IDistrict | "all">(
    "all"
  );
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("all");

  const cities = CityUtils.getCitiesByDistrict(selectedDistrict);
  const ITEMS_PER_PAGE = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginate = (items: IListing[], pageNumber: number) => {
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;

    // filter by district
    if (selectedDistrict !== "all") {
      //check if postal code is under the selected district
      items = items.filter((listing) =>
        cities.find((city) => city.code === listing.location)
      );
    }

    // filter by city
    if (selectedCity !== "all") {
      items = items.filter((listing) => listing.location === selectedCity);
    }

    // filter by purpose
    if (selectedPurpose !== "all") {
      items = items.filter(
        (listing) => listing.listingType === selectedPurpose
      );
    }

    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setCurrentListings(paginatedItems);
  };

  const fetchListings = async () => {
    const response = await ListingServices.GetAllListings();
    if (response) {
      setAllListings(response);
    }
  };

  const updateClickCount = async (listing: IListing) => {
    // check if the creator is the one who is clicking
    if (listing.createdBy._id === auth.user._id) {
      return;
    }

    const { _id } = listing;
    const newCount = listing.clickCount + 1;

    await ListingServices.UpdateListing(
      {
        ...listing,
        clickCount: newCount,
      },
      _id
    ).then(() => {
      fetchListings();
    });
  };

  const addToFavourites = async (listingId: string) => {
    const user = auth.user;

    await UserServices.UpdateUser({
      ...user,
      savedListings: user.savedListings.includes(listingId)
        ? user.savedListings.filter((id) => id !== listingId)
        : [...user.savedListings, listingId],
    }).then((response) => {
      setAuth({
        isAuth: true,
        user: response,
      });
    });
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    paginate(allListings, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allListings,
    currentPage,
    selectedDistrict,
    selectedCity,
    selectedPurpose,
  ]);

  return (
    <MainLayout>
      {/* add filters for location and  */}
      <div className="flex flex-col lg:flex-row w-auto">
        <DropDown
          label="District"
          id="district"
          items={[
            {
              label: "All of Sri Lanka",
              value: "all",
            },
            ...districts.map((district) => ({
              label: district,
              value: district,
            })),
          ]}
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value as IDistrict);
            setSelectedCity("all");
          }}
        />
        {selectedDistrict !== "all" && (
          <DropDown
            label="City"
            id="city"
            items={[
              {
                label: `All of ${selectedDistrict}`,
                value: "all",
              },
              ...cities.map((city) => ({
                label: city.city,
                value: city.code,
              })),
            ]}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          />
        )}
        <DropDown
          label="Purpose"
          id="purpose"
          items={[
            {
              label: "All Purpose",
              value: "all",
            },
            ...listingPurpose,
          ]}
          value={selectedPurpose}
          onChange={(e) => setSelectedPurpose(e.target.value as IDistrict)}
        />
      </div>

      <div className="m-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentListings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            onClick={() => updateClickCount(listing)}
            user={auth.user}
            addToFavourites={() => addToFavourites(listing._id)}
          />
        ))}
      </div>
      <Paginate
        currentPage={currentPage}
        totalPages={Math.ceil(allListings.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
      />
    </MainLayout>
  );
}

export default FindProperties;
