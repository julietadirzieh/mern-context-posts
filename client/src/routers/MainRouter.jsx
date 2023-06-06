import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  PostForm,
  LoginPage,
  RegisterPage,
} from "../pages";
import { PrivateRoute } from "./PrivateRouter";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute component={HomePage} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/new" element={<PostForm />} />
      <Route path="/posts/:id" element={<PostForm />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRouter;
