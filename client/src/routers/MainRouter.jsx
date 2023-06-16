import { Route, Routes, Navigate } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  PostForm,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../pages";
import { PrivateRoute } from "./PrivateRouter";
import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import Loading from "../components/Loading";

const MainRouter = () => {
  const { user, token, loginWithToken, loading } = useContext(authContext);

  useEffect(() => {
    if (!user && token) {
      const fetchUser = async () => {
        await loginWithToken(token);
      };
      fetchUser();
    }
  }, [token, user, loginWithToken]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <PrivateRoute component={HomePage} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <RegisterPage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/new" element={<PostForm />} />
      <Route path="/posts/:id" element={<PostForm />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRouter;
