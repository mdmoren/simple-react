import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";

import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

import usePost from "../../hooks/usePost";
import CancelEmailVerification from "./CancelEmailVerification";

const VerifyEmail = () => {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState(false);

  const inputRefs = useRef([]);

  const { loading, success, error, postData } = usePost();
  const { validateSession } = useAuth();

  useEffect(() => {
    validateSession();
  }, [validateSession]);

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

  const acknowledgeError = () => setErrorMessage("");

  const handleVerifyEmail = async () => {
    const code = codes.join("");

    await postData("/user/updateEmail", { code });

    if (success) {
      setErrorMessage("");
      setCodes(["", "", "", "", "", ""]);
    } else {
      setErrorMessage("Error: Invalid code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      {success ? (
        <div className="flex flex-col bg-white items-center max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="w-full text-center text-lg font-bold text-green-600 border-gray-300 border-b-2 pb-4 mb-4">
            Email has been updated
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
              Verify Email
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
                  className={`w-10 sm:w-12 h-10 sm:h-12 text-2xl text-center rounded-md border-2 outline-none border-gray-300 focus:border-blue-400
                ${code ? "border-green-400" : "hover:border-orange-400"}
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

          <div className="flex justify-between border-gray-300 border-t-2 pt-4">
            <section className="flex flex-col justify-between">
              <h1 className="text-2xl font-bold text-gray-600">Reset</h1>
              <p className="text-sm font-semibold text-gray-500 pr-2">
                Please find the reset code that was sent to the new email that
                was submitted.
              </p>
            </section>
            <button
              disabled={codes.some((code) => code === "")}
              className={`flex rounded-full min-w-20 h-20 items-center justify-center duration-500 outline-blue-400
            ${
              !codes.some((code) => code === "")
                ? "bg-green-400 hover:bg-green-400 group"
                : "bg-gray-300 cursor-not-allowed"
            }
            `}
              type="button"
              onClick={handleVerifyEmail}
            >
              <FaLongArrowAltRight className="text-4xl text-gray-500 group-hover:text-gray-600  duration-500" />
            </button>
          </div>
        </div>
      )}

      {!success && <CancelEmailVerification />}

      {loading && (
        <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="text-center">Loading...</h1>
        </div>
      )}

      {error && (
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

export default VerifyEmail;
