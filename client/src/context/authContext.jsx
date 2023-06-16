import { createContext, useState } from "react";
import {
  forgotPasswordRequest,
  loginUserRequest,
  registerUserRequest,
  resetPasswordRequest,
  tokenAuth,
} from "../api/users";
import { toast } from "react-hot-toast";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const register = async (values) => {
    try {
      const res = await registerUserRequest(values);

      if (res.message === "User created") {
        toast.success("User created Successfull!");
        return res;
      }
      toast.error(res.message);
    } catch (error) {
      throw error;
    }
  };

  const login = async (values) => {
    try {
      const res = await loginUserRequest(values);

      if (res.message === "Login succesful!") {
        toast.success("Successful login!");
        setUser(res.user);
        localStorage.setItem("token", res.user.token);
        setToken(res.user.token);
        return res;
      }
      toast.error(res.message);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginWithToken = async (token) => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const usr = await tokenAuth(token);
    setUser(usr);
    setLoading(false);
  };

  const forgotPassword = async (values) => {
    try {
      const res = await forgotPasswordRequest(values);

      if (res.message === "Password reset sent to your email") {
        toast.success("Password reset sent to your email");
        return res;
      }
      toast.error(res.message);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (values) => {
    try {
      const res = await resetPasswordRequest(values);

      if (res.message === "Password reset successful") {
        toast.success("Password reset successful");
        return res;
      }
      toast.error(res.message);
    } catch (error) {
      throw error;
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
        register,
        loginWithToken,
        loading,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
