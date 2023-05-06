import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import { router } from "./router/router.js";

export const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <JotaiProvider>
        <RouterProvider router={router} />
      </JotaiProvider>
    </React.StrictMode>
  );
};
