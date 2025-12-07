import React from 'react';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';

const Wishlist = ({ favorites, onRemove, onBack }) => {
  return (
    <div style={{ padding: '20px', animation: 'fadeIn 0.5s' }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
        <button 
            onClick={onBack} 
            style={styles.backBtn}
        >
            <FaArrowLeft /> Back
        </button>
        <h2 style={{ margin: '0 auto', color: '#fff', transform: 'translateX(-40px)' }}>
            My Watchlist <span style={{color: '#e50914'}}>({favorites.length})</span>
        </h2>
      </div>

      {/* Logic: Empty hai ya Movies hain? */}
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '80px', color: '#555' }}>
            <h1 style={{ fontSize: '60px', marginBottom: '10px', opacity: 0.5 }}>💔</h1>
            <h3 style={{color: '#ddd'}}>Your list is empty!</h3>
            <p>Go back and explore some movies based on your mood.</p>
            <button onClick={onBack} style={{marginTop: '20px', padding: '10px 20px', background: '#e50914', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
                Find Movies
            </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
          {favorites.map((movie) => (
            <div key={movie.movieId} style={styles.card}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : 'https://via.placeholder.com/500x750'} 
                  alt={movie.title} 
                  style={styles.image} 
                />
                
                {/* Remove Button */}
                <div 
                  onClick={() => onRemove({ id: movie.movieId, title: movie.title })}
                  style={styles.heartIcon}
                  title="Remove from List"
                >
                  <FaHeart color="#e50914" size={20} />
                </div>
              </div>

              <div style={{ padding: '12px' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</h4>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <span style={{ fontSize: '10px', backgroundColor: '#e50914', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold' }}>SAVED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backBtn: { 
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '8px 16px', backgroundColor: '#333', color: 'white', 
    border: 'none', borderRadius: '20px', cursor: 'pointer', 
    fontSize: '14px', transition: '0.2s' 
  },
  card: { width: '200px', backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' },
  image: { width: '100%', height: '300px', objectFit: 'cover' },
  heartIcon: {
      position: 'absolute', top: '10px', right: '10px', 
      backgroundColor: 'rgba(0,0,0,0.7)', padding: '8px', 
      borderRadius: '50%', cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 10
  }
};

export default Wishlist;