import { useRecoilState } from "recoil";
import { userNotificationsState } from "../../atoms/userAtoms";
import DashboardLayout from "../../layout/DashboardLayout";
import NotificationServices from "../../services/NotificationService";

function Notifications() {
  const [userNotifications, setUserNotifications] = useRecoilState(
    userNotificationsState
  );

  const markAsRead = async (notificationId: string) => {
    const response = await NotificationServices.UpdateReadStatus(
      notificationId
    );

    if (response) {
      // update the notification
      const updatedNotifications = userNotifications.map((notification) => {
        if (notification._id === notificationId) {
          return {
            ...notification,
            read: true,
          };
        }
        return notification;
      });

      setUserNotifications(updatedNotifications);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    const response = await NotificationServices.DeleteNotification(
      notificationId
    );

    if (response) {
      // remove the notification
      const updatedNotifications = userNotifications.filter(
        (notification) => notification._id !== notificationId
      );

      setUserNotifications(updatedNotifications);
    }
  };

  return (
    <DashboardLayout>
      {/* display all notificastions */}
      {userNotifications
        .filter((notification) => !notification.deleted)
        .map((notification) => {
          return (
            <div
              key={notification._id}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div>
                <p className="text-lg font-semibold">{notification.type}</p>
                <p className="text-sm">{notification.message}</p>
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  disabled={notification.read}
                  onClick={() => markAsRead(notification._id)}
                >
                  Mark as Read
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => deleteNotification(notification._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </DashboardLayout>
  );
}

export default Notifications;
