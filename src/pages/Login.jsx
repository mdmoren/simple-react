import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginButton() {
    console.log("Log in button pressed");
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
        {/* <h1 className="text-center text-2xl mb-4">Login Page</h1> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border-b-2 border-white hover:border-blue-500 rounded focus:border-white focus:outline-blue-500 w-full py-2 px-3 text-gray-700 leading-tight duration-300"
            id="email"
            type="email"
            placeholder="me@example.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border-b-2 hover:border-blue-500 rounded focus:border-white focus:outline-blue-500 w-full py-2 px-3 text-gray-700 leading-tight duration-300"
            id="password"
            type="password"
            placeholder="•••••••••"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent hover:text-purple-700 duration-300"
          >
            Forgot Password?
          </Link>
          <button
            className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-800 hover:to-blue-600 text-white font-bold py-2 px-8 rounded-md focus:outline-none shadow-black hover:shadow-lg duration-300 transition-all"
            type="button"
            onClick={loginButton}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
