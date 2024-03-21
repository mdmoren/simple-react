import { Link } from "react-router-dom";
import { useState } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { FaReact } from "react-icons/fa";

function Navbar() {
  const [menu, setMenu] = useState(false);

  function toggleMenu() {
    setMenu(!menu);
  }

  const navData = [
    { id: 1, link: "/", label: "Home" },
    { id: 2, link: "/other", label: "Other" },
    { id: 3, link: "/login", label: "Log in" },
  ];

  return (
    <nav className="flex justify-between h-[50px] px-5 shadow-md rounded-md">
      {/* title section */}
      <Link to="/">
        <section className="flex h-full items-center min-w-20">
            <h1 className="text-xl">REACT</h1>
        </section>
      </Link>

      {/* links and utility */}
      <section className="hidden sm:flex">
        <ul className="flex h-full items-center space-x-4">
          {navData.map((item) => (
            <Link to={item.link} key={item.id} className="text-lg font-semibold hover:scale-105 duration-300 text-gray-500 hover:text-black">
              {item.label}
            </Link>
          ))}
        </ul>
      </section>

      <section className="flex h-full items-center min-w-20 justify-center sm:justify-end">
        <FaReact className="text-2xl text-blue-600"/>
      </section>

      {/* menu button */}
      <section className="sm:hidden flex h-full items-center min-w-20 justify-end">
        <CgMenuRight onClick={toggleMenu} className="text-2xl hover:scale-110 duration-300 hover:text-blue-600"/>
      </section>

      {/* pop up menu */}
      {menu && (
        <div className="fixed top-0 left-0 flex w-full h-full sm:hidden p-[10px]">
          <section className="w-full bg-white shadow-md rounded-md">
            <Link to="/" onClick={toggleMenu}>
              <section className="text-3xl w-full text-center mt-5">TITLE</section>
            </Link>

            <ul className="flex flex-col space-y-8 w-full h-full items-center justify-center">
              {navData.map((item) => (
                <Link to={item.link} key={item.id} onClick={toggleMenu} className="text-2xl hover:scale-110 duration-300 text-gray-700 hover:text-black">
                  {item.label}
                </Link>
              ))}

              <CgClose onClick={toggleMenu} className="text-2xl hover:scale-110 duration-300 hover:text-red-600"/>
            </ul>
          </section>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
