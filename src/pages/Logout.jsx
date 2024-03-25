import { useAuth } from "../providers/AuthContext";

function Logout() {
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20">
      <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8">
        <h1 className="text-center text-2xl mb-4">Logout Page</h1>

        <button
          className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2 px-8 rounded-md focus:outline-none shadow-black hover:shadow-lg duration-300 transition-all"
          type="button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Logout;
