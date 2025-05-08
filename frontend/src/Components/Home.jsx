import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Home = () => {
    const[latestPosts,setLatestPosts] = React.useState([]);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       //fetch posts data
       axios.get('http://localhost:8000/get-posts', { withCredentials: true })
        .then (res => {
            if (res.data.status === 'success') {
                const latestPosts = res.data.posts.slice(0, 3); 
                setLatestPosts(latestPosts);
            } else {
                console.error("Error fetching posts:", res.data.error);
            }
        })
        .catch(err => {
            console.error("Error fetching posts:", err);
        });  

        axios.get("https://restcountries.com/v3.1/all?fields=name,capital,currencies,languages,flags")
        .then(res => setCountries(res.data))
        .catch(err => console.error("Error fetching countries:", err));
        
      }, []);

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