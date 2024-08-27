import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TUser } from "@model/data.types";
import { apiGet } from "@datacontext/connector.abstract";
import { getDataApiURL } from "@services/config.services";
import { TSearchFilter } from "@model/constants";

const STALE_TIME = 10 * 60 * 1000; //10 minutes
const API_URL = getDataApiURL();

export const getUserById = ({ id }: Partial<TUser>): UseQueryResult<TUser> => {
  const url = `${API_URL}user/${id ?? 0}`;
  /* eslint-disable  react-hooks/rules-of-hooks */
  const query = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      return (
        await apiGet({
          url,
        })
      )?.data as TUser;
    },
    enabled: true,
    staleTime: STALE_TIME,
  });
  return query;
};

export const getUserList = ({
  maxCount = 1000,
}: {
  maxCount?: number;
}): UseQueryResult<TUser[]> => {
  const url = `${API_URL}user/list/${maxCount}`;
  const query = useQuery({
    queryKey: ["getUserList"],
    queryFn: async () => {
      return (
        await apiGet({
          url,
        })
      )?.data as TUser[];
    },
    enabled: true,
    staleTime: STALE_TIME,
  });
  return query;
};

export const getFilteredUsersList = ({
  searchQuery = "",
  filterKey,
  maxCount = 1000,
  enabled = false,
}: {
  searchQuery: string;
  filterKey: TSearchFilter;
  maxCount?: number;
  enabled?: boolean;
}): UseQueryResult<TUser[]> => {
  const url = `${API_URL}user/filter/${filterKey}/${encodeURI(searchQuery)}/${maxCount}`;
  const query = useQuery({
    queryKey: ["getFilteredUsersList"],
    queryFn: async () => {
      return (
        await apiGet({
          url,
        })
      )?.data as TUser[];
    },
    enabled: enabled,
    staleTime: STALE_TIME,
  });
  return query;
};
