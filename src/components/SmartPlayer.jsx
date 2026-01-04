import React, { useState, useEffect } from 'react';

const SmartPlayer = ({ onClose, movie }) => {
    const [playerState, setPlayerState] = useState('buffering'); // buffering, playing, paused
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate buffering then play
        const bufferTimer = setTimeout(() => {
            setPlayerState('playing');
        }, 2000);

        return () => clearTimeout(bufferTimer);
    }, []);

    useEffect(() => {
        let progressInterval;
        if (playerState === 'playing') {
            progressInterval = setInterval(() => {
                setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
            }, 100);
        }
        return () => clearInterval(progressInterval);
    }, [playerState]);

    const togglePlay = () => {
        setPlayerState(prev => prev === 'playing' ? 'paused' : 'playing');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="w-full max-w-5xl aspect-video bg-black relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group">

                {/* Buffering State */}
                {playerState === 'buffering' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20">
                        <div className="w-16 h-16 border-4 border-stream-purple border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-stream-purple font-mono text-sm tracking-widest animate-pulse">OPTIMIZING STREAM...</p>
                    </div>
                )}

                {/* Mock Video Content (Gradient placeholder) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <div className="text-center opacity-20 transform group-hover:scale-105 transition-transform duration-700">
                        {movie ? (
                            <div className="relative z-10 p-10">
                                <h1 className="text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
                                    {movie.title || movie.name || "STREAMFLOW"}
                                </h1>
                                <p className="text-xl text-gray-400 tracking-[0.5em] uppercase">
                                    NOW PLAYING
                                </p>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">STREAM<span className="text-stream-purple">FLOW</span></h1>
                                <p className="text-xl text-gray-400 tracking-[0.5em]">CINEMATIC EXPERIENCE</p>
                            </>
                        )}
                    </div>
                    {/* Background Backdrop if available */}
                    {movie?.backdrop_path && (
                        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="w-full h-full object-cover" alt="" />
                        </div>
                    )}
                </div>

                {/* Player Controls (Visible on Hover or Paused) */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-end p-8 transition-opacity duration-300 ${playerState === 'playing' ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/20 rounded-full mb-6 cursor-pointer group/progress relative">
                        <div
                            className="h-full bg-stream-purple relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={togglePlay}
                                className="text-white hover:text-stream-purple transition-colors"
                            >
                                {playerState === 'playing' ? (
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                ) : (
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                )}
                            </button>

                            <button className="text-white hover:text-white/80 transition-transform hover:-rotate-12">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </button>

                            <div className="text-xs font-mono text-gray-300">
                                <span className="text-white">04:20</span> / 1:52:10
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white/90 border border-white/20">4K HDR</span>
                            <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-white/90 border border-white/20">DOLBY ATMOS</span>
                            <svg className="w-6 h-6 text-white cursor-pointer hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SmartPlayer;
