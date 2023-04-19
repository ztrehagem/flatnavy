import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.js";

export const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
