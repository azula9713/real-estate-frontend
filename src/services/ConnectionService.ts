import { IConnectionDTO } from "../interfaces/ConnectionInterface";
import Server from "./Axios";

const createConnection = async (connectionData: IConnectionDTO) => {
  const response = await Server.post("/connections/create", connectionData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const getMyConnections = async () => {
  const response = await Server.get("/connections/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const cancelConnection = async (connectionId: string) => {
  const response = await Server.delete(`/connections/cancel/${connectionId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const ConnectionServices = {
  createConnection,
  getMyConnections,
  cancelConnection,
};

export default ConnectionServices;
