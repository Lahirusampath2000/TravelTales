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
      const getCountryInfo = (countryName) => {
        return countries.find(country => 
          country.name.common.toLowerCase() === countryName.toLowerCase() ||
          country.name.official.toLowerCase() === countryName.toLowerCase()
        );
      };

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
    
          {/* Latest Posts Section */}
          <div className="container my-5">
            <div className="row">
              {latestPosts.map((post) => {
                const countryInfo = getCountryInfo(post.country_name);
                return (
                  <div className="col-md-4 mb-4" key={post.id}>
                    <div className="card h-100 shadow">
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <p><strong>Country:</strong> {post.country_name}</p>
                        {countryInfo && (
                          <div className="country-info">
                            <img 
                              src={countryInfo.flags.png} 
                              alt={`${post.country_name} Flag`} 
                              className="mb-2"
                              style={{ width: '80px', border: '1px solid #ddd' }}
                            />
                            <p className="mb-1">
                              <strong>Capital:</strong> {countryInfo.capital?.[0] || 'N/A'}
                            </p>
                          </div>
                        )}
                        <p><strong>Date of Visit:</strong> {new Date(post.date_of_visit).toLocaleDateString()}</p>
                      </div>
                      <div className="card-footer bg-white">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/posts/${post.id}`)} // Add navigation if needed
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };
export default Home;