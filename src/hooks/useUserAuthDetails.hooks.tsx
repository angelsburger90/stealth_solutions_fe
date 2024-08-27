import { TAuthResponse, TUser, TUserAuth } from "@model/data.types";
import {
  getUserDetailsUsingAccessToken,
  userAuth,
} from "@services/auth.services";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useUsersStore } from "./user.store.hooks";
import { getValue } from "@services/object.utils.services";

const COOKIE_MAX_AGE = 86000; //24 hours

export const useUserAuthDetails = () => {
  const accessTokenName = "access_token";
  const accessTokenType= "token_type";
  const [_cookies, setCookie, removeCookie] = useCookies();

  const [authDetails, setAuthDetails] = useState<TAuthResponse>();
  useEffect(() => {
    if (authDetails) {
      setCookie(accessTokenName, authDetails.access_token ?? "", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
      setCookie(accessTokenType, authDetails.token_type ?? "", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
    }
  }, [authDetails]);

  const setAuthCallback = (data: TAuthResponse) => {
    setAuthDetails(data);
  };

  const clearAuthDetails = () => {
    removeCookie(accessTokenName, {path: "/"});
    removeCookie(accessTokenType, {path: "/"});
  }
  return { authDetails, setAuthCallback, clearAuthDetails };
};

export const useAuthenticateUser = () => {
  const [userDetailsPayload, setUserDetailsPayload] = useState<TUserAuth>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const { setAuthCallback, clearAuthDetails } = useUserAuthDetails();
  const [userDetailsCache, setUserDetailsCache] = useState<TUser>();
  const setUserDetailsStore = useUsersStore((state) => state.setUserDetails);
  const {
    data: userAuthDetails,
    refetch: loginUser,
    isError: isErrorAuth,
    error: errorsAuth,
  } = userAuth({
    ...userDetailsPayload,
  });
  const {
    data: userDetails,
    refetch: getUserDetails,
    isError: isErrorUserDetails,
    error: errorsUserDetails,
  } = getUserDetailsUsingAccessToken();

  useEffect(() => {
    if (userDetailsPayload) loginUser();
  }, [userDetailsPayload]);

  useEffect(() => {
    if (userAuthDetails) {
      setAuthCallback(userAuthDetails as TAuthResponse);
      console.log("really?");
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
    if (errorsAuth) {
      setErrorMessage(getValue(errorsAuth, ".response.data.errors"));
    }
    if (errorsUserDetails) {
      setErrorMessage(getValue(errorsUserDetails, ".response.data.errors"));
    }
  }, [errorsAuth, errorsUserDetails]);


  const clearCurrentSession = () => {
    clearAuthDetails();
    setUserDetailsStore(undefined);
  }

  return {
    userDetails: userDetailsCache,
    checkIsAuthenticated,
    authenticateUser,
    isAuthenticated,
    errors: errorMessage,
    isError: isErrorAuth || isErrorUserDetails,
    clearCurrentSession
  };
};
