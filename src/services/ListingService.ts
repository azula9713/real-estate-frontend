import { IListing, IListingInput } from "../interfaces/ListingInterface";
import Server from "./Axios";

const CreateListing = async (listingData: IListingInput) => {
  const response = await Server.post("/listings/create", listingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const GetAllListings = async () => {
  const response = await Server.get("/listings/all");
  return response.data;
};

const GetListing = async (listingId: string) => {
  const response = await Server.get(`/listings/view/${listingId}`);
  return response.data;
};

const GetUsersListings = async () => {
  const response = await Server.get("/listings/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const UpdateListing = async (listingData: IListing) => {
  const listingId = listingData._id;

  const response = await Server.put(
    `/listings/update/${listingId}`,
    listingData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh": localStorage.getItem("refreshToken") ?? "",
      },
    }
  );
  return response.data;
};

const DeleteListing = async (listingId: string) => {
  const response = await Server.delete(`/listings/delete/${listingId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const ListingServices = {
  CreateListing,
  GetAllListings,
  UpdateListing,
  GetUsersListings,
  DeleteListing,
  GetListing,
};

export default ListingServices;
