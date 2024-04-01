import { Link } from "react-router-dom";
import { useState } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { useAuth } from "../providers/AuthContext";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [menu, setMenu] = useState(false);

  function toggleMenu() {
    setMenu(!menu);
  }

  const navData = [
    { id: 1, link: "/", label: "Home", requiresAuth: true },
    { id: 2, link: "/profile", label: "Profile", requiresAuth: true },
  ];

  return (
    <div className="fixed w-full p-4">
      <nav className="flex justify-between h-14 px-5 shadow-md rounded-md bg-white">

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
                  className="text-lg font-semibold hover:scale-105 duration-300 text-gray-500 hover:text-black"
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
              className="text-2xl hover:scale-110 duration-300 hover:text-blue-600"
            />
          </section>
        )}

        {menu && (
          <div className="fixed top-0 left-0 flex w-full h-full sm:hidden p-[10px]">
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
                    className="text-2xl hover:scale-110 duration-300 text-gray-700 hover:text-black"
                  >
                    {item.label}
                  </Link>
                ))}

                <CgClose
                  onClick={toggleMenu}
                  className="text-2xl hover:scale-110 duration-300 hover:text-red-600"
                />
              </ul>
            </section>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
