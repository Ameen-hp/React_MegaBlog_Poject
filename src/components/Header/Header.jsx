import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHome, FaSignInAlt, FaUserPlus, FaList, FaPlus, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true, icon: <FaHome /> },
    { name: "Login", slug: "/login", active: !authStatus, icon: <FaSignInAlt /> },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: <FaUserPlus /> },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: <FaList /> },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: <FaPlus /> },
  ];

  return (
    <header className='w-full py-2 px-4 sm:px-6 shadow-xl bg-white sticky top-0 z-50 transition-shadow duration-300'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='p-2 transition-transform duration-300 transform hover:scale-105'>
            <Logo width='150px' />
          </Link>

          {/* Hamburger Icon for small screens */}
          <div className='md:hidden'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='text-2xl text-gray-700 focus:outline-none'
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Navigation Links */}
          <ul className={`
            flex-col md:flex-row md:flex items-center 
            md:space-x-4 space-y-2 md:space-y-0 
            absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent
            transition-all duration-300 ease-in-out
            ${menuOpen ? 'block' : 'hidden md:flex'} 
            p-4 md:p-0 shadow md:shadow-none
          `}>
            {navItems.map(item =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => { navigate(item.slug); setMenuOpen(false); }}
                    className='
                      inline-flex items-center px-5 py-3 rounded-full
                      text-lg sm:text-xl font-semibold
                      text-gray-700 transition-all duration-300 ease-in-out
                      hover:text-white hover:bg-indigo-500
                      transform hover:scale-105 w-full md:w-auto
                    '
                  >
                    <span className='mr-2 text-xl sm:text-2xl'>{item.icon}</span>
                    {item.name}
                  </button>
                </li>
              )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
