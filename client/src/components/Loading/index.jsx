import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="bg-stone-800 flex flex-col justify-center items-center h-screen">
      <AiOutlineLoading3Quarters className="animate-spin h-24 w-24 text-white transition duration-500 p-3 rounded-md mx-auto" />
      <h1 className="mt-6 text-3xl text-white">Loading...</h1>
    </div>
  );
};

export default Loading;
