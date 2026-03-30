import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router";
import Router from "./router/Router";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" />
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
