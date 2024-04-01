import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import InputField from "../components/InputField";

import {
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaLongArrowAltRight,
} from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login } = useAuth();

  async function handleLogin() {
    try {
      await login(username, password);
    } catch (error) {
      setError(true);
    }
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function acknowledgeError() {
    setError(false);
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const isPasswordValid = password.length >= 5 && username !== "";

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
        
        <section className="border-gray-100 border-b-2 pb-4">
          <h1 className="text-center text-3xl font-bold text-gray-500">
            Welcome
          </h1>
        </section>

        <InputField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          icon={FaUser}
        />

        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          icon={FaLock} // Leading icon
          additionalChildren={
            <section onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FaEyeSlash className="text-2xl ml-2 text-gray-300 hover:text-gray-400 hover:scale-105 duration-500" />
              ) : (
                <FaEye className="text-2xl ml-2 text-gray-300 hover:text-gray-400 hover:scale-105 duration-500" />
              )}
            </section>
          }
        />

        <div className="flex justify-between border-gray-100 border-t-2 pt-4">
          <section className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-500">Login</h1>
            <Link
              to="/forgot-password"
              className="text-sm font-bold text-gray-400 hover:text-gray-500 duration-500 outline-none"
            >
              Forgot Password?
            </Link>
          </section>
          <button
            disabled={!isPasswordValid}
            className={`flex rounded-full w-20 h-20 items-center justify-center duration-500 outline-blue-200
            ${
              isPasswordValid
                ? "bg-green-200 hover:bg-green-300 group"
                : "bg-gray-200 cursor-not-allowed"
            }
            `}
            type="button"
            onClick={handleLogin}
          >
            <FaLongArrowAltRight className="text-4xl text-gray-400 group-hover:text-gray-500  duration-500" />
          </button>
        </div>
      </div>

      {error && (
        <div
          onClick={acknowledgeError}
          className="flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8"
        >
          <h1 className="text-center text-red-600">error message</h1>
        </div>
      )}
    </div>
  );
}
