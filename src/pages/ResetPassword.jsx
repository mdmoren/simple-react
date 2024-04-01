import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";
import { useAuth } from "../providers/AuthContext";

export default function ResetPassword() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        setError("Password must be at least 8 characters long and must include at least one number");
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
      <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
        <h1 className="text-center text-2xl mb-4">Enter code below</h1>
        <div className="space-y-4">
        <div className="flex justify-center space-x-2">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              className="w-12 h-12 text-3xl text-center shadow appearance-none border-b-2 border-white hover:border-blue-500 rounded focus:border-white focus:outline-blue-500 outline-purple-700 text-gray-700 leading-tight duration-300"
              type="text"
              maxLength="1"
              value={code}
              onChange={(e) => handleCodeChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border-b-2 border-white hover:border-purple-600 rounded focus:border-white focus:outline-blue-500 outline-purple-700 w-full py-2 px-3 text-gray-700 leading-tight duration-300"
            id="password"
            type="password"
            placeholder=""
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border-b-2 border-white hover:border-purple-600 rounded focus:border-white focus:outline-blue-500 outline-purple-700 w-full py-2 px-3 text-gray-700 leading-tight duration-300"
            id="confirmPassword"
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="flex items-center align-baseline font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent hover:text-purple-700 duration-300"
          >
            Back
            <IoReturnDownBack className="ml-4 text-black text-2xl" />
          </Link>
          <button
            disabled={codes.some((code) => code === "") || newPassword.length < 8 || confirmPassword.length < 8}
            className={`bg-gradient-to-r ${!codes.some((code) => code === "") && newPassword.length >= 8 && confirmPassword.length >= 8 ? 'from-purple-700 to-blue-500 hover:from-purple-700 hover:to-purple-600' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold py-2 px-8 rounded-md focus:outline-none shadow-black hover:shadow-lg duration-300 transition-all`}
            type="button"
            onClick={handleResetPassword}
          >
            Submit
          </button>
        </div>
      </div>
      </div>
      {error && (
        <div
          onClick={() => setError("")}
          className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8"
        >
          <h1 className="text-center text-red-600">{error}</h1>
        </div>
      )}

      {success && (
        <div className="flex flex-col items-center max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="text-green-600 mb-6">Password changed successfully</h1>
          <Link
            to="/login"
            className="flex items-center align-baseline font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent hover:text-purple-700 duration-300"
          >
            Go to Log in
          </Link>
        </div>
      )}
    </div>
  );
}
