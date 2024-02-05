import { atom } from "recoil";
import { IUser } from "../interfaces/UserInterface";

export const authState = atom({
  key: "authState",
  default: {
    isAuth: false,
    user: {} as IUser,
  },
});
