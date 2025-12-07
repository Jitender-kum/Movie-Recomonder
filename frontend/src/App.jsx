import React, { useState } from 'react';
import Navbar from './components/Navbar'; // <-- Updated Component import hoga
import MoodSelector from './components/MoodSelector';
import Auth from './components/Auth';
import Wishlist from './components/Wishlist';
import { fetchMoviesByMood, toggleFavoriteAPI } from './api';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  // Helper: Check agar movie pehle se favorite hai
  const isFav = (movieId) => {
    return user?.favorites?.some(fav => fav.movieId === movieId.toString());
  };

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setLoading(true);
    setShowWishlist(false);
    try {
      const data = await fetchMoviesByMood(mood);
      setMovies(data);
    } catch (error) {
      toast.error("Error fetching movies!");
    }
    setLoading(false);
  };

  const handleFavoriteClick = async (movie) => {
    if (!user) {
      toast.error("Please Login to save movies! 🔒");
      setShowLogin(true);
      return;
    }

    const alreadyAdded = isFav(movie.id);

    try {
      const updatedData = await toggleFavoriteAPI(user.email, movie);
      if (updatedData) {
        setUser({ ...user, favorites: updatedData.favorites });
        if (alreadyAdded) toast.success("Removed from Watchlist 💔");
        else toast.success("Added to Watchlist ❤️");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMovies([]);
    setSelectedMood('');
    setShowWishlist(false);
    toast.success("Logged out successfully 👋");
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- NAVBAR MEIN PROPS PASS KAR DIYE --- */}
      <Navbar 
        user={user}
        handleLogout={handleLogout}
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        setShowWishlist={setShowWishlist}
      />
      
      {/* Wo purana user info wala DIV yahan se HATA DIYA hai */}

      <div style={{ padding: '20px', minHeight: '80vh' }}>
        
        {/* VIEW LOGIC */}
        {showLogin && !user ? (
          <Auth onLoginSuccess={(userData) => { 
              setUser(userData); 
              setShowLogin(false); 
              toast.success(`Welcome back, ${userData.name}! 🚀`);
          }} />
        
        ) : showWishlist && user ? (
          <Wishlist 
            favorites={user.favorites} 
            onRemove={handleFavoriteClick} 
            onBack={() => setShowWishlist(false)} 
          />
        
        ) : (
          <>
            <MoodSelector onSelectMood={handleMoodSelect} />
            
            {loading ? (
                <div style={{textAlign: 'center', marginTop: '50px', color: '#666'}}>
                    <h2>Loading awesome movies... 🍿</h2>
                </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px', marginTop: '20px' }}>
                {movies.map((movie) => (
                  <div key={movie.id} style={styles.card}>
                    <div style={{position: 'relative'}}>
                        <img 
                          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                          alt={movie.title} 
                          style={styles.image} 
                        />
                        <div 
                            onClick={() => handleFavoriteClick(movie)} 
                            style={styles.heartIcon}
                        >
                            {isFav(movie.id) ? <FaHeart color="#e50914" size={20} /> : <FaRegHeart color="white" size={20} />}
                        </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <p style={{ margin: 0, color: '#aaa', fontSize: '12px' }}>⭐ {movie.vote_average?.toFixed(1)}</p>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// App.jsx ke styles mein se loginBtn hata diya kyunki ab wo navbar mein hai
const styles = {
  card: { width: '200px', backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', transition: 'transform 0.3s' },
  image: { width: '100%', height: '300px', objectFit: 'cover' },
  heartIcon: {
      position: 'absolute', top: '10px', right: '10px', 
      backgroundColor: 'rgba(0,0,0,0.7)', padding: '8px', 
      borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10
  }
};

export default App;