import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const ProtectRoute = ({ isAllowed, redirectPath = "/auth", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectRoute;
