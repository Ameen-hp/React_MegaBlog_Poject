import React from "react";

const Logo = () => {
  return (
    <a
      href="/" // Link to the homepage, adjust as needed
      className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out
                 md:text-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md"
      aria-label="Your Brand - Home"
    >
      {/*
        You can replace this text with an SVG icon or an image.
        For example:
        <img src="/path/to/your-logo.png" alt="Your Brand Logo" className="h-8 w-auto" />
        or
        <svg className="h-8 w-auto text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      */}
      <span className="text-indigo-600">Your</span>
      <span className="text-gray-800">Brand</span>
    </a>
  );
};
export default Logo