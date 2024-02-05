import { IUser } from "./UserInterface";

interface IListingDTO {
  title: string;
  description: string;
  price: number;
  location: string;
  listingType: string;
  photos: string[];
}

interface IListing extends IListingDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IUser;
  listedUnder: IUser;
  clickCount: number;
}

export type { IListing, IListingDTO };
