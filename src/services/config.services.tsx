export const getDataApiURL = () => {
  if (import.meta.env) {
    const { VITE_DATA_ENDPOINT_URL, VITE_DATA_ENDPOINT_CONTEXT_PATH } =
      import.meta.env;
    if (VITE_DATA_ENDPOINT_URL) {
      return `${VITE_DATA_ENDPOINT_URL}/${VITE_DATA_ENDPOINT_CONTEXT_PATH ?? ""}`;
    }
  }
  return undefined;
};
