import { atom } from "recoil";
import { IConnectionExpanded } from "../interfaces/ConnectionInterface";
import { IListing } from "../interfaces/ListingInterface";

export const userConnectionsState = atom({
  key: "userConnectionsState",
  default: [] as IConnectionExpanded[],
});

export const userListingsState = atom({
  key: "userListingsState",
  default: [] as IListing[],
});
