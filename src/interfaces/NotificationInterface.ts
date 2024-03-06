import { IUser } from "./UserInterface";

interface INotification {
  _id: string;
  recipient: IUser;
  beneficiary: string;
  type: "connection" | "listing";
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type { INotification };
