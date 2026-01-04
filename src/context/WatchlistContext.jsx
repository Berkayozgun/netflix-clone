import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() => {
        try {
            const saved = localStorage.getItem('streamflow_watchlist');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Error loading watchlist:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('streamflow_watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.some(item => item.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
            toast.success('Added to Watchlist');
        }
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist(watchlist.filter(item => item.id !== movieId));
        toast.error('Removed from Watchlist');
    };

    const isInWatchlist = (movieId) => {
        return watchlist.some(item => item.id === movieId);
    };

    const toggleWatchlist = (movie) => {
        if (isInWatchlist(movie.id)) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
