import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
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

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
        <h1 className="text-center text-2xl mb-4">WELCOME</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border-b-2 border-white hover:border-blue-500 rounded focus:border-white focus:outline-blue-500 outline-purple-700 w-full py-2 px-3 text-gray-700 leading-tight duration-300"
              id="username"
              type="username"
              placeholder=""
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border-b-2 border-white hover:border-purple-600 rounded focus:border-white focus:outline-blue-500 outline-purple-700 w-full py-2 px-3 text-gray-700 leading-tight duration-300"
              id="password"
              type="password"
              placeholder="•••••••••"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="inline-block align-baseline font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent hover:text-purple-700 duration-300"
          >
            Forgot Password?
          </Link>
          <button
            className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2 px-8 rounded-md focus:outline-none shadow-black hover:shadow-lg duration-300 transition-all"
            type="button"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      </div>

      {error && (
        <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="text-center text-red-600">error message</h1>
        </div>
      )}
    </div>
  );
}
