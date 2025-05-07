import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch the current user data
    axios.get('http://localhost:8000/dashboard', { withCredentials: true })
      .then(res => {
        if (res.data.status === 'success') {
          setCurrentUser(res.data.user.id);
        } else {
          console.error("Error fetching user data:", res.data.error);
        }
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
      });


    axios.get('http://localhost:8000/get-posts', { withCredentials: true })
      .then(res => {
        if (res.data.status === 'success') {
          setPosts(res.data.posts);
        }
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Welcome to the blog</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p>{post.content}</p>
                <p><strong>Country:</strong> {post.country_name}</p>
                <p><strong>Date of Visit:</strong> {new Date(post.date_of_visit).toLocaleDateString()}</p>
              </div>
              {currentUser === post.user_id && (
                <div className="card-footer bg-white">
                  <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled"><span className="page-link">Previous</span></li>
          <li className="page-item active"><span className="page-link">1</span></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
