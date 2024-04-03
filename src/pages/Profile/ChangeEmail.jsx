import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";

function ChangeEmail() {
  const { validateSession } = useAuth();

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
        
        <section className="flex items-center justify-between border-gray-300 border-b-2 pb-4">
          <h1 className="text-center text-3xl font-bold text-gray-600">
            Change Email Request
          </h1>
        </section>

      </div>
    </div>
  );
}

export default ChangeEmail;
