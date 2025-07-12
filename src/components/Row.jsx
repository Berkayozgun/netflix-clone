import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from '../utils/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import MovieDetail from './MovieDetail.jsx';

const base_url = "https://image.tmdb.org/t/p/w500/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const request = await axios.get(fetchUrl);
        
        if (isMounted) {
          const movieResults = request.data.results || [];
          setMovies(movieResults);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load movies');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [fetchUrl]);

  const opts = useMemo(() => ({
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  }), []);

  const handleClick = useCallback((movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  }, [trailerUrl]);

  const handleMovieClick = useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseMovieDetail = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const truncate = useCallback((str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }, []);

  const handleMouseEnter = useCallback((movie) => {
    setHoveredMovie(movie);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredMovie(null);
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      if (isLargeRow) {
        return movie.poster_path;
      } else {
        return movie.backdrop_path;
      }
    });
  }, [movies, isLargeRow]);

  if (loading) {
    return (
      <div className="text-white ml-5 mr-5">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex gap-4 p-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse flex-shrink-0">
              <div className={`bg-gray-700 rounded ${isLargeRow ? 'w-56 h-80' : 'w-48 h-64'}`}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white ml-5 mr-5">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-gray-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-blue-400 hover:text-blue-300 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-white ml-5 mr-5">
        <h2 className="text-xl font-semibold mb-2 drop-shadow-lg">{title}</h2>
        <div className="flex overflow-x-scroll p-5 scroll-smooth scrollbar-hide">
          {filteredMovies.map((movie) => {
            const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
            const imageUrl = `${base_url}${imagePath}`;
            
            return (
              <div
                key={movie.id}
                className="relative group cursor-pointer transition-all duration-300 ease-in-out flex-shrink-0"
                onMouseEnter={() => handleMouseEnter(movie)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  className={`mr-4 transition-all duration-300 rounded-lg ${
                    isLargeRow ? 'w-56 h-80' : 'w-48 h-64'
                  } group-hover:scale-110 group-hover:z-10`}
                  style={{
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  src={imageUrl}
                  alt={movie.name || movie.title}
                />
                
                {/* Hover Overlay */}
                {hoveredMovie?.id === movie.id && (
                  <div className="absolute inset-0 bg-black/90 rounded-lg p-3 flex flex-col justify-between z-20 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1 text-white drop-shadow-lg">
                          {movie?.title || movie?.name || movie?.original_name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-200 mb-2">
                          <span className="text-green-400 font-semibold drop-shadow-md">
                            {movie?.vote_average?.toFixed(1)}
                          </span>
                          <span className="bg-black/50 px-1 py-0.5 rounded text-xs drop-shadow-sm">
                            {movie?.release_date?.split('-')[0]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-200 leading-relaxed drop-shadow-md">
                          {truncate(movie?.overview, 80)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <button className="bg-white text-black text-xs px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-200 transition-colors shadow-lg">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Play
                      </button>
                      <button className="bg-gray-600/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-600/60 transition-colors shadow-lg backdrop-blur-sm">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {trailerUrl && (
          <div className="w-full">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail 
          movieId={selectedMovie.id} 
          onClose={handleCloseMovieDetail} 
        />
      )}
    </>
  );
}

export default React.memo(Row); 