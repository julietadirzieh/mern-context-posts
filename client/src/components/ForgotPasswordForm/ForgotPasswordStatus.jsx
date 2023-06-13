import { AiOutlineCheckCircle } from "react-icons/ai";

const ForgotPasswordStatus = () => (
  <div className="bg-zinc-800 text-white py-12 w-5/6 md:w-2/3 mx-auto rounded-md shadow-md shadow-black items-center h-full">
    <div className="flex justify-center items-center">
      <AiOutlineCheckCircle className="h-7 w-7 text-green-500 mr-2" />
      <h2 className="text-3xl text-green-500 font-bold">Check your email!</h2>
    </div>
    <h4 className="text-xl text-white font-bold mt-2">
      We have sent you a link to reset your password.
    </h4>
    <h4 className="text-lg text-white font-bold mt-2">
      The link is valid to use within 1 hour.
    </h4>
  </div>
);

export default ForgotPasswordStatus;
