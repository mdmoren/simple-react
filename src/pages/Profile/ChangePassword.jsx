import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import { Link } from "react-router-dom";
import { usePost } from "../../hooks/usePost";

import InputField from "../../components/InputField";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
} from "react-icons/fa";

function ChangePassword() {
  const { validateSession } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { makeRequest, data, loading, postError } = usePost(
    "/user/updatePassword"
  );

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  async function handleChangePassword() {
    if (loading) return; // Prevents multiple submissions
  
    setError(""); 
    setSuccess(""); 
  
    await makeRequest({ oldPassword, newPassword });
  
    if (!postError && data) {

      setSuccess("Password changed successfully!");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(postError);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
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
          label="Old Password"
          type={showPassword ? "text" : "password"}
          value={oldPassword}
          onChange={handleOldPasswordChange}
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
            <p className="text-sm font-semibold text-gray-500">
              Password must be at least 8 characters long and must include at
              least one number
            </p>
          </section>
          <button
            disabled={newPassword.length < 8 || confirmPassword.length < 8}
            className={`flex rounded-full min-w-20 h-20 items-center justify-center duration-500 outline-blue-400
            ${
              newPassword === confirmPassword &&
              !(oldPassword === newPassword) &&
              /\d/.test(newPassword) &&
              newPassword.length >= 8 &&
              confirmPassword.length >= 8
                ? "bg-green-300 hover:bg-green-400 group"
                : "bg-gray-300 cursor-not-allowed"
            }
            `}
            type="button"
            onClick={handleChangePassword}
          >
            <FaLongArrowAltRight className="text-4xl text-gray-500 group-hover:text-gray-600  duration-500" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="text-center">Loading...</h1>
        </div>
      )}

      {error && (
        <div
          onClick={() => setError("")} // Corrected to reset the error state upon clicking
          className="cursor-pointer flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8"
        >
          <h1 className="text-center text-red-600">{error}</h1>
        </div>
      )}

      {success && (
        <div className="flex flex-col bg-white items-center max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="w-full text-center text-2xl font-bold text-green-500 border-gray-300 border-b-2 pb-4 mb-4">
            {data}
          </h1>

          <Link
            to="/profile"
            className="text-sm font-bold text-gray-500 hover:text-gray-600 duration-500 outline-none"
          >
            Go back to profile
          </Link>
        </div>
      )}
    </div>
  );
}

export default ChangePassword;
