import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function isNotLoggedIn({ user }) {
  return user ? <Navigate to={"/"} /> : <Outlet />;
}

export default isNotLoggedIn;
