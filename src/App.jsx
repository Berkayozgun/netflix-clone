import React, { useState, useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Banner from './components/Banner.jsx';
import Row from './components/Row.jsx';
import Footer from './components/Footer.jsx';
import requests from './utils/requests.js';

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
      <div className="min-h-screen bg-netflix-black text-white">
        <Nav />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-xl">Loading MovieMania...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Nav />
      <main className="flex-1">
        <Banner />
        <div className="space-y-8 pb-8">
          <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App; 