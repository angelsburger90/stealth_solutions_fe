import { useUsersStore } from "@hooks/user.store.hooks";
import UserCard from "./user.card.component";
import { useMemo } from "react";
import { TUser } from "@model/data.types";
import ErrorPanel from "./fragments/error.panel.component";
import InfoPanel from "./fragments/info.panel.component";
import { ESortDirection } from "@model/constants";

const UserCardList = (): JSX.Element => {
  /**
   * intentionally demonstrating here the state management of zustand instead
   * of just passing the variable directly into the components
   */
  const { usersStoreList, sortDirection, searchQuery, searchLoading } =
    useUsersStore();

  const sortedUsersList = useMemo(() => {
    if (!usersStoreList) return [];
    if (!Array.isArray(usersStoreList)) return usersStoreList;

    return usersStoreList.sort((userA: TUser, userB: TUser): number => {
      if (userA.name < userB.name)
        return sortDirection === ESortDirection.ASCENDING ? -1 : 1;
      if (userA.name > userB.name)
        return sortDirection === ESortDirection.ASCENDING ? 1 : -1;
      return 0;
    });
  }, [usersStoreList, sortDirection]) as TUser[];

  return (
    <>
      {sortedUsersList?.length <= 0 && (
        <>
          {searchQuery.length > 0 && !searchLoading && (
            <ErrorPanel message="No record found" />
          )}
          {searchQuery.length <= 0 && (
            <InfoPanel message="Type in your query to start" />
          )}
        </>
      )}
      {sortedUsersList?.map((userDetails) => (
        <UserCard
          userDetails={userDetails}
          key={`${userDetails.name}_${userDetails.id}`}
        />
      ))}
    </>
  );
};

export default UserCardList;
