import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { MdEmail } from "react-icons/md";

import InputField from "../../components/InputField";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

import usePost from "../../hooks/usePost";

const ChangeEmail = () => {
  const { validateSession } = useAuth();
  const { loading, success, error, postData } = usePost();

  const [newEmail, setNewEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  const handleEmailChange = (e) => setNewEmail(e.target.value);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const acknowledgeError = () => setErrorMessage("");

  const handleResetEmail = async () => {
    await postData("/user/changeEmail", { newEmail });

    if (success) {
      setErrorMessage("");
      setNewEmail("");
    } else {
      setErrorMessage("Error: Email could not be found.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      {success ? (
        <div className="flex flex-col bg-white items-center max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
          <h1 className="w-full text-center text-lg font-bold text-green-600 border-gray-300 border-b-2 pb-4 mb-4">
            Reset code has been sent to your new email
          </h1>
          <Link
            to="/profile"
            className="text-sm font-bold text-gray-500 hover:text-gray-600 duration-500 outline-none"
          >
            Verify new email
          </Link>
        </div>
      ) : (
        <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
          <section className="flex items-center border-gray-300 border-b-2 pb-4">
            <Link to="/profile">
              <FaLongArrowAltLeft className="text-2xl w-10 text-gray-500 hover:text-gray-600" />
            </Link>

            <h1 className="text-center text-2xl font-bold text-gray-600 flex-grow mr-10">
              Change Email
            </h1>
          </section>

          <InputField
            label="New Email"
            type="text"
            value={newEmail}
            onChange={handleEmailChange}
            icon={MdEmail}
          />

          <div className="flex justify-between border-gray-300 border-t-2 pt-4">
            <section className="flex flex-col justify-between">
              <h1 className="text-2xl font-bold text-gray-600">
                Send reset code
              </h1>
              <p className="text-sm font-semibold text-gray-500 pr-2">
                Enter the new email that you want to use for this profile
              </p>
            </section>
            <button
              disabled={!validateEmail(newEmail)}
              className={`flex rounded-full min-w-20 h-20 items-center justify-center duration-500 outline-blue-400
            ${
              validateEmail(newEmail)
                ? "bg-green-400 hover:bg-green-400 group"
                : "bg-gray-300 cursor-not-allowed"
            }
            `}
              type="button"
              onClick={handleResetEmail}
            >
              <FaLongArrowAltRight className="text-4xl text-gray-500 group-hover:text-gray-600  duration-500" />
            </button>
          </div>
        </div>
      )}

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

export default ChangeEmail;
