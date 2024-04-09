import { useState } from "react";
import { useNavigate } from "react-router-dom";

import usePost from "../../hooks/usePost";

const CancelEmailVerification = () => {
  const [showActions, setShowActions] = useState(false);

  const { postData } = usePost();
  const navigate = useNavigate();

  const toggleShowActions = () => {
    setShowActions(!showActions);
  };

  const handleCancelEmailVerification = async () => {
    await postData("/user/cancelEmailVerification");

    navigate("/profile")
  };

  return (
    <div className="flex flex-col bg-white items-center max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
      <h1 className="w-full text-center text-lg font-bold text-gray-600 border-gray-300 border-b-2 pb-4 mb-4">
        Did not recieve a code?
      </h1>

      <section className="flex justify-center w-full">
        <button
          onClick={toggleShowActions}
          className="text-sm font-bold text-gray-500 hover:text-gray-600 duration-500 outline-none"
        >
          Cancel verification
        </button>

        {showActions && (
          <div className="flex-grow flex justify-end space-x-4 duration-500">
            <button className="text-lg font-semibold text-gray-500 hover:text-green-600"
            onClick={handleCancelEmailVerification}>
              yes
            </button>
            <button
              className="text-lg font-semibold text-gray-500 hover:text-red-600"
              onClick={toggleShowActions}
            >
              no
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CancelEmailVerification;
