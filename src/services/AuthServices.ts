/* eslint-disable @typescript-eslint/no-explicit-any */
import Server from "./Axios";

const LoginUser = async (email: string, password: string) => {
  // const response = await Server.post("/auth/login", { email, password });
  // return response;

  try {
    const response = await Server.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const ValidateUser = async () => {
  const response = await Server.get("/auth/validate", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const LogoutUser = async () => {
  const response = await Server.patch(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh": localStorage.getItem("refreshToken") ?? "",
      },
    }
  );
  return response.data;
};

const AuthServices = {
  LoginUser,
  ValidateUser,
  LogoutUser,
};

export default AuthServices;
