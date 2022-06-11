import React from "react";
import { Outlet } from "react-router-dom";
import Auth from "../components/Auth";

const ProtectRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Auth />;
  }

  return <Outlet />;
};

export default ProtectRoute;
