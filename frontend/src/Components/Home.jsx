import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isAuth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    axios.get('http://localhost:8000', { withCredentials: true })
      .then(res => {
        if (res.data.status === "success") {
          setAuth(true);
          setMessage(`Welcome ${res.data.user?.name || 'User'}!`);
        } else {
          setAuth(false);
          setMessage(res.data.message);
        }
      })
      .catch(err => {
        console.error('Auth check error:', err);
        setMessage("Error connecting to server");
      })
      .finally(() => setLoading(false));
  }, []);

  
  const handleLogout = () => {
    axios.get('http://localhost:8000/logout', {}, { withCredentials: true })
      .then(() => {
        setAuth(false);
        setMessage('Logged out successfully');
      })
      .catch(err => {
        console.error('Logout error:', err);
        setMessage('Error during logout');
      });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>{message}</h3>
      <h1>Welcome to Travel Tales</h1>

      {isAuth ? (
        <div>
          <button 
            className="btn btn-primary"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div style={{ marginTop: '20px' }}>
            <Link to="/dashboard" className="btn btn-success">
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <div style={{ marginTop: '20px' }}>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;