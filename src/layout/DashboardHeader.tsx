import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { authState } from "../atoms/globalAtoms";
import {
  userListingsState,
  userNotificationsState,
  userSavedListingsState,
} from "../atoms/userAtoms";
import { INotification } from "../interfaces/NotificationInterface";
import AuthServices from "../services/AuthServices";
import ListingServices from "../services/ListingService";
import NotificationServices from "../services/NotificationService";
import UserServices from "../services/UserServices";

type Props = {
  setSidebarOpen: (open: boolean) => void;
};

function DashboardHeader({ setSidebarOpen }: Readonly<Props>) {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useRecoilState(authState);
  const setUserListings = useSetRecoilState(userListingsState);
  const setUserSavedListings = useSetRecoilState(userSavedListingsState);
  const [userNotifications, setUserNotifications] = useRecoilState(
    userNotificationsState
  );

  const [notificationPopoverOpen, setNotificationPopoverOpen] = useState(false);

  const markAllAsRead = async () => {
    // mark all notifications as read
    for (const notification of userNotifications) {
      await NotificationServices.UpdateReadStatus(notification._id);
    }
  };

  useEffect(() => {
    const validateUser = async () => {
      const response = await AuthServices.ValidateUser();

      if (response.email !== "" && response.email !== undefined) {
        setAuth({
          isAuth: true,
          user: response,
        });
      }
    };

    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      validateUser();
    } else {
      navigate("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth]);

  useEffect(() => {
    const fetchUserListings = async () => {
      const response = await ListingServices.GetUsersListings();
      const savedListings = await UserServices.GetUSerSavedListings();

      setUserListings(response);
      setUserSavedListings(savedListings);
    };

    const fetchUserNotifications = async () => {
      const response = await NotificationServices.GetNotifications();

      setUserNotifications(
        response.filter((notification: INotification) => !notification.deleted)
      );
    };

    if (auth.isAuth) {
      fetchUserListings();
      fetchUserNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuth]);

  return (
    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <nav aria-label="breadcrumb" className="w-max">
            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                  dashboard
                </p>
                <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                  {location.pathname.split("/")[2]}
                </p>
              </li>
            </ol>
          </nav>
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
            {location.pathname.split("/")[2]}
          </h6>
        </div>
        <div className="flex items-center">
          <button
            className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
            type="button"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <Bars3Icon className="h-5 w-5 text-blue-gray-500" />
            </span>
          </button>

          <button
            className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
            type="button"
          >
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {`${auth.user?.firstName} ${auth.user?.lastName}`}
            </p>
          </button>
          <button
            className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </span>
          </button>
          <button
            aria-expanded="false"
            aria-haspopup="menu"
            id=":r2:"
            className="hidden lg:block relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
            onClick={() => setNotificationPopoverOpen(!notificationPopoverOpen)}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <BellIcon className="h-5 w-5 text-blue-gray-500" />
              {/* count of all unread notifications */}
              <span
                className={`${
                  userNotifications.some((notification) => !notification.read)
                    ? "block"
                    : "hidden"
                } absolute top-0 right-0 -mt-1 -mr-1 px-1.5 rounded-full bg-red-500 text-xs text-white`}
              >
                {
                  userNotifications.filter((notification) => !notification.read)
                    .length
                }
              </span>
            </span>
          </button>
          {/* create a popup show most recent 3 notifications that opens when click the button */}
          <div
            className={`${
              notificationPopoverOpen ? "hidden lg:block" : "hidden"
            } origin-top-right absolute top-16 z-10 right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <ul className="flex flex-col gap-2">
                {userNotifications.map((notification) => (
                  <li
                    key={notification._id}
                    className="flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 space-x-4"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: notification.read
                            ? "transparent"
                            : "green",
                        }}
                      ></div>
                    </div>
                    <p className="text-xs">{notification.message}</p>
                  </li>
                ))}
              </ul>

              {/* View all  */}
              <div className="flex w-full items-center justify-between">
                <button
                  className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-green-300 w-full bg-green-100 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none disabled:hover:bg-gray-100"
                  onClick={async () => {
                    setNotificationPopoverOpen(false);
                    await markAllAsRead();
                    // navigate("/dashboard/notifications");
                  }}
                  disabled={userNotifications.every(
                    (notification) => notification.read
                  )}
                >
                  <p className="text-xs">Mark All as Read</p>
                </button>
                <button
                  className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 w-full bg-gray-100 "
                  onClick={() => {
                    setNotificationPopoverOpen(false);
                    navigate("/dashboard/notifications");
                  }}
                >
                  <p className="text-xs">View all</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardHeader;
