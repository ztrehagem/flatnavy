import React from "react";
import { GlobalNavigation } from "../GlobalNavigation/GlobalNavigation.jsx";
import { Outlet } from "react-router-dom";

export const GlobalLayout: React.FC = () => {
  return (
    <div>
      <GlobalNavigation />

      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </div>
  );
};
