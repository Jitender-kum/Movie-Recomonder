import React, { useState } from 'react';
import { loginUser, registerUser } from '../api';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let data;
      if (isLogin) {
        data = await loginUser({ email, password });
      } else {
        data = await registerUser({ name, email, password });
      }
      
      // Agar success hua to parent ko batao
      alert(`Welcome ${data.name}!`);
      onLoginSuccess(data);

    } catch (err) {
      setError(err); // Error dikhao (e.g., Wrong password)
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{color: '#e50914'}}>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input 
              type="text" placeholder="Name" value={name} 
              onChange={(e) => setName(e.target.value)} style={styles.input} required 
            />
          )}
          <input 
            type="email" placeholder="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} style={styles.input} required 
          />
          <input 
            type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} style={styles.input} required 
          />
          <button type="submit" style={styles.btn}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p style={{marginTop: '15px', color: '#aaa'}}>
          {isLogin ? "New to MoodFlix? " : "Already have an account? "}
          <span 
            style={{color: '#fff', cursor: 'pointer', fontWeight: 'bold'}} 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
  card: { backgroundColor: '#222', padding: '30px', borderRadius: '10px', width: '300px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', borderRadius: '5px', border: 'none', fontSize: '16px' },
  btn: { padding: '10px', backgroundColor: '#e50914', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

export default Auth;