import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(https://wallpaperaccess.com/full/4224720.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
  },
  loginBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 0 20px #66fcf1',
    width: '100%',
    maxWidth: '400px',
    color: '#fff',
    textAlign: 'center',
  },
  h2: {
    color: '#66fcf1',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '93%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #666',
    backgroundColor: '#555',
    color: '#fff',
    fontSize: '16px',
    marginTop: '5px',
  },
  button: {
    width: '40%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#66fcf1',
    color: '#000',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 0 10px rgba(102, 252, 241, 0.8)',
  },
  buttonHover: {
    backgroundColor: '#45a29e',
    boxShadow: '0 0 15px rgba(102, 252, 241, 0.9)',
  },
};

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      console.log('Response:', data);
  
      if (response.ok) {
        navigate('/poppins', { state: { name, profilePhoto: data.user.profilePhoto || '' } });
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Server error. Please try again later.');
    }
  };
  
  

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.h2}>Welcome!</h2>
        <p>Sign in to continue.</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={styles.input}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.target.style.boxShadow = styles.buttonHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.button.backgroundColor;
              e.target.style.boxShadow = styles.button.boxShadow;
            }}
          >
            Log In
          </button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Don&apos;t have an account? <a href="/signup" style={{ color: '#66fcf1' }}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;