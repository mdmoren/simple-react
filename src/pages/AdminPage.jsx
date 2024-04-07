import { useEffect } from "react";
import { useAuth } from "../providers/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { RiLoader2Fill } from "react-icons/ri";

const AdminPage = () => {
  const { data, error, loading } = useFetch("/admin/getAllUsers");
  const { validateSession } = useAuth();

  useEffect(() => {
    validateSession("home");
  }, [validateSession]);

  if (error) {
    return <div className="pt-20 text-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-lg p-8 m-8">
        
        <section className="border-b-2 pb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Page</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat odit sapiente, omnis saepe consequatur totam eaque unde. Sint fuga ut aliquid dolorem unde necessitatibus voluptates quod iusto, molestias porro temporibus.
          </p>
        </section>

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <RiLoader2Fill className="text-3xl animate-spin text-gray-500"/>
          </div>
        ) : (
          <div className="overflow-x-auto mt-8">
            <table className="w-full table-auto md:table hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-600">ID</th>
                  <th className="px-4 py-2 text-left text-gray-600">Username</th>
                  <th className="px-4 py-2 text-left text-gray-600">Email</th>
                  <th className="px-4 py-2 text-left text-gray-600">First</th>
                  <th className="px-4 py-2 text-left text-gray-600">Last</th>
                  <th className="px-4 py-2 text-left text-gray-600">Role</th>
                  <th className="px-4 py-2 text-left text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-gray-800">{user.id}</td>
                    <td className="px-4 py-2 text-gray-800">{user.username}</td>
                    <td className="px-4 py-2 text-gray-800">{user.email}</td>
                    <td className="px-4 py-2 text-gray-800">{user.firstName}</td>
                    <td className="px-4 py-2 text-gray-800">{user.lastName}</td>
                    <td className="px-4 py-2 text-gray-800">{user.roles}</td>
                    <td className="px-4 py-2 text-gray-800">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <div className="md:hidden">
              <h2 className="text-lg font-bold text-gray-800 mb-4">USERS</h2>
              {data && data.map((user, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-4 rounded-md">
                  <p><span className="font-semibold">ID:</span> {user.id}</p>
                  <p><span className="font-semibold">Username:</span> {user.username}</p>
                  <p><span className="font-semibold">Email:</span> {user.email}</p>
                  <p><span className="font-semibold">First:</span> {user.firstName}</p>
                  <p><span className="font-semibold">Last:</span> {user.lastName}</p>
                  <p><span className="font-semibold">Role:</span> {user.roles}</p>
                  <p><span className="font-semibold">Status:</span> {user.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPage;
