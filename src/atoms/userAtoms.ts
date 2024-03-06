import { atom } from "recoil";
import { IConnectionExpanded } from "../interfaces/ConnectionInterface";
import { IListing } from "../interfaces/ListingInterface";
import { INotification } from "../interfaces/NotificationInterface";

export const userConnectionsState = atom({
  key: "userConnectionsState",
  default: [] as IConnectionExpanded[],
});

export const userListingsState = atom({
  key: "userListingsState",
  default: [] as IListing[],
});

export const userSavedListingsState = atom({
  key: "userSavedListingsState",
  default: [] as IListing[],
});

export const userNotificationsState = atom({
  key: "userNotificationsState",
  default: [] as INotification[],
});
