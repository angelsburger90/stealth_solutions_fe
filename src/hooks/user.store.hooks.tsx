import { create } from "zustand";
import { TUser } from "@model/data.types";

type UsersStoreState = {
  userDetails?: TUser;
};

type UsersStoreAction = {
  setUserDetails: (
    value?: UsersStoreState["userDetails"],
  ) => void;
};

export const useUsersStore = create<UsersStoreState & UsersStoreAction>(
  (set) => ({
    userDetails: undefined,
    setUserDetails: (value?: TUser) => set({ userDetails: value }),
  }),
);
