import React from "react";
import { useSession } from "./useSession.js";
import { Navigate } from "react-router-dom";
import { location } from "../../router/utils.js";

export type Props = {
  children: React.ReactNode;
};

export const Authenticated: React.FC<Props> = ({ children }) => {
  const session = useSession();
  const homeLocation = location("/", {});

  return session ? <>{children}</> : <Navigate to={homeLocation} />;
};
