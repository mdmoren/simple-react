import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../providers/AuthContext";
import { MdEmail } from "react-icons/md";

import InputField from "../components/InputField";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  async function handleResetPassword() {
    try {
      await forgotPassword(email);
      navigate("/reset-password");
    } catch (error) {
      setError("Error");
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function acknowledgeError() {
    setError("");
  }

  const isEmailValid = validateEmail(email);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
        <section className="flex items-center border-gray-300 border-b-2 pb-4">

        <Link to="/login">
            <FaLongArrowAltLeft className="text-2xl w-10 text-gray-500 hover:text-gray-600"/>
          </Link>

          <h1 className="text-center text-2xl font-bold text-gray-600 flex-grow mr-10">
            Forgot your password?
          </h1>
        </section>

        <InputField
          label="Email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          icon={MdEmail}
        />

        <div className="flex justify-between border-gray-300 border-t-2 pt-4">
          <section className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-600">
              Send reset code
            </h1>
            <Link
              to="/reset-password"
              className="text-sm font-bold text-gray-500 hover:text-gray-600 duration-500 outline-none"
            >
              Have a code?
            </Link>
          </section>
          <button
            disabled={!isEmailValid}
            className={`flex rounded-full w-20 h-20 items-center justify-center duration-500 outline-blue-300
            ${
              isEmailValid
                ? "bg-green-300 hover:bg-green-400 group"
                : "bg-gray-300 cursor-not-allowed"
            }
            `}
            type="button"
            onClick={handleResetPassword}
          >
            <FaLongArrowAltRight className="text-4xl text-gray-500 group-hover:text-gray-600  duration-500" />
          </button>
        </div>
      </div>

      {error && (
        <div
          onClick={acknowledgeError}
          className="flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8"
        >
          <h1 className="text-center text-red-600">{error}</h1>
        </div>
      )}
    </div>
  );
}
