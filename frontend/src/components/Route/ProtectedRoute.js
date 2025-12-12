import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({
  loading,
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
}) => {
  if (adminRoute && !isAdmin) {
    if (isAuthenticated) {
      alert(
        "You're not Allowed for this Role & You Cannot Access Dashboard: For that Please Login As a Admin"
      );
      return <Navigate to="/account" />;
    }
  }

  if (isAuthenticated === false && loading === false && adminRoute) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
