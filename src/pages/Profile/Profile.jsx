import { useState, useEffect, useMemo } from "react";

import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../providers/AuthContext";
import { Link } from "react-router-dom";

import { BsThreeDots } from "react-icons/bs";
import { CgLogOut, CgClose } from "react-icons/cg";
import { RiLoader2Fill } from "react-icons/ri";
import { FaLongArrowAltRight,FaExclamationCircle } from "react-icons/fa";

const Profile = () => {
  const [editMenu, setEditMenu] = useState(false);
  const { validateSession, logout } = useAuth();
  const { data, error, loading } = useFetch("/user/myProfile");

  useEffect(() => {
    validateSession();
  }, [validateSession]);

  const handleLogout = async () => await logout();
  const toggleEditMenu = () => setEditMenu((prevEditMenu) => !prevEditMenu);

  const userData = useMemo(() => data?.userData?.[0], [data]);

  if (error) {
    return <div className="pt-20 text-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
      <div className="flex flex-col bg-white max-w-md w-full shadow-md rounded-md space-y-6 px-8 pt-6 pb-8 m-8">
        <section className="relative flex items-center justify-between border-gray-300 border-b-2 pb-4">
          <h1 className="text-center text-3xl font-bold text-gray-600">
            Profile
          </h1>
          {editMenu ? (
            <CgClose
              className="text-2xl hover:scale-110 duration-500 text-gray-600 hover:text-red-600"
              onClick={toggleEditMenu}
            />
          ) : (
            <div className="flex items-center">
              {data?.emailChange && <FaExclamationCircle className="mr-2 text-xl text-red-600 animate-pulse"/>}
              <BsThreeDots
                className="text-2xl hover:scale-110 duration-500 text-gray-600 hover:text-blue-600"
                onClick={toggleEditMenu}
              />
            </div>
          )}
          {editMenu && (
            <section className="absolute right-0 top-10 border-2 bg-white px-8 pt-6 pb-8 shadow-md rounded-md">
              <ul className="space-y-2">
                <Link
                  to="/profile/changePassword"
                  className="group flex text-md font-semibold items-center justify-between text-gray-600 hover:text-blue-600 cursor-pointer duration-500"
                >
                  <label className="w-full text-end">Change Password</label>
                  <FaLongArrowAltRight className="mx-2 group-hover:translate-x-2  duration-500" />
                </Link>
                {!data?.emailChange ? (
                  <Link
                    to="/profile/changeEmail"
                    className="group flex text-md font-semibold items-center justify-between text-gray-600 hover:text-blue-600 cursor-pointer duration-500"
                  >
                    <label className="w-full text-end">Change Email</label>
                    <FaLongArrowAltRight className="mx-2 group-hover:translate-x-2 duration-500" />
                  </Link>
                ) : (
                  <Link
                    to="/profile/verifyEmail"
                    className="group flex text-md font-semibold items-center justify-between text-gray-600 hover:text-blue-600 cursor-pointer duration-500"
                  >
                    <FaExclamationCircle className="mr-2 text-2xl text-red-600 animate-pulse"/>
                    <label className="w-full text-end">Verify Email</label>
                    <FaLongArrowAltRight className="mx-2 group-hover:translate-x-2 duration-500" />
                  </Link>
                )}
              </ul>
            </section>
          )}
        </section>

        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <RiLoader2Fill className="text-3xl animate-spin" />
          </div>
        ) : (
          userData && (
            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Name:</strong> {userData.firstName} {userData.lastName}
              </p>
              <p>
                <strong>Status:</strong> {userData.status}
              </p>
              <p>
                <strong>Role:</strong> {userData.roles}
              </p>
            </div>
          )
        )}

        <div className="flex border-gray-300 border-t-2 pt-4 justify-end">
          <button
            className="flex justify-center items-center rounded-md outline-blue-400 bg-red-400 hover:bg-red-400 duration-500 p-2"
            type="button"
            onClick={handleLogout}
          >
            <h1 className="font-semibold">Log out</h1>
            <CgLogOut className="ml-2 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
