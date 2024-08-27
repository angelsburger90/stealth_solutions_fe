import envConfig from "@config/env.json";

export const getDataApiURL = () => {
  const { dataEndPoint } = envConfig;
  if (dataEndPoint) {
    const { url, contextPath } = dataEndPoint;
    if (url) {
      return `${url}/${contextPath ?? ""}`;
    }
  }
  return undefined;
};
