import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { ENV_VARS } from "./env.js";
import { App } from "./App.jsx";
import { ErrorBoundary } from "./components/errorBoundary/ErrorBoundary.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={ENV_VARS.AUTH0_DOMAIN}
        clientId={ENV_VARS.AUTH0_CLIENT_ID}
        authorizationParams={{
          audience: ENV_VARS.AUTH0_AUDIENCE,
          redirect_uri: window.location.origin,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </QueryClientProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
