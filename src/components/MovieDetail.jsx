import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function MovieDetail({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/movie/${movieId}?api_key=9030e02c98db26eb8794fd00c7fa10a5`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrailer = () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen relative">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} // Changed from /original/ to /w1280/
            alt={movie.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-3xl"
        >
          ✕
        </button>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Changed from /w500/ to /w500/ (already optimized)
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                  <span className="text-green-400 font-semibold">
                    {movie.vote_average?.toFixed(1)} Rating
                  </span>
                  <span>{movie.release_date?.split('-')[0]}</span>
                  <span>{movie.runtime} min</span>
                  <span className="bg-red-600 px-2 py-1 rounded text-xs">
                    {movie.adult ? 'TV-MA' : 'TV-14'}
                  </span>
                </div>

                <div className="flex gap-2 mb-6">
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {movie.overview}
                </p>

                <div className="flex gap-4">
                  <button className="bg-white text-black font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Play
                  </button>
                  <button 
                    onClick={handleTrailer}
                    className="bg-gray-600/70 text-white font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-600/50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Trailer
                  </button>
                  <button className="bg-gray-600/70 text-white font-bold py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-600/50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    My List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerUrl && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setTrailerUrl("")}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
            <YouTube 
              videoId={trailerUrl} 
              opts={{
                height: '390',
                width: '100%',
                playerVars: {
                  autoplay: 1,
                },
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail; 