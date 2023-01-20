import { atom } from "jotai";
import type UserData from "../models/UserData";

const UserDetailsAtom = atom({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  sex: 0,
  dob: new Date(Date.now()),
  avatarUrl: "",
} as UserData);

export default UserDetailsAtom;
