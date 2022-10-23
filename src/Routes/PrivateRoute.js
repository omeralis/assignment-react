import { Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/UserSlice";
function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectUser);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
