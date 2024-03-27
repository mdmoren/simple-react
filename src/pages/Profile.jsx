import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../providers/AuthContext";
import { BsThreeDots } from "react-icons/bs";

function Profile() {
  const { data, error, loading } = useFetch("/user/myProfile");
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  if (loading) {
    return <div className="pt-20 text-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="pt-20 text-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col max-w-md w-full shadow-md rounded px-8 pt-6 pb-8 m-8 space-y-4">
        <section className="flex justify-between items-center border-b-2 pb-2">
          <h1 className="text-center font-semibold text-2xl">PROFILE</h1>

          <BsThreeDots className="text-2xl hover:scale-110 duration-300 hover:text-blue-600" />
        </section>
        {data && (
          <div>
            <p>
              <strong>username:</strong> {data[0].username}
            </p>
            <p>
              <strong>email:</strong> {data[0].email}
            </p>
            <p>
              <strong>Name:</strong> {data[0].firstName} {data[0].lastName}
            </p>
            <p>
              <strong>status:</strong> {data[0].status}
            </p>
            <p>
              <strong>role:</strong> {data[0].roles}
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-2 px-8 rounded-md focus:outline-none shadow-black hover:shadow-lg duration-300 transition-all"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
