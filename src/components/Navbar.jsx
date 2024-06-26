import { Link } from "react-router-dom";
import { useState } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { useAuth } from "../providers/AuthContext";

const Navbar = () => {
  const { isAuthenticated, role } = useAuth();
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  const navData = [
    { id: 1, link: "/", label: "Home" },
    { id: 3, link: "/profile", label: "Profile" },
  ];

  if (role === "ROLE_ADMIN") {
    navData.splice(1, 0, { id: 2, link: "/admin", label: "Admin" });
  }

  return (
    <div className="fixed w-full z-50">
      <nav className="flex justify-between h-14 px-5 shadow-md  bg-white">
        <Link to="/">
          <section className="flex h-full items-center min-w-20">
            <h1 className="text-xl">TITLE</h1>
          </section>
        </Link>

        {isAuthenticated && (
          <section className="hidden sm:flex">
            <ul className="flex h-full items-center space-x-4">
              {navData.map((item) => (
                <Link
                  to={item.link}
                  key={item.id}
                  className="text-lg font-semibold hover:scale-105 duration-500 text-gray-600 hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </section>
        )}

        <section
          className={`flex h-full items-center min-w-20 ${
            isAuthenticated ? "justify-center sm:justify-end" : "justify-end"
          }`}
        >
          <FaReact className="text-2xl text-blue-600" />
        </section>

        {isAuthenticated && (
          <section className="sm:hidden flex h-full items-center min-w-20 justify-end">
            <CgMenuRight
              onClick={toggleMenu}
              className="text-2xl hover:scale-110 duration-500 hover:text-blue-600"
            />
          </section>
        )}

        {menu && (
          <div className="fixed top-0 left-0 flex w-full h-full sm:hidden p-4">
            <section className="w-full bg-white shadow-md rounded-md">
              <Link to="/" onClick={toggleMenu}>
                <section className="text-3xl w-full text-center mt-5">
                  TITLE
                </section>
              </Link>

              <ul className="flex flex-col space-y-8 w-full h-full items-center justify-center">
                {navData.map((item) => (
                  <Link
                    to={item.link}
                    key={item.id}
                    onClick={toggleMenu}
                    className="text-2xl hover:scale-110 duration-500 text-gray-700 hover:text-black"
                  >
                    {item.label}
                  </Link>
                ))}

                <CgClose
                  onClick={toggleMenu}
                  className="text-2xl hover:scale-110 duration-500 hover:text-red-600"
                />
              </ul>
            </section>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
