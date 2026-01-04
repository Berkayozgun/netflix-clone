import React, { useState, useEffect } from 'react';

function Nav() {
  const [show, handleShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={`fixed top-0 w-full h-[68px] z-50 transition-all duration-500 ease-in-out ${show ? "bg-stream-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}>
      <div className="flex justify-between items-center h-full px-5 md:px-10">
        <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-stream-purple to-pink-600 cursor-pointer animate-pulse-slow">
          STREAMFLOW
        </h1>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className={`flex items-center bg-black/40 border border-white/10 rounded-full px-3 py-1.5 transition-all duration-300 ${isSearchOpen ? 'w-64 bg-black/60 border-stream-purple/50' : 'w-40 hover:bg-black/60'
            }`}>
            <svg
              className={`w-5 h-5 text-gray-400 mr-2 transition-colors ${isSearchOpen ? 'text-stream-purple' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onClick={() => setIsSearchOpen(true)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Titles, people, genres"
              className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder-gray-500"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => !searchValue && setIsSearchOpen(false)}
            />
          </div>

          {/* Profile Avatar */}
          <div className="relative group">
            <img
              className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-stream-purple transition-all duration-200"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="User Avatar"
            />
            <div className="absolute top-full right-0 mt-2 w-48 bg-stream-dark/95 border border-white/10 rounded-md shadow-xl py-1 hidden group-hover:block backdrop-blur-md">
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Settings</a>
              <div className="border-t border-white/10 my-1"></div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Sign out of StreamFlow</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;