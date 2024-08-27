import { TAppPage } from "@model/data.types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "@services/cookie.services";

const ROOT_PAGES: string[] = [TAppPage.ALL, TAppPage.ROOT];

export const useNavigationInterceptor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSessionValid, setIsSessionValid] = useState(false);
  const isRootPath = () => {
    return ROOT_PAGES.includes(location.pathname);
  };
  const interceptRoute = () => {
    const access_token: string = getCookie("access_token");
    const token_type: string = getCookie("token_type");
    if (token_type && token_type === "bearer") {
      if (access_token && access_token.length > 0) {
        setIsSessionValid(true);
        if (!isRootPath()) return;
        navigate(TAppPage.USER_DETAILS_PAGE);
      }
    }
    setIsSessionValid(false);
    if (isRootPath()) return;
    navigate(TAppPage.ROOT);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    interceptRoute();
  }, [location]);

  return {
    isSessionValid,
  };
};
