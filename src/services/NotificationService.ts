import Server from "./Axios";

const GetNotifications = async () => {
  const response = await Server.get("/notifications/all", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-refresh": localStorage.getItem("refreshToken") ?? "",
    },
  });
  return response.data;
};

const DeleteNotification = async (notificationId: string) => {
  const response = await Server.delete(
    `/notifications/delete/${notificationId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "x-refresh": localStorage.getItem("refreshToken") ?? "",
      },
    }
  );
  return response.data;
};

const UpdateReadStatus = async (notificationId: string) => {
  const response = await Server.put(
    `/notifications/update/${notificationId}`,
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

const NotificationServices = {
  GetNotifications,
  DeleteNotification,
  UpdateReadStatus,
};

export default NotificationServices;
