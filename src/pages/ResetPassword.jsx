import { useState } from "react";
import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleResetPassword() {
    // Add your password reset logic here
    console.log("reset password");
  }

  function handleCodeChange(e) {
    setCode(e.target.value);
  }

  function handleNewPasswordChange(e) {
    setNewPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    const password = e.target.value;
    setConfirmPassword(password);

    if (newPassword !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
        <h1 className="text-center text-2xl mb-4">Reset</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="code"
            >
              Code
            </label>
            <input
              className="shadow appearance-none border-b-2 border-white hover:border-blue-500 rounded focus:border-white focus:outline-blue-500 outline-purple-700 w-full py-2 px-3 text-gray-700 leading-tight duration-300"
              id="code"
              type="code"
              placeholder=""
              value={code}
              onChange={handleCodeChange}
            />
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
            className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2 px-8 rounded-md focus:outline-none shadow-black hover:shadow-lg duration-300 transition-all"
            type="button"
            onClick={handleResetPassword}
          >
            Submit
          </button>
        </div>
      </div>

      {error && (
        <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="text-center text-red-600">{error}</h1>
        </div>
      )}
    </div>
  );
}
