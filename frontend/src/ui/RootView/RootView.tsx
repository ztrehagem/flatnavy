import React from "react";
import { GlobalNavigation } from "../GlobalNavigation/GlobalNavigation.js";
import { Outlet } from "react-router-dom";

export const RootView: React.FC = () => {
  return (
    <React.Suspense>
      <div>
        <GlobalNavigation />

        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </div>
    </React.Suspense>
  );
};
