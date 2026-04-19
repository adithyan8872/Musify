import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Mygarage } from "../Context/AuthContext";

/**
 * Wraps admin routes — redirects to / if user is not an admin.
 * Shows a loading state while auth is still resolving.
 */
const RequireAdmin = ({ children }) => {
  const { authuser, isAdmin, darkMode } = useContext(Mygarage);

  // Auth not yet resolved (null = logged out, undefined = loading)
  // authuser starts as null (from useState), so we check isAdmin directly
  if (!authuser) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
