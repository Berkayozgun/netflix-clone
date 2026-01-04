import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useWatchlist } from '../context/WatchlistContext';

const base_url = "https://image.tmdb.org/t/p/w500/";

function MovieCard({ movie, isLargeRow, onPlay, onMoreInfo, isFirst, isLast }) {
    const [isHovered, setIsHovered] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");
    const { isInWatchlist, toggleWatchlist } = useWatchlist();
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => {
            setIsHovered(true);
            // Try to fetch trailer when hovered
            movieTrailer(movie?.name || movie?.title || "")
                .then((url) => {
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get("v"));
                    }
                })
                .catch(() => { });
        }, 400); // 400ms delay before expanding
    };

    const handleMouseLeave = () => {
        clearTimeout(timerRef.current);
        setIsHovered(false);
        setTrailerUrl("");
    };

    const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
    const imageUrl = `${base_url}${imagePath}`;
    const inList = isInWatchlist(movie.id);

    // Transform Origin Logic for Popup
    let originClass = 'origin-center';
    if (isFirst) originClass = 'origin-left';
    if (isLast) originClass = 'origin-right';

    // Animation variants
    const variants = {
        normal: { scale: 1, zIndex: 1, transition: { duration: 0.3 } },
        hover: {
            scale: 1.3,
            zIndex: 99,
            transition: { duration: 0.4, type: "spring", bounce: 0.3 }
        }
    };

    return (
        <motion.div
            className={`relative flex-shrink-0 transition-all duration-300 ease-in-out cursor-pointer mr-2 ${isLargeRow ? 'w-48 h-72' : 'w-64 h-36'} ${originClass}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial="normal"
            whileHover="hover"
            animate={isHovered ? "hover" : "normal"}
            variants={variants}
            layoutId={`movie-${movie.id}`} // For smooth layout transitions
        >
            {/* Main Image */}
            <img
                className={`w-full h-full object-cover rounded-md shadow-md`}
                src={imageUrl}
                alt={movie.name}
            />

            {/* Expanded UI - shown on hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 left-0 w-full h-auto min-h-full bg-stream-dark rounded-md shadow-2xl z-50 overflow-hidden ring-2 ring-white/10"
                        style={{
                            // We use fixed width relative to parent to ensure consistent content sizing
                            // The scaling is handled by the parent motion.div
                            width: '100%',
                        }}
                    >
                        {/* Preview Image/Video */}
                        <div className="relative w-full h-32 bg-black">
                            {trailerUrl ? (
                                <YouTube
                                    videoId={trailerUrl}
                                    opts={{
                                        width: '100%',
                                        height: '100%',
                                        playerVars: { autoplay: 1, controls: 0, mute: 1, modestbranding: 1 }
                                    }}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-stream-dark to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="p-3 space-y-2">
                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
                                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-stream-purple hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie); }}
                                    className="w-8 h-8 rounded-full border-2 border-white/50 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors"
                                >
                                    {inList ? (
                                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    )}
                                </button>
                                <button
                                    className="w-8 h-8 rounded-full border-2 border-white/50 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors ml-auto"
                                    onClick={(e) => { e.stopPropagation(); onMoreInfo(movie); }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center gap-2 text-[10px] text-gray-300 font-semibold">
                                <span className="text-green-400">{Math.round(movie.vote_average * 10)}% Match</span>
                                <span className="border border-white/40 px-1 rounded text-[8px]">{movie.adult ? '18+' : '13+'}</span>
                                <span>{movie.media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-1">
                                <div className="text-[10px] text-gray-400">
                                    {movie?.title || movie?.name}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default MovieCard;
