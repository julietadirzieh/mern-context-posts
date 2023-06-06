import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import validationSchema from "./validation";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { toast } from "react-hot-toast";
import InputForm from "../InputForm";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useContext(authContext);

  const onSubmit = async (values) => {
    try {
      const body = {
        firstName: values.firstName.toLowerCase(),
        lastName: values.lastName.toLowerCase(),
        email: values.email.toLowerCase(),
        password: values.password.toLowerCase(),
      };

      const response = await register(body);

      if (response) {
        navigate("/");
        return response;
      }
    } catch (err) {
      toast.error("Register error!", err.message);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="bg-zinc-800 text-white py-12 w-5/6 md:w-2/3 mx-auto rounded-md shadow-md shadow-black items-center h-full"
        >
          <InputForm
            label="First Name"
            name="firstName"
            placeholder="First Name..."
          />
          <InputForm
            label="Last Name"
            name="lastName"
            placeholder="Last Name..."
          />
          <InputForm label="Email" name="email" placeholder="Email..." />
          <InputForm
            label="Password"
            name="password"
            placeholder="Password..."
          />
          <InputForm
            label="Password"
            name="confirmPassword"
            placeholder="Confirm password..."
          />

          <button
            type="submit"
            className="flex mt-8 bg-white text-black hover:bg-gray-600 hover:text-white border b-black hover:b-white transition duration-500 p-3 rounded-md mx-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
            ) : (
              "REGISTER"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
