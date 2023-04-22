import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.js";
import { Provider as JotaiProvider } from "jotai";

export const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <JotaiProvider>
        <RouterProvider router={router} />
      </JotaiProvider>
    </React.StrictMode>
  );
};
