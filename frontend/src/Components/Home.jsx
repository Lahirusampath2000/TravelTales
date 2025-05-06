import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isAuth, setAuth] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/')
      .then(res => {
        if (res.data.status === "success") {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        setMessage("An error occurred");
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>{message}</h3>
      <h1>Welcome to Travel Tales</h1>

      <Link to="/login">
        <button className="btn btn-primary">Login</button>
      </Link>
    </div>
  );
};

export default Home;
