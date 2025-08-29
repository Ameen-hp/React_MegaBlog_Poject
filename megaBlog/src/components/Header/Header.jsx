import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// Assuming Container is in the same directory as Header
import Container from "./Container.jsx";
// Assuming Logo is in the same directory as Header
import Logo from "./Logo.jsx";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleLogout = () => {
    console.log("User logged out!");
    navigate("/login");
  };

  return (
    <header className="py-4 shadow-md bg-white text-gray-800 sticky top-0 z-50 rounded-b-lg">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="flex ml-auto items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-indigo-100 hover:text-indigo-700 rounded-full
                               text-lg font-medium transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <button
                  onClick={handleLogout}
                  className="inline-block px-6 py-2 duration-200 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full
                             text-lg font-medium transition-colors ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;