import React from 'react';

// Ab Navbar props le raha hai taaki button control kar sake
const Navbar = ({ user, handleLogout, setShowLogin, showLogin, setShowWishlist }) => {
  return (
    <nav style={styles.nav}>
      {/* Logo par click karne se Home par aa jayenge */}
      <h1 
        style={styles.logo} 
        onClick={() => {setShowLogin(false); setShowWishlist(false);}}
      >
        🍿 MoodFlix
      </h1>

      <div>
        {user ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
             {/* User Name (Mobile pe chupa sakte hain agar jagah kam ho) */}
             <span style={{color: 'white', fontWeight: 'bold', fontSize: '14px'}}>👤 {user.name}</span> 
             
             {/* My List Button */}
             <button 
                onClick={() => setShowWishlist(true)}
                style={styles.wishlistBtn}
             >
                My List ❤️ ({user.favorites.length})
             </button>

             <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(!showLogin)} style={styles.loginBtn}>
             {showLogin ? '🏠 Home' : '🔑 Login'}
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between', // Logo Left, Buttons Right
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#141414',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: {
    color: '#e50914',
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  loginBtn: { padding: '8px 20px', backgroundColor: '#e50914', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
  logoutBtn: { padding: '6px 12px', backgroundColor: '#333', color: '#ddd', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' },
  wishlistBtn: { background: 'transparent', border: '1px solid #e50914', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }
};

export default Navbar;