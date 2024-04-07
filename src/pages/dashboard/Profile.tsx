import {
  CheckCircleIcon,
  DocumentIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  PencilIcon,
  CheckCircleIcon as SolidCheckCircleIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { authState } from "../../atoms/globalAtoms";
import { userConnectionsState, userListingsState } from "../../atoms/userAtoms";
import AddListing from "../../components/modal/AddListing";
import DeleteListing from "../../components/modal/DeleteListing";
import EditListing from "../../components/modal/EditListing";
import EditUser from "../../components/modal/EditUser";
import ViewConnections from "../../components/modal/ViewConnections";
import { IListing } from "../../interfaces/ListingInterface";
import DashboardLayout from "../../layout/DashboardLayout";
import ListingServices from "../../services/ListingService";
import isItMe from "../../utils/isItMe";
import CityUtils from "../../utils/locationUtils";

function DashProfile() {
  const auth = useRecoilValue(authState);
  const userListings = useRecoilValue(userListingsState);
  const userConnections = useRecoilValue(userConnectionsState);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [connectionsModalOpen, setConnectionsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<IListing | null>(null);

  const changeListingPublishStatus = async (listing: IListing) => {
    const updatedListing: IListing = {
      ...listing,
      isPublished: !listing.isPublished,
    };

    const response = await ListingServices.UpdateListing(updatedListing);

    // if success, update the listing in the userListingsState
    if (response) {
      window.location.reload();
    }
  };

  const changeListingAcceptStatus = async (
    listing: IListing,
    status: "accept" | "reject"
  ) => {
    const updatedListing: IListing = {
      ...listing,
      isAccepted: status === "accept",
    };

    const response = await ListingServices.UpdateListing(updatedListing);

    // if success, update the listing in the userListingsState
    if (response) {
      window.location.reload();
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src={auth.user.profilePic}
                  alt="user"
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {auth.user.firstName} {auth.user.lastName}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {CityUtils.getCityByPostalCode(auth.user.location)?.city}
              </h3>

              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto space-x-2">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {/* convert createdDate with moment */}
                    {moment(auth.user.createdAt).format("MMM D, YYYY")}
                  </span>
                </li>
              </ul>
            </div>
            {/* End of profile card */}
            <div className="my-4" />
            {/* Friends card */}
            <div className="bg-white p-3 hover:shadow">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8 justify-between">
                <div className="flex items-center justify-start space-x-4">
                  <span className="text-green-500">
                    <UserGroupIcon className="h-5" />
                  </span>
                  <span>Connections</span>

                  <span className="ml-auto bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {userConnections.length}
                  </span>
                </div>

                <button
                  className="text-xs text-green-500 font-semibold hover:underline"
                  onClick={() => {
                    setConnectionsModalOpen(true);
                  }}
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-3">
                {userConnections.map((connection) => (
                  <div className="text-center my-2" key={connection._id}>
                    {/* get the other person's details instead of current logged in user */}

                    <img
                      className="h-16 w-16 rounded-full mx-auto"
                      src={
                        isItMe(connection.requestee._id, auth.user._id)
                          ? connection.requester.profilePic
                          : connection.requestee.profilePic
                      }
                      alt="user"
                    />
                    <div className="w-full flex items-end justify-center">
                      <p className="p-0 m-0 mr-2">
                        {isItMe(connection.requestee._id, auth.user._id)
                          ? connection.requester.firstName
                          : connection.requestee.firstName}
                      </p>

                      {/* if pending display a gray icon, if accepted display a green icon */}
                      {connection.status === "pending" ? (
                        <CheckCircleIcon className="h-5 w-5 text-gray-500 " />
                      ) : (
                        <SolidCheckCircleIcon className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* End of friends card */}
          </div>
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* Profile tab */}
            {/* About Section */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <UserIcon className="h-5 w-5" />
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <span className="ml-auto text-green-500 cursor-pointer">
                  <PencilIcon
                    className="h-4 w-4"
                    onClick={() => {
                      setEditProfileModalOpen(true);
                    }}
                  />
                </span>
              </div>

              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{auth.user.firstName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{auth.user.lastName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">{auth.user.phoneNum}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      {CityUtils.getCityByPostalCode(auth.user.location)?.city}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href={`mailto:${auth.user.email}`}
                      >
                        {auth.user.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of about section */}
            <div className="my-4" />
            {/* Listing Section */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="">
                <div>
                  <div className="flex items-center justify-between space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-green-500">
                        <DocumentIcon className="h-5 w-5" />
                      </span>
                      <span className="tracking-wide">
                        {auth.user.userType === 1 || auth.user.userType === 2
                          ? "My Listings"
                          : "My Saved Listings"}
                      </span>
                    </div>
                    {auth.user.userType === 1 || auth.user.userType === 2 ? (
                      <span className="text-green-500 cursor-pointer">
                        <PlusIcon
                          className="h-5 w-5"
                          onClick={() => {
                            setAddModalOpen(true);
                          }}
                        />
                      </span>
                    ) : (
                      <span className="text-green-500 cursor-pointer">
                        <DocumentIcon className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                  <ul className="list-inside space-y-2">
                    {userListings.map((listing) => (
                      <li
                        key={listing._id}
                        className="w-full flex items-center justify-between pr-2 pb-2 border-b"
                      >
                        <div>
                          <div className="text-teal-600">{listing.title}</div>
                          <div className="text-gray-500 text-xs">
                            {moment(listing.createdAt).format("MMM D, YYYY")}
                          </div>
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                          {/* if published display Unpublish, if not published show publish */}
                          <button
                            className="px-2 py-1 text-xs rounded font-semibold disabled:opacity-50 bg-green-500 text-white"
                            onClick={() =>
                              changeListingAcceptStatus(listing, "accept")
                            }
                            hidden={
                              listing.isAccepted ||
                              listing.createdBy._id === listing.listedUnder._id
                            }
                          >
                            Accept Listing
                          </button>
                          <button
                            className="px-2 py-1 text-xs rounded font-semibold disabled:opacity-50 bg-red-500 text-white"
                            onClick={() =>
                              changeListingAcceptStatus(listing, "reject")
                            }
                            hidden={
                              listing.isAccepted ||
                              listing.createdBy._id === listing.listedUnder._id
                            }
                          >
                            Reject Listing
                          </button>
                          <button
                            className={`
                            px-2 py-1 text-xs rounded font-semibold disabled:opacity-50
                            ${
                              listing.isPublished
                                ? "bg-red-500 text-white"
                                : "bg-green-500 text-white"
                            }`}
                            disabled={!listing.isAccepted}
                            onClick={() => changeListingPublishStatus(listing)}
                          >
                            {listing.isPublished ? "Unpublish" : "Publish"}
                          </button>
                          <PencilIcon
                            className="h-4 w-4 text-gray-500 cursor-pointer"
                            onClick={() => {
                              setSelectedListing(listing);
                              setEditModalOpen(true);
                            }}
                          />
                          <TrashIcon
                            className="h-4 w-4 text-red-500 cursor-pointer"
                            onClick={() => {
                              setSelectedListing(listing);
                              setDeleteModalOpen(true);
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* End of Experience and education grid */}
              {selectedListing && (
                <>
                  <EditListing
                    listing={selectedListing}
                    openModal={editModalOpen}
                    setOpenModal={setEditModalOpen}
                  />
                  <DeleteListing
                    listing={selectedListing}
                    openModal={deleteModalOpen}
                    setOpenModal={setDeleteModalOpen}
                  />
                </>
              )}
              <EditUser
                openModal={editProfileModalOpen}
                setOpenModal={setEditProfileModalOpen}
              />
              <AddListing
                openModal={addModalOpen}
                setOpenModal={setAddModalOpen}
              />
              <ViewConnections
                openModal={connectionsModalOpen}
                setOpenModal={setConnectionsModalOpen}
              />
            </div>
            {/* End of profile tab */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashProfile;
