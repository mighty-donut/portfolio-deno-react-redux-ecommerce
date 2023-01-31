import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/store";

export default function PrivateRoute() {
  const token = useAppSelector((state) => state.auth.token);

  // if no token is found in redux store redirect to "/"
  if (!token) {
    return <Navigate to="/signin"></Navigate>;
  }

  // returns child route elements
  return <Outlet />;
}
