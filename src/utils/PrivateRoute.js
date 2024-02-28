import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  let { authTokens } = useContext(AuthContext);
  return authTokens ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
