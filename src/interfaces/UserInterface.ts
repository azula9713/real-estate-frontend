interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNum: string;
  profilePic: string;
  location: string;
  userType: number;
  createdAt: string;
  savedListings: string[];
}

interface IUserInputDTO extends Partial<IUser> {
  password: string;
  confirmPassword: string;
}

export type { IUser, IUserInputDTO };
