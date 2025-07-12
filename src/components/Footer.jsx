import React from 'react';

function Footer() {
  return (
    <footer className="bg-netflix-black text-white py-12 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🍿</span>
              <h3 className="text-xl font-bold text-red-600">MovieMania</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your ultimate destination for movies and TV shows. Discover, watch, and enjoy the best content.
            </p>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-red-500 transition-colors text-sm">Home</a></li>
              <li><a href="#movies" className="hover:text-red-500 transition-colors text-sm">Movies</a></li>
              <li><a href="#tv-shows" className="hover:text-red-500 transition-colors text-sm">TV Shows</a></li>
              <li><a href="#my-list" className="hover:text-red-500 transition-colors text-sm">My List</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#action" className="hover:text-red-500 transition-colors text-sm">Action</a></li>
              <li><a href="#comedy" className="hover:text-red-500 transition-colors text-sm">Comedy</a></li>
              <li><a href="#drama" className="hover:text-red-500 transition-colors text-sm">Drama</a></li>
              <li><a href="#horror" className="hover:text-red-500 transition-colors text-sm">Horror</a></li>
              <li><a href="#romance" className="hover:text-red-500 transition-colors text-sm">Romance</a></li>
              <li><a href="#documentary" className="hover:text-red-500 transition-colors text-sm">Documentary</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#help" className="hover:text-red-500 transition-colors text-sm">Help Center</a></li>
              <li><a href="#contact" className="hover:text-red-500 transition-colors text-sm">Contact Us</a></li>
              <li><a href="#faq" className="hover:text-red-500 transition-colors text-sm">FAQ</a></li>
              <li><a href="#feedback" className="hover:text-red-500 transition-colors text-sm">Feedback</a></li>
              <li><a href="#privacy" className="hover:text-red-500 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-red-500 transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#facebook" className="text-white hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#twitter" className="text-white hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#instagram" className="text-white hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
              <a href="#youtube" className="text-white hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p>Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded-l focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-r hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MovieMania. All rights reserved.</p>
          <p className="mt-2 text-sm">This is a demo project for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 