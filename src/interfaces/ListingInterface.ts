import { IUser } from "./UserInterface";

interface BaseListing {
  title: string;
  description: string;
  price: number;
  location: string;
  listingType: "rent" | "sale" | "lease";
  propertyType: "apartment" | "house" | "office" | "land" | "commercial";
  photos: string[];
  clickCount: number;
  isAccepted: boolean;
  isPublished: boolean;
}

interface IListingDTO extends BaseListing {
  listedUnder: IUser;
}

interface IListing extends IListingDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser;
}

interface IListingExpanded extends BaseListing {
  listedUnder: IUser;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser;
}

export type { IListing, IListingDTO, IListingExpanded };
