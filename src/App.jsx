import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Nav from './components/Nav.jsx';
import Banner from './components/Banner.jsx';
import Row from './components/Row.jsx';
import Footer from './components/Footer.jsx';
import { requests } from './services/api';
import { WatchlistProvider, useWatchlist } from './context/WatchlistContext';

// Separate component to consume context
const MainContent = () => {
  const { watchlist } = useWatchlist();

  return (
    <main className="flex-1">
      <Banner />
      <div className="space-y-8 pb-8">
        {watchlist.length > 0 && (
          <Row title="MY WATCHLIST" fetchUrl="" isLargeRow customMovies={watchlist} />
        )}
        <Row title="STREAMFLOW ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </main>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stream-dark text-white">
        <Nav />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-stream-purple mx-auto mb-4"></div>
            <p className="text-xl font-bold tracking-widest text-stream-purple">INITIALIZING STREAMFLOW...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WatchlistProvider>
      <div className="min-h-screen bg-stream-dark text-white">
        <Toaster position="bottom-center" toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
        }} />
        <Nav />
        <MainContent />
        <Footer />
      </div>
    </WatchlistProvider>
  );
}

export default App; 