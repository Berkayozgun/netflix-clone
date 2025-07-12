import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import requests from '../utils/requests';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/search/multi?api_key=9030e02c98db26eb8794fd00c7fa10a5&query=${searchTerm}`);
      setSearchResults(response.data.results || []);
      setShowSearch(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    // TODO: Implement movie detail modal
    console.log('Movie clicked:', movie);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Search MovieMania</h1>
          <button 
            onClick={() => setShowSearch(false)}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for movies, TV shows, actors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-white">Searching...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {searchResults.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => handleMovieClick(item)}
              >
                <div className="flex gap-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`} // Already optimized for search results
                    alt={item.title || item.name}
                    className="w-16 h-24 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64x96/333333/666666?text=No+Image';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      {item.title || item.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      {item.overview?.substring(0, 80)}...
                    </p>
                    <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                      {item.media_type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && searchResults.length === 0 && showSearch && (
          <div className="text-center py-8">
            <p className="text-gray-400">No results found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search; 