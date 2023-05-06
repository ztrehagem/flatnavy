import React from "react";
import { GlobalHeader } from "../GlobalHeader/GlobalHeader.jsx";
import { Outlet } from "react-router-dom";

export const RootLayout: React.FC = () => {
  return (
    <React.Suspense>
      <div>
        <GlobalHeader />

        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </div>
    </React.Suspense>
  );
};
