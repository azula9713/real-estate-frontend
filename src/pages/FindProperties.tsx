import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { authState } from "../atoms/globalAtoms";
import { allListingsState } from "../atoms/listingAtoms";
import { DropDown, Paginate, TextField } from "../components/common";
import ListingCard from "../components/home/ListingCard";
import { listingPurpose, propertyType } from "../data/listingPurpose";
import { IDistrict } from "../interfaces/CityInterface";
import { IListing } from "../interfaces/ListingInterface";
import MainLayout from "../layout/MainLayout";
import ListingServices from "../services/ListingService";
import UserServices from "../services/UserServices";
import CityUtils from "../utils/locationUtils";

function FindProperties() {
  const sortings = [
    {
      label: "Newest",
      value: "newest",
    },
    {
      label: "Oldest",
      value: "oldest",
    },
    {
      label: "Price: Low to High",
      value: "priceLowToHigh",
    },
    {
      label: "Price: High to Low",
      value: "priceHighToLow",
    },
  ];

  const districts = CityUtils.getAllDistricts();

  const [auth, setAuth] = useRecoilState(authState);
  const [allListings, setAllListings] = useRecoilState(allListingsState);

  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  const [selectedDistrict, setSelectedDistrict] = useState<IDistrict | "all">(
    "all"
  );
  const [selectedSorting, setSelectedSorting] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentListings, setCurrentListings] = useState<IListing[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("all");
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<string>("all");

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

    // filter by property type
    if (selectedPropertyType !== "all") {
      items = items.filter(
        (listing) => listing.propertyType === selectedPropertyType
      );
    }

    const arrayForSorting = [...items];

    switch (selectedSorting) {
      case "newest":
        items = arrayForSorting.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        items = arrayForSorting.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;

      case "priceLowToHigh":
        items = arrayForSorting.sort((a, b) => a.price - b.price);
        break;

      case "priceHighToLow":
        items = arrayForSorting.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    setCurrentListings(paginatedItems);
  };

  const fetchListings = async () => {
    const response: IListing[] = await ListingServices.GetAllListings();
    if (response) {
      // make sure only isAcceptd and isPublished listings are shown
      const filtered = response.filter(
        (listing) => listing.isAccepted && listing.isPublished
      );
      setAllListings(filtered);

      // update view count
      filtered.forEach((listing) => {
        ListingServices.UpdateListing({
          ...listing,
          clickCount: listing.clickCount + 1,
        });
      });
    }
  };

  const saveFilters = async () => {
    // save filters to user

    if (!auth.user) return;
    if (!minPriceRef.current || !maxPriceRef.current) return;

    const response = await UserServices.UpdateUser({
      ...auth.user,
      //append to saved filters array end of the array if the same filter is not already saved
      savedFilters: [
        ...auth.user.savedFilters.filter((filter) => {
          if (
            filter.location.city === selectedCity &&
            filter.location.district === selectedDistrict &&
            filter.propertyType === selectedPropertyType &&
            filter.listingType === selectedPurpose
          ) {
            alert("Filter already saved");
            return false;
          }
          return true;
        }),
        {
          location: {
            city: selectedCity,
            district: selectedDistrict,
          },
          priceRange: {
            min: +minPriceRef.current?.value,
            max: +maxPriceRef.current?.value,
          },
          propertyType: selectedPropertyType,
          listingType: selectedPurpose,
        },
      ],
    });

    if (response) {
      setAuth({
        isAuth: true,
        user: response,
      });
    }
  };

  const addToFavourites = async (listingId: string) => {
    const user = auth.user;

    await UserServices.UpdateUser({
      ...user,
      savedListings: user.savedListings?.includes(listingId)
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
    selectedPropertyType,
    selectedSorting,
  ]);

  return (
    <MainLayout>
      {/* add filters for location and  */}
      <div className="flex flex-col lg:flex-row w-auto lg:px-12">
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
        <DropDown
          label="Property Type"
          id="propertyType"
          items={[
            {
              label: "All Property Types",
              value: "all",
            },
            ...propertyType,
          ]}
          value={selectedPropertyType}
          onChange={(e) => setSelectedPropertyType(e.target.value)}
        />
        {/* set price filter min max */}

        <TextField
          label="Min Price in LKR"
          type="number"
          id="minPrice"
          placeholder="0"
          elementRef={minPriceRef}
        />
        <TextField
          label="Max Price in LKR"
          type="number"
          id="maxPrice"
          placeholder="0"
          elementRef={maxPriceRef}
        />
      </div>

      {/* save filters button */}
      <div className="flex flex-col md:flex-row justify-end w-full px-4 lg:px-16 lg:space-x-4 space-y-4 md:space-y-0">
        <div className="flex space-x-2 items-center justify-start w-full lg:w-auto">
          <label htmlFor="sorting" className="text-white font-semibold">
            Sort By
          </label>
          <select
            id="sorting"
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onChange={(e) => setSelectedSorting(e.target.value)}
          >
            {sortings.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        </div>
        {auth.isAuth && (
          <button
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={saveFilters}
          >
            <FunnelIcon className="h-6 w-6" />
            Save Filter
          </button>
        )}
      </div>

      <div className="m-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentListings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            user={auth.user}
            addToFavourites={() => addToFavourites(listing._id)}
          />
        ))}
      </div>
      {allListings.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-4xl font-bold text-gray-500">
            No Listings Found
          </h1>
        </div>
      ) : (
        <Paginate
          currentPage={currentPage}
          totalPages={Math.ceil(allListings.length / ITEMS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
      )}
    </MainLayout>
  );
}

export default FindProperties;
