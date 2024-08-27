import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TAuthResponse, TUser, TUserAuth } from "@model/data.types";
import { apiGet, apiPost } from "@datacontext/connector.abstract";
import { getDataApiURL } from "@services/config.services";

const STALE_TIME = 10 * 60 * 1000; //10 minutes
const API_URL = getDataApiURL();

export const userAuth = ({
  userId,
  password,
}: Partial<TUserAuth>): UseQueryResult<TAuthResponse> => {
  const url = `${API_URL}auth/login`;
  const payload = JSON.stringify({
    email: userId,
    password: password,
  });
  /* eslint-disable react-hooks/rules-of-hooks */
  const query = useQuery({
    queryKey: ["userAuth"],
    queryFn: async () => {
      return (
        await apiPost({
          url,
          payload,
        })
      )?.data?.data as TAuthResponse;
    },
    enabled: false,
    retry: 0,
  });
  return query;
};

export const getUserDetailsUsingAccessToken = (): UseQueryResult<TUser> => {
  const url = `${API_URL}auth/me`;
  /* eslint-disable react-hooks/rules-of-hooks */
  const query = useQuery({
    queryKey: ["getUserDetailsUsingAccessToken"],
    queryFn: async () => {
      return (
        await apiGet({
          url,
        })
      )?.data?.data as TUser;
    },
    staleTime: STALE_TIME,
    enabled: false,
    retry: 0,
  });
  return query;
};
