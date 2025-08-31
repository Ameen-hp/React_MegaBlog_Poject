import React from 'react';

const Footer = () => {
  return (
    // Updated background and shadow for a softer, more modern look.
    <footer className="w-full bg-slate-900 text-slate-300 py-8 md:py-12 mt-10 rounded-t-2xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-8 md:space-y-0 md:space-x-8">
          {/* Brand/Logo Section */}
          <div className="flex-shrink-0">
            <a href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold text-indigo-500">Your</span>
              <span className="text-3xl font-bold text-white">Brand</span>
            </a>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <a href="/home" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Home</a>
            <a href="/about" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">About Us</a>
            <a href="/services" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Services</a>
            <a href="/contact" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Contact</a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="text-lg font-semibold text-white mb-2">Legal</h3>
            <a href="/privacy" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-400 transition-colors duration-300 ease-in-out">Terms of Service</a>
          </div>

          {/* Social Media/Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
            <p className="flex items-center space-x-2">
              <span>✉️</span>
              <span>info@yourbrand.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <span>📞</span>
              <span>+1 (123) 456-7890</span>
            </p>
            {/* Added transition to the social media icons for a smoother hover effect */}
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 ease-in-out" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.248-1.333 1.17-.667h3.83c0-2.423-1.042-4.333-4.17-4.333h-4c-3.128 0-5 1.579-5 4.667v2.333z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 ease-in-out" aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.797-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.447 0-6.237 2.783-6.237 6.204 0 .486.054.96.151 1.41-.519-.026-1.03-.082-1.536-.167-3.924-.76-7.391-4.149-9.717-9.845-.407.697-.641 1.517-.641 2.383 0 1.638.835 3.084 2.093 3.931-.777-.023-1.507-.238-2.148-.595v.078c0 3.013 2.14 5.526 4.978 6.096-.516.141-1.065.216-1.635.216-.402 0-.795-.039-1.178-.112.795 2.464 3.09 4.265 5.82 4.316-2.105 1.646-4.757 2.628-7.65 2.628-.493 0-.979-.028-1.454-.084 2.868 1.848 6.29 2.924 9.948 2.924 11.938 0 18.35-9.932 18.35-18.577 0-.283-.008-.562-.023-.84.996-.719 1.868-1.618 2.569-2.624z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;