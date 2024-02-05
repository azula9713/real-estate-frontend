import { IUser, IUserInputDTO } from "../interfaces/UserInterface";
import Server from "./Axios";

const CreateUser = async (userData: IUserInputDTO) => {
  const response = await Server.post("/users/register", userData);
  return response.data;
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

const UserServices = {
  CreateUser,
  GetUsers,
  UpdateUser,
};

export default UserServices;
