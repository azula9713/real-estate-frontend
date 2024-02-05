import { atom } from "recoil";

import { IListing } from "../interfaces/ListingInterface";

const allListingsState = atom({
  key: "allListingsState",
  default: [] as IListing[],
});

const selectedListingState = atom({
  key: "selectedListingState",
  default: {} as IListing,
});

export { allListingsState, selectedListingState };
