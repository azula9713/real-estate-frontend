import { IListing, IListingDTO } from "../interfaces/ListingInterface";
import Server from "./Axios";

const CreateListing = async (listingData: IListingDTO) => {
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

const UpdateListing = async (listingData: IListing, listingId: string) => {
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

const GetUsersListings = async () => {
  const response = await Server.get("/listings/my", {
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
};

export default ListingServices;
