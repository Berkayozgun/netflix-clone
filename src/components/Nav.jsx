import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';

const Nav = () => {
  const [show, handleShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearchModal(true);
  };

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in ${
        show ? 'bg-netflix-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-red-600 font-bold text-2xl cursor-pointer drop-shadow-lg">
            <span className="text-3xl">🍿</span> MovieMania
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center bg-black/80 border border-white/30 rounded px-3 py-1 max-w-md backdrop-blur-sm shadow-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="bg-transparent border-none text-white outline-none flex-1 px-2 py-1 text-sm placeholder-white/70"
              />
              <button 
                type="submit"
                className="bg-transparent border-none text-white cursor-pointer px-2 py-1 rounded hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <div className="relative group">
              <img
                className="w-8 h-8 rounded cursor-pointer shadow-lg"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Profile"
              />
              <div className="absolute top-full right-0 bg-black/95 border border-white/10 rounded min-w-[150px] py-2 hidden group-hover:block z-50 backdrop-blur-sm shadow-xl">
                <span className="block px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors">Profile</span>
                <span className="block px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors">Account</span>
                <span className="block px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors">Help Center</span>
                <span className="block px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors">Sign out of MovieMania</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="flex items-center bg-black/80 border border-white/30 rounded px-3 py-2 backdrop-blur-sm shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-transparent border-none text-white outline-none flex-1 px-2 py-1 text-sm placeholder-white/70"
                />
                <button 
                  type="submit"
                  className="bg-transparent border-none text-white cursor-pointer px-2 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              
              <div className="space-y-2">
                <span className="block px-2 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors rounded">Profile</span>
                <span className="block px-2 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors rounded">Account</span>
                <span className="block px-2 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors rounded">Help Center</span>
                <span className="block px-2 py-2 text-white text-sm cursor-pointer hover:bg-white/10 transition-colors rounded">Sign out of MovieMania</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <Search />
      )}
    </>
  );
};

export default Nav; 