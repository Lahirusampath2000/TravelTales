import React from 'react';

const Home = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Welcome to Travel Tales</h1>
        <p>Your next adventure begins here!</p>
      </div>
      
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0'
      }}>
        <hr style={{
          flexGrow: 1,
          border: 'none',
          borderTop: '1px solid grey',
          margin: 0
        }} />
        <span style={{
          padding: '0 10px',
          color: '#666',
          fontSize: '1.2em'
        }}>
          Latest posts
        </span>
        <hr style={{
          flexGrow: 1,
          border: 'none',
          borderTop: '1px solid grey',
          margin: 0
        }} />
      </div>
    </div>
  );
};

export default Home;