import { createContext, useState } from "react";
import { loginUserRequest, registerUserRequest } from "../api/users";
import { toast } from "react-hot-toast";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

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

      if (res.message === "Login successfull") {
        toast.success("Successfull login!");
        setUser(res.user);
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

  return (
    <authContext.Provider
      value={{ user, setUser, token, setToken, login, logout, register }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
