import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyQueryClient = new QueryClient();

export const NetworkContext = ({ children }: { children: JSX.Element }) => {
  return (
    <QueryClientProvider client={MyQueryClient}>{children}</QueryClientProvider>
  );
};
