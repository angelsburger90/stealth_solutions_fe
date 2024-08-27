import { create } from "zustand";
import { TUser } from "@model/data.types";
import { persist } from "zustand/middleware";

type UsersStoreState = {
  userDetails?: TUser;
};

type UsersStoreAction = {
  setUserDetails: (value?: UsersStoreState["userDetails"]) => void;
};

export const useUsersStore = create<UsersStoreState & UsersStoreAction>()(
  persist(
    (set) => ({
      userDetails: undefined,
      setUserDetails: (value?: TUser) => set({ userDetails: value }),
    }),
    {
      name: "userStorePersist",
    },
  ),
);
