import { Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserName } from "../features/UserSlice";
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(selectUser);
  const nameUser = useSelector(selectUserName);
  console.log("ProtectedRoute nameUser ->", nameUser);

  return !isAuthenticated ? (
    children
  ) : nameUser.User_type === "admin" ? (
    <Navigate to="/user" />
  ) : (
    <Navigate to="/task" />
  );
}

export default ProtectedRoute;
