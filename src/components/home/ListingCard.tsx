import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { Card } from "flowbite-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { IListing } from "../../interfaces/ListingInterface";
import { IUser } from "../../interfaces/UserInterface";

type Props = {
  listing: IListing;

  user: IUser;
  addToFavourites: (listingId: string) => void;
};

function ListingCard({ listing, user, addToFavourites }: Readonly<Props>) {
  // get listedUner as IUser type
  const listedUnder = listing.listedUnder as IUser;

  const navigate = useNavigate();

  return (
    <Card
      className="max-w-sm cursor-pointer"
      imgAlt={listing.title}
      imgSrc={listing.photos[0]}
    >
      <button
        className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white w-full text-left"
        onClick={async () => {
          navigate(`/listing/view/${listing._id}`);
        }}
      >
        {listing.title}
      </button>

      <div className=" w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            Rs. {listing.price}
          </span>
          <button
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            onClick={() => addToFavourites(listing._id)}
          >
            {/* if listing is in users savedListing, solid heart, if not outline */}
            {user.savedListings?.includes(listing._id) ? (
              <SolidHeart className="h-6 w-6" />
            ) : (
              <OutlineHeart className="h-6 w-6" />
            )}
            {/* <OutlineHeart className="h-6 w-6" /> */}
          </button>
        </div>
        {/* menion if posted user is a seller or a broker */}
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {listedUnder.userType === 1 ? "DIRECT SELLER" : "THROUGH DEALER"}
        </span>
        {/* posted by and posted time */}
        <div className="flex items-center justify-between w-full mt-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Listed by {listedUnder.firstName}{" "}
            {moment(listing.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default ListingCard;
