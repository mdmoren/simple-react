import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../providers/AuthContext";
import { BsThreeDots } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { RiLoader2Fill } from "react-icons/ri";

function Profile() {
  const { data, error, loading } = useFetch("/user/myProfile");
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  if (error) {
    return <div className="pt-20 text-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
        <section className="flex items-center justify-between border-gray-300 border-b-2 pb-4">
          <h1 className="text-center text-3xl font-bold text-gray-600">
            Profile
          </h1>
          <BsThreeDots className="text-2xl hover:scale-110 duration-300 hover:text-blue-600" />
        </section>

        <div className="flex h-52">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <RiLoader2Fill className="text-3xl animate-spin"/>
          </div>
        ) : (
          data && (
            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {data[0]?.username}
              </p>
              <p>
                <strong>Email:</strong> {data[0]?.email}
              </p>
              <p>
                <strong>Name:</strong> {data[0]?.firstName} {data[0]?.lastName}
              </p>
              <p>
                <strong>Status:</strong> {data[0]?.status}
              </p>
              <p>
                <strong>Role:</strong> {data[0]?.roles}
              </p>
            </div>
          )
        )}
        </div>

        <div className="flex justify-between border-gray-300 border-t-2 pt-4">
          <section className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-600">Log out</h1>
          </section>
          <button
            className="flex rounded-full w-20 h-20 items-center justify-center duration-500 outline-blue-400 bg-red-300 hover:bg-red-400 group"
            type="button"
            onClick={handleLogout}
          >
            <CgLogOut className="text-4xl text-gray-500 group-hover:text-gray-600 duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
