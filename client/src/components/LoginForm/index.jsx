import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import validationSchema from "./validation";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { toast } from "react-hot-toast";
import InputForm from "../InputForm";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  const onSubmit = async (values) => {
    try {
      const response = await login(values);

      if (response && response.message === "Login succesful!") {
        navigate("/");
        return response;
      }
    } catch (err) {
      toast.error("Error login!", err.message);
    }
  };

  return (
    <div className="bg-zinc-800 text-white py-12 w-5/6 md:w-2/3 mx-auto rounded-md shadow-md shadow-black items-center h-full">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputForm label="Email" name="email" placeholder="Email..." />
            <InputForm
              label="Password"
              name="password"
              placeholder="Password..."
            />

            <button
              type="submit"
              className="flex mt-8 bg-white text-black hover:bg-gray-600 hover:text-white border b-black hover:b-white transition duration-500 p-3 rounded-md mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "LOGIN"
              )}
            </button>
          </Form>
        )}
      </Formik>
      <h3 className="text-white mt-10">Still don't have an account?</h3>
      <Link to="/register" className="text-white hover:text-red-400">
        Sign up
      </Link>
    </div>
  );
};

export default LoginForm;
