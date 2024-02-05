import { IUser } from "./UserInterface";

interface IConnectionDTO {
  requester: string;
  requestee: string;
  status: "pending" | "accepted" | "rejected";
}

interface IConnection extends IConnectionDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// have an expanded version for requester and requestee (with user info)

interface IConnectionExpanded {
  requester: IUser;
  requestee: IUser;
  status: "pending" | "accepted" | "rejected";
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { IConnection, IConnectionDTO, IConnectionExpanded };
