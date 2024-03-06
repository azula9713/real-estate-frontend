/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser, IUserInputDTO } from "../interfaces/UserInterface";
import Server from "./Axios";

const CreateUser = async (userData: IUserInputDTO) => {
  try {
    const response = await Server.post("/users/register", userData);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const GetUsers = async (userType: string) => {
  const response = await Server.get(`/users/all/${userType}`);
  return response.data;
};

const UpdateUser = async (userData: IUser) => {
  const response = await Server.put("/users/update", userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const GetUSerSavedListings = async () => {
  const response = await Server.get("/users/saved-listings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const UserServices = {
  CreateUser,
  GetUsers,
  UpdateUser,
  GetUSerSavedListings,
};

export default UserServices;
