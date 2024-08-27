import { TAuthResponse, TUser, TUserAuth } from "@model/data.types";
import {
  getUserDetailsUsingAccessToken,
  userAuth,
} from "@services/auth.services";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUsersStore } from "./user.store.hooks";

const COOKIE_MAX_AGE = 86000; //24 hours

export const useUserAuthDetails = () => {
  const [_accessToken, setAccessToken] = useCookies(["access_token"]);
  const [_tokenType, setTokenType] = useCookies(["token_type"]);
  const [authDetails, setAuthDetails] = useState<TAuthResponse>();
  useEffect(() => {
    if (authDetails) {
      setAccessToken("access_token", authDetails.access_token ?? "", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
      setTokenType("token_type", authDetails.token_type ?? "");
    }
  }, [authDetails]);

  const setAuthCallback = (data: TAuthResponse) => {
    setAuthDetails(data);
  };
  return { authDetails, setAuthCallback };
};

export const useAuthenticateUser = () => {
  const [userDetailsPayload, setUserDetailsPayload] = useState<TUserAuth>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);  
  const [errorMessage, setErrorMessage] = useState<boolean>(false);  
  const { setAuthCallback } = useUserAuthDetails();
  const [userDetailsCache, setUserDetailsCache] = useState<TUser>();
  const { data: userAuthDetails, refetch: loginUser, isError: isErrorAuth, error:errorsAuth } = userAuth({
    ...userDetailsPayload,
  });
  const { data: userDetails, refetch: getUserDetails, isError: isErrorUserDetails, error: errorsUserDetails } =
    getUserDetailsUsingAccessToken();

  const setUserDetailsStore = useUsersStore((state) => state.setUserDetails);

  useEffect(() => {
    if (userDetailsPayload) loginUser();
  }, [userDetailsPayload]);

  useEffect(() => {
    if (userAuthDetails) {
      setAuthCallback(userAuthDetails as TAuthResponse);
      getUserDetails();
    }
  }, [userAuthDetails]);

  useEffect(() => {
    if (userDetails) {
      if (userDetails.email === userAuthDetails?.user.email) {
        setIsAuthenticated(true);
        setUserDetailsCache(userDetails);
        setUserDetailsStore(userDetails);
      }
    }
  }, [userDetails]);

  const authenticateUser = (userDetails: TUserAuth) => {
    setUserDetailsPayload(userDetails);
  };
  const checkIsAuthenticated = () => {
    return isAuthenticated;
  };

  useEffect(() => {
    if(errorsAuth){
        setErrorMessage(errorsAuth?.response?.data?.errors)
    }
    if(errorsUserDetails){
        setErrorMessage(errorsUserDetails?.response?.data?.errors)
    }
  }, [errorsAuth,errorsUserDetails])

  return {
    userDetails: userDetailsCache,
    checkIsAuthenticated,
    authenticateUser,
    isAuthenticated,
    errors: errorMessage,
    isError: isErrorAuth ?? isErrorUserDetails
  };
};
