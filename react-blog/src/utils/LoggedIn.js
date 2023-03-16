import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

function LoggedIn({ user }) {
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}

export default LoggedIn;
