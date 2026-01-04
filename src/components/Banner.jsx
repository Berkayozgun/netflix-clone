import React, { useState, useEffect, useMemo } from 'react';
import axios from '../utils/axios';
import requests from '../utils/requests';
import SmartPlayer from './SmartPlayer';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

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
      className="relative h-[448px] text-white object-cover group"
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

      {/* Smart Player Modal */}
      {showPlayer && (
        <SmartPlayer onClose={() => setShowPlayer(false)} />
      )}

      {/* Gradient Overlay with Purple Tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-stream-dark via-transparent to-transparent"></div>

      <div className="relative z-10 ml-10 pt-36 h-48">
        <div className="flex items-center gap-4 mb-2 animate-fade-in-up">
          <span className="text-green-400 font-bold text-sm drop-shadow-lg tracking-wide">
            {movie?.vote_average?.toFixed(1) * 10}% MATCH
          </span>
          <span className="text-gray-200 text-sm drop-shadow-lg bg-white/10 border border-white/20 px-2 py-0.5 rounded backdrop-blur">
            {getAgeRating(movie?.vote_average)}
          </span>
          <span className="text-gray-200 text-sm drop-shadow-lg bg-white/10 border border-white/20 px-2 py-0.5 rounded backdrop-blur">
            {movie?.release_date?.split('-')[0]}
          </span>
          <span className="px-2 py-0.5 border border-white/40 rounded text-xs text-gray-300 font-semibold tracking-wider">
            HD
          </span>
        </div>

        <h1 className="text-5xl font-black pb-1 drop-shadow-2xl text-shadow-lg w-2/3 leading-tight tracking-tight mb-4">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setShowPlayer(true)}
            className="bg-white text-black hover:bg-stream-purple hover:text-white font-bold py-3 px-8 rounded-md flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] z-20"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play Now
          </button>
          <button className="bg-gray-500/30 hover:bg-gray-500/50 text-white font-bold py-3 px-8 rounded-md flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md border border-white/10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
        </div>

        <h1 className="w-[45rem] text-sm pt-6 max-w-2xl text-gray-300 drop-shadow-md leading-relaxed line-clamp-3">
          {truncate(movie?.overview, 180)}
        </h1>
      </div>
    </header>
  );
}

export default Banner;
