import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Or use centralized API
import movieTrailer from 'movie-trailer';
import { motion, AnimatePresence } from 'framer-motion';

function MovieDetail({ movieId, onClose, onPlay }) {
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
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9030e02c98db26eb8794fd00c7fa10a5&append_to_response=similar,credits`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      // Fallback or better error handling
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
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          }
        })
        .catch((error) => console.log(error));
    }
  };

  if (loading) return null; // Or a smaller loading state if desired
  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          layoutId={`movie-${movieId}`}
          className="relative bg-stream-dark w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden m-4 outline-none"
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {/* Hero Section */}
          <div className="relative h-[400px] w-full">
            <div className="absolute inset-0">
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stream-dark via-transparent to-transparent"></div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-4">
              <h1 className="text-5xl font-black text-white drop-shadow-lg">{movie.title}</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={onPlay}
                  className="bg-white text-black font-bold py-2 px-8 rounded flex items-center gap-2 hover:bg-stream-purple hover:text-white transition-all shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  Play
                </button>
                <button className="bg-gray-600/60 text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-gray-600/80 backdrop-blur-md">
                  + My List
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left: Info */}
            <div className="md:col-span-2 text-gray-300 space-y-6">
              <div className="flex items-center gap-4 text-sm font-semibold">
                <span className="text-green-400 text-lg">{Math.round(movie.vote_average * 10)}% Match</span>
                <span className="border border-gray-500 px-2 py-0.5 rounded text-gray-400">{movie.release_date?.split('-')[0]}</span>
                <span className="border border-white/40 px-2 py-0.5 rounded hover:bg-white/10">{movie.adult ? '18+' : '13+'}</span>
                <span>{movie.runtime} min</span>
              </div>

              <p className="text-lg leading-relaxed text-white">
                {movie.overview}
              </p>
            </div>

            {/* Right: Meta */}
            <div className="md:col-span-1 space-y-4 text-sm text-gray-400">
              <div>
                <span className="text-gray-500 block mb-1">Genres:</span>
                <span className="text-white hover:underline cursor-pointer">
                  {movie.genres?.map(g => g.name).join(', ')}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Spoken Languages:</span>
                <span className="text-white">
                  {movie.spoken_languages?.map(l => l.name).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Similar Movies (Mock/Fetched) */}
          {movie.similar?.results?.length > 0 && (
            <div className="p-10 pt-0">
              <h3 className="text-xl font-bold text-white mb-6">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {movie.similar.results.slice(0, 6).map(sim => (
                  <div key={sim.id} className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 cursor-pointer transition-colors relative group">
                    <div className="h-32 bg-gray-800 relative">
                      <img src={`https://image.tmdb.org/t/p/w300${sim.backdrop_path || sim.poster_path}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/20 p-2 rounded-full border border-white/50">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-gray-200 text-sm font-semibold truncate">{sim.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{sim.release_date?.split('-')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MovieDetail;