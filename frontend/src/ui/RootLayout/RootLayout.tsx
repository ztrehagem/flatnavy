import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalHeader } from "../GlobalHeader/GlobalHeader.jsx";

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
