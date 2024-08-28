import { getCookie } from "@services/cookie.services";
import axios, { AxiosRequestConfig } from "axios";

const AXIOS_CLIENT = axios.create();

AXIOS_CLIENT.interceptors.request.use(
  (config) => {
    const access_token: string = getCookie("access_token");
    const token_type: string = getCookie("token_type");
    if (token_type && token_type === "bearer") {
      if (access_token && access_token.length > 0) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type TResponseData = any;

export interface TApiResult {
  data: TResponseData;
  status: number;
}

export const getAxiosWithCredentialsConfig = (): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  return config;
};

export const getAxiosDefaultConfig = (): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return config;
};

export const apiGet = async ({
  url,
  withCredentials = false,
}: {
  url: string;
  withCredentials?: boolean;
}): Promise<TApiResult | undefined> => {
  if (!AXIOS_CLIENT) return;
  const { data, status } = await AXIOS_CLIENT.get(
    url,
    withCredentials ? getAxiosWithCredentialsConfig() : getAxiosDefaultConfig(),
  );
  return {
    data,
    status,
  };
};

export const apiPost = async ({
  url,
  payload = "",
  withCredentials = false,
}: {
  url: string;
  payload?: string;
  withCredentials?: boolean;
}): Promise<TApiResult | undefined> => {
  if (!AXIOS_CLIENT) return;
  const { data, status } = await AXIOS_CLIENT.post(
    url,
    payload,
    withCredentials ? getAxiosWithCredentialsConfig() : getAxiosDefaultConfig(),
  );
  return {
    data,
    status,
  };
};
