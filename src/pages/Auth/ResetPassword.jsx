import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";

import InputField from "../../components/InputField";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
} from "react-icons/fa";

export default function ResetPassword() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);
  const { resetPassword } = useAuth();

  const handleCodeChange = (index, e) => {
    const newCodes = [...codes];
    newCodes[index] = e.target.value.toUpperCase();
    setCodes(newCodes);

    if (index < inputRefs.current.length - 1 && e.target.value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && codes[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    const code = codes.join("");
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (newPassword.length < 8 || !/\d/.test(newPassword)) {
        setError(
          "Password must be at least 8 characters long and must include at least one number"
        );
        return;
      }

      await resetPassword(code, newPassword);
      setCodes(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setSuccess(true);
    } catch (error) {
      setError("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
        <section className="flex items-center border-gray-300 border-b-2 pb-4">
          <Link to="/forgot-password">
            <FaLongArrowAltLeft className="text-2xl w-10 text-gray-500 hover:text-gray-600" />
          </Link>

          <h1 className="text-center text-2xl font-bold text-gray-600 flex-grow mr-10">
            Reset your password
          </h1>
        </section>

        <section>
          <h1 className="font-bold text-gray-500 text-center mb-2">
            Enter your reset code
          </h1>
          <div className="flex justify-center space-x-2">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className={`w-10 sm:w-12 h-10 sm:h-12 text-2xl text-center rounded-md border-2 outline-none border-gray-300 focus:border-blue-300
                ${code ? "border-green-300" : "hover:border-orange-300"}
                `}
                type="text"
                maxLength="1"
                value={code}
                onChange={(e) => handleCodeChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </section>

        <InputField
          label="New Password"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={handleNewPasswordChange}
          icon={FaLock}
          additionalChildren={
            <section onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FaEyeSlash className="text-2xl ml-2 text-gray-400 hover:text-gray-500 hover:scale-105 duration-500" />
              ) : (
                <FaEye className="text-2xl ml-2 text-gray-400 hover:text-gray-500 hover:scale-105 duration-500" />
              )}
            </section>
          }
        />

        <InputField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          icon={FaLock}
        />

        <div className="flex justify-between border-gray-300 border-t-2 pt-4">
          <section className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-600">Reset</h1>
            <p className="text-sm font-semibold text-gray-500 pr-2">
              Password must be at least 8 characters long and must include at
              least one number
            </p>
          </section>
          <button
            disabled={
              codes.some((code) => code === "") ||
              newPassword.length < 8 ||
              confirmPassword.length < 8
            }
            className={`flex rounded-full min-w-20 h-20 items-center justify-center duration-500 outline-blue-400
            ${
              !codes.some((code) => code === "") &&
              newPassword === confirmPassword &&
              /\d/.test(newPassword) &&
              newPassword.length >= 8 &&
              confirmPassword.length >= 8
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
          onClick={() => setError("")}
          className="flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8"
        >
          <h1 className="text-center text-red-600">{error}</h1>
        </div>
      )}

      {success && (
        <div className="flex flex-col items-center max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8 bg-white">
          <h1 className="w-full text-center text-2xl font-bold text-green-500 border-gray-300 border-b-2 pb-4 mb-4">
            Password changed successfully
          </h1>
          <Link
            to="/login"
            className="text-sm font-bold text-gray-500 hover:text-gray-600 duration-500 outline-none"
          >
            Go to Log in
          </Link>
        </div>
      )}
    </div>
  );
}
