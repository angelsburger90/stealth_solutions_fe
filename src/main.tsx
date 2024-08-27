import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import { NetworkContext } from "@datacontext/network.context.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <NetworkContext>
            <App />
          </NetworkContext>
        </BrowserRouter>
      </CookiesProvider>
  </StrictMode>,
);
