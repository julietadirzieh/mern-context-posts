import { useContext } from "react";
import { HomePage, LoginPage } from "../pages";
import { authContext } from "../context/authContext";

export const PrivateRoute = ({ component: RouteComponent }) => {
  const { user } = useContext(authContext);

  if (user) {
    return <HomePage />;
  }
  return <LoginPage />;
};
