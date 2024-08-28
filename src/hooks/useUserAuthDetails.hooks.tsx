import { TAuthResponse, TUser, TUserAuth } from "@model/data.types";
import {
  getUserDetailsUsingAccessToken,
  userAuth,
  userAuthLogout,
} from "@services/auth.services";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useUsersStore } from "./user.store.hooks";
import { getValue } from "@services/object.utils.services";
import { useQueryClient } from "@tanstack/react-query";

const COOKIE_MAX_AGE = 86000; //24 hours

export const useUserAuthDetails = () => {
  const accessTokenName = "access_token";
  const accessTokenType = "token_type";
  const [, setCookie, removeCookie] = useCookies();
  const [authDetailsState, setAuthDetails] = useState<
    TAuthResponse | undefined
  >(undefined);
  const queryClient = useQueryClient();
  const [isLogoutSuccessful, setIsLogoutSuccessful] = useState(false);

  const {
    data: userLogoutDetails,
    refetch: logoutUser,
    isError: isErrorAuthLogout,
    isSuccess: isLogoutSuccess,
    error: logoutError,
  } = userAuthLogout();

  const authDetails = useMemo(() => {
    return authDetailsState;
  }, [authDetailsState]);

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
      setIsLogoutSuccessful(false);
    }
  }, [authDetails, setCookie]);

  const setAuthCallback = (data?: TAuthResponse) => {
    setAuthDetails(data);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const clearTokens = useCallback(() => {
    removeCookie(accessTokenName, { path: "/" });
    removeCookie(accessTokenType, { path: "/" });
    setAuthDetails(undefined);
    setIsLogoutSuccessful(true);
    queryClient.removeQueries();
  }, []);

  useEffect(() => {
    if (isLogoutSuccess) clearTokens();
    if (isErrorAuthLogout && logoutError) {
      if (
        (getValue(logoutError, "response.status") ?? "")?.toString() === "401"
      ) {
        clearTokens?.();
      }
    }
  }, [
    userLogoutDetails,
    isErrorAuthLogout,
    isLogoutSuccess,
    queryClient,
    removeCookie,
    logoutError,
    clearTokens,
  ]);

  const clearAuthDetails = () => {
    logoutUser();
  };
  return {
    authDetails,
    setAuthCallback,
    clearAuthDetails,
    isLogoutSuccessful,
    clearTokens,
  };
};

export const useAuthenticateUser = () => {
  const [userDetailsPayload, setUserDetailsPayload] = useState<TUserAuth>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const { authDetails, setAuthCallback, clearAuthDetails, isLogoutSuccessful } =
    useUserAuthDetails();
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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (userDetailsPayload) loginUser();
  }, [userDetailsPayload]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (userAuthDetails) {
      setAuthCallback(userAuthDetails as TAuthResponse);
    }
  }, [userAuthDetails]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (authDetails?.access_token) {
      getUserDetails();
    }
  }, [authDetails]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (userDetails) {
      if (userDetails.email === userAuthDetails?.user.email) {
        setIsAuthenticated(true);
        setUserDetailsCache(userDetails);
        setUserDetailsStore(userDetails);
      }
    }
  }, [userDetails, userAuthDetails]);

  const authenticateUser = useCallback(
    (userDetails: TUserAuth) => {
      setUserDetailsPayload(userDetails);
    },
    [userDetails],
  );

  const checkIsAuthenticated = useCallback(() => {
    return isAuthenticated;
  }, [isAuthenticated]);

  useEffect(() => {
    if (errorsAuth) {
      setErrorMessage(getValue(errorsAuth, "response.data.message"));
    }
    if (errorsUserDetails) {
      setErrorMessage(getValue(errorsUserDetails, ".response.data.errors"));
    }
  }, [errorsAuth, errorsUserDetails]);

  const clearCurrentSession = () => {
    setUserDetailsStore(undefined);
    setUserDetailsCache(undefined);
    setIsAuthenticated(false);
    setUserDetailsPayload(undefined);
    setErrorMessage(false);
  };

  const proceedLogout = () => {
    clearAuthDetails();
  };

  useEffect(() => {
    if (isLogoutSuccessful) {
      clearCurrentSession();
    }
  }, [isLogoutSuccessful]);

  return {
    userDetails: userDetailsCache,
    checkIsAuthenticated,
    authenticateUser,
    isAuthenticated,
    errors: errorMessage,
    isError: isErrorAuth || isErrorUserDetails,
    clearCurrentSession,
    isLogoutSuccessful,
    proceedLogout,
  };
};
