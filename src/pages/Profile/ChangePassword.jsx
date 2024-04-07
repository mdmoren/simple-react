import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import { Link } from "react-router-dom";

import InputField from "../../components/InputField";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
} from "react-icons/fa";

import usePost from "../../hooks/usePost";

const ChangePassword = () => {
  const { validateSession } = useAuth();
  const { loading, success, postData } = usePost();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  const handlecurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const acknowledgeError = () => setErrorMessage("");

  const allowSubmit = () => {
    return (
      newPassword === confirmPassword &&
      !(currentPassword === newPassword) &&
      /\d/.test(newPassword) &&
      currentPassword.length >= 1 &&
      newPassword.length >= 8 &&
      confirmPassword.length >= 8
    );
  };

  const handleChangePassword = async () => {
    await postData("/user/updatePassword", { currentPassword, newPassword });

    setCurrentPassword("");

    if (success) {
      setErrorMessage("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setErrorMessage(
        "Error: Unable to change password. Please make sure your current password is correct."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      {success ? (
        <div className="flex flex-col bg-white items-center max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="w-full text-center text-2xl font-bold text-green-600 border-gray-300 border-b-2 pb-4 mb-4">
            Password has been updated
          </h1>
          <Link
            to="/profile"
            className="text-sm font-bold text-gray-500 hover:text-gray-600 duration-500 outline-none"
          >
            Go back to profile
          </Link>
        </div>
      ) : (
        <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
          <section className="flex items-center border-gray-300 border-b-2 pb-4">
            <Link to="/profile">
              <FaLongArrowAltLeft className="text-2xl w-10 text-gray-500 hover:text-gray-600" />
            </Link>
            <h1 className="text-center text-2xl font-bold text-gray-600 flex-grow mr-10">
              Change Password
            </h1>
          </section>
          <InputField
            label="Current Password"
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={handlecurrentPasswordChange}
            icon={FaLock}
            additionalChildren={
              <section onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash className="text-2xl ml-2 text-gray-300 hover:text-gray-500 hover:scale-105 duration-500" />
                ) : (
                  <FaEye className="text-2xl ml-2 text-gray-300 hover:text-gray-500 hover:scale-105 duration-500" />
                )}
              </section>
            }
          />
          <InputField
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            icon={FaLock}
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
              <h1 className="text-2xl font-bold text-gray-600">Submit</h1>
              <p className="text-sm font-semibold text-gray-500 pr-2">
                Password must be at least 8 characters long and must include at
                least one number
              </p>
            </section>
            <button
              disabled={!allowSubmit}
              className={`flex rounded-full min-w-20 h-20 items-center justify-center duration-500 outline-blue-400
              ${
                allowSubmit()
                  ? "bg-green-400 hover:bg-green-400 group"
                  : "bg-gray-300 cursor-not-allowed"
              }
              `}
              type="button"
              onClick={handleChangePassword}
            >
              <FaLongArrowAltRight className="text-4xl text-gray-500 group-hover:text-gray-600 duration-500" />
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="text-center">Loading...</h1>
        </div>
      )}

      {errorMessage && !success && (
        <div
          onClick={acknowledgeError}
          className="flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8"
        >
          <h1 className="text-center font-bold text-red-600">{errorMessage}</h1>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
