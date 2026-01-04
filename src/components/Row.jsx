import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StreamFlowApi } from '../services/api';
import YouTube from 'react-youtube';
import MovieDetail from './MovieDetail.jsx';
import SmartPlayer from './SmartPlayer';
import SkeletonCard from './SkeletonCard';
import MovieCard from './MovieCard'; // Import the new interaction component
import { useWatchlist } from '../context/WatchlistContext';

function Row({ title, fetchUrl, isLargeRow, ...props }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSmartPlayer, setShowSmartPlayer] = useState(false);
  const [playingMovie, setPlayingMovie] = useState(null); // Add state for player

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (props.customMovies) {
        setMovies(props.customMovies);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await StreamFlowApi.get(fetchUrl);
        if (isMounted) {
          const movieResults = data.results || [];
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
  }, [fetchUrl, props.customMovies]);

  const handleMovieClick = useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseMovieDetail = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handlePlayMovie = useCallback((movie) => {
    setPlayingMovie(movie);
    setShowSmartPlayer(true);
  }, []);

  if (loading) {
    return (
      <div className="text-white ml-5 mr-5">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex gap-4 p-5 overflow-x-hidden">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} isLargeRow={isLargeRow} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <>
      <div className="text-white ml-5 mr-5 relative z-10">
        <h2 className="text-xl font-semibold mb-2 drop-shadow-lg pl-2 border-l-4 border-stream-purple">{title}</h2>

        {/* Added extra vertical padding (py-16) to prevent clipping of hovered cards */}
        <div className="flex overflow-x-scroll px-4 py-16 scroll-smooth scrollbar-hide space-x-4 pl-2 -my-8 group">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isLargeRow={isLargeRow}
              onPlay={() => handlePlayMovie(movie)}
              onMoreInfo={() => handleMovieClick(movie)}
              isFirst={index === 0}
              isLast={index === movies.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetail
          movieId={selectedMovie.id}
          onClose={handleCloseMovieDetail}
          onPlay={() => {
            handleCloseMovieDetail();
            // Pass the selected movie to the player
            setPlayingMovie(selectedMovie);
            setShowSmartPlayer(true);
          }}
        />
      )}

      {/* Smart Player Modal */}
      {showSmartPlayer && (
        <SmartPlayer
          movie={playingMovie}
          onClose={() => {
            setShowSmartPlayer(false);
            setPlayingMovie(null);
          }}
        />
      )}
    </>
  );
}

export default React.memo(Row);