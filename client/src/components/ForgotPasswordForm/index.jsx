import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import validationSchema from "./validation";
import { toast } from "react-hot-toast";
import InputForm from "../InputForm";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const { forgotPassword } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await forgotPassword(values.email);
      if (
        response &&
        response.message === "Password reset token sent to your email"
      ) {
        navigate("/confirmation-forgot-password");
        return response;
      }
    } catch (err) {
      toast.error("User not found", err.message);
    }
  };

  return (
    <div className="bg-zinc-800 text-white py-12 w-5/6 md:w-2/3 mx-auto rounded-md shadow-md shadow-black items-center h-full">
      <h2 className="text-3xl text-white font-bold">Forgot your Password?</h2>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputForm label="Email" name="email" placeholder="Email..." />
            <button
              type="submit"
              className="flex mt-8 bg-white text-black hover:bg-gray-600 hover:text-white border b-black hover:b-white transition duration-500 p-3 rounded-md mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "Send Email Code"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
