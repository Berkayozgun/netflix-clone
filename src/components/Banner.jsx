import React, { useState, useEffect, useMemo } from 'react';
import axios from '../utils/axios';
import requests from '../utils/requests';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const randomMovie = request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching banner movie:', error);
      }
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const getAgeRating = (voteAverage) => {
    if (voteAverage >= 8) return "TV-MA";
    if (voteAverage >= 6) return "TV-14";
    return "TV-PG";
  };

  const backgroundStyle = useMemo(() => ({
    backgroundSize: "cover",
    backgroundImage: movie?.backdrop_path 
      ? `url("https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}")`
      : 'linear-gradient(to right, #000000, #333333)',
    backgroundPosition: "center center",
  }), [movie?.backdrop_path]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <header
      className="relative h-[448px] text-white object-cover"
      style={backgroundStyle}
    >
      {movie?.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt=""
          className="hidden"
          onLoad={handleImageLoad}
        />
      )}
      
      {/* Text overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      
      <div className="relative z-10 ml-10 pt-36 h-48">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-green-400 font-semibold text-sm drop-shadow-lg">
            {movie?.vote_average?.toFixed(1)} Rating
          </span>
          <span className="text-gray-200 text-sm drop-shadow-lg bg-black/30 px-2 py-1 rounded">
            {getAgeRating(movie?.vote_average)}
          </span>
          <span className="text-gray-200 text-sm drop-shadow-lg bg-black/30 px-2 py-1 rounded">
            {movie?.release_date?.split('-')[0]}
          </span>
        </div>
        
        <h1 className="text-5xl font-extrabold pb-1 drop-shadow-2xl text-shadow-lg">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        
        <div className="flex gap-4 mt-4">
          <button className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play
          </button>
          <button className="bg-gray-600/70 hover:bg-gray-600/50 text-white font-bold py-3 px-8 rounded flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-lg backdrop-blur-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            My List
          </button>
          <button className="bg-gray-600/70 hover:bg-gray-600/50 text-white font-bold py-3 px-8 rounded flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-lg backdrop-blur-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Info
          </button>
        </div>
        
        <h1 className="w-96 text-sm pt-4 max-w-sm h-20 drop-shadow-lg text-shadow-md leading-relaxed">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="h-28 bg-gradient-to-t from-netflix-black to-transparent absolute bottom-0 w-full" />
    </header>
  );
}

export default Banner; 