import { ErrorMessage, Field } from "formik";
import React from "react";

const InputForm = ({ name, label, placeholder }) => {
  return (
    <>
      <label htmlFor={name} className="text-base text-white block pb-1 mt-5">
        {label}
      </label>
      <Field
        type={label}
        name={name}
        placeholder={placeholder}
        className="p-3 focus:outline-none rounded-md bg-gray-600 text-white w-4/5 md:w-2/3"
      />
      <ErrorMessage
        component="p"
        className="text-red-400 text-sm"
        name={name}
      />
    </>
  );
};

export default InputForm;
