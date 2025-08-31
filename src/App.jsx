import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    // This container manages the entire page layout
    <div className='min-h-screen flex flex-col bg-gray-100'>
      {loading ? (
        <div className="flex justify-center items-center flex-grow py-20 animate-pulse text-gray-700 text-3xl font-bold">
          Loading Application...
        </div>
      ) : (
        <>
          <Header />
          {/* This main content area takes up all available vertical space */}
          <main className='flex-grow'>
            <Outlet />
          </main>
          {/* The Footer is now correctly positioned at the bottom */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;