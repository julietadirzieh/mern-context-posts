import React, { useContext } from "react";
import { Formik, Form } from "formik";
import InputForm from "../InputForm";
import validationSchema from "./validation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { authContext } from "../../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPasswordForm = () => {
  const { resetPassword } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values) => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");
      const body = {
        token: token,
        password: values.newPassword.toLowerCase(),
      };

      const response = await resetPassword(body);

      if (response && response.message === "Password reset successful") {
        localStorage.removeItem("token");
        navigate("/login");
        return response;
      }
    } catch (err) {
      toast.error(
        "It was not possible to reset your password. Try again!",
        err.message
      );
    }
  };

  return (
    <div className="bg-zinc-800 text-white py-12 w-5/6 md:w-2/3 mx-auto rounded-md shadow-md shadow-black items-center h-full">
      <h2 className="text-3xl text-white font-bold">Reset Password</h2>
      <Formik
        initialValues={{
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputForm
              label="Password"
              name="newPassword"
              placeholder="New Password..."
            />
            <InputForm
              label="Password"
              name="confirmNewPassword"
              placeholder="Confirm Password..."
            />

            <button
              type="submit"
              className="flex mt-8 bg-white text-black hover:bg-gray-600 hover:text-white border b-black hover:b-white transition duration-500 p-3 rounded-md mx-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "Confirm"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
