import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { authState } from "../atoms/globalAtoms";
import { IListing } from "../interfaces/ListingInterface";
import MainLayout from "../layout/MainLayout";
import ListingServices from "../services/ListingService";
import UserServices from "../services/UserServices";
import CityUtils from "../utils/locationUtils";

function ViewListing() {
  // get listingID from URL

  // path: "/listing/view/:id",
  const { id } = useParams();

  const [auth, setAuth] = useRecoilState(authState);
  const [currentListing, setCurrentListing] = useState<IListing | null>(null);

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
    const updateClickCount = async (listing: IListing) => {
      // check if the creator is the one who is clicking
      if (listing.createdBy._id === auth.user._id) {
        return;
      }

      const newCount = listing.clickCount + 1;

      await ListingServices.UpdateListing({
        ...listing,
        clickCount: newCount,
      });
    };

    const fetchListing = async () => {
      if (!id) return;
      const listing: IListing = await ListingServices.GetListing(id);
      if (listing) {
        setCurrentListing(listing);
        updateClickCount(listing);
      }
    };

    fetchListing();
  }, [id, auth]);

  return (
    <MainLayout>
      <section className="text-white body-font overflow-hidden bg-gray-800">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-600 h-80">
              <Carousel>
                {currentListing?.photos.map((photo, index) => (
                  <img
                    key={index}
                    alt="ecommerce"
                    className="w-full object-cover object-center rounded border border-gray-600"
                    src={photo}
                  />
                ))}
              </Carousel>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-300 tracking-widest">
                {
                  CityUtils.getCityByPostalCode(
                    currentListing?.location as string
                  )?.city
                }
              </h2>
              <h1 className="text-gray-100 text-3xl lg:text-4xl title-font font-medium my-4">
                {currentListing?.title}
              </h1>

              <p className="leading-relaxed my-4">
                {currentListing?.description}
              </p>

              <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                <span className="title-font font-medium text-2xl text-gray-100 text-left w-full lg:w-1/3">
                  Rs. {currentListing?.price}
                </span>
                <button
                  className="flex items-center justify-between w-max text-white bg-red-500 border-0 my-4 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  onClick={() => addToFavourites(currentListing?._id as string)}
                >
                  {auth.user.savedListings?.includes(
                    currentListing?._id as string
                  )
                    ? "Remove from saved listings"
                    : "Save to my listings"}
                  {auth.user.savedListings?.includes(
                    currentListing?._id as string
                  ) ? (
                    <SolidHeart className="h-6 w-6 ml-2" />
                  ) : (
                    <HeartIcon className="h-6 w-6 ml-2" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ViewListing;
