import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editPost, setEditPost] = useState({ id: '', title: '', content: '', country_name: '', date_of_visit: '' });


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

  const handleEditClick = (post) => {
    setEditPost({ id: post.id, title: post.title, content: post.content, country_name: post.country_name, date_of_visit: new Date(post.date_of_visit).toLocaleDateString()});
  };

  const handleChange = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };

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
                  <button className="btn btn-sm btn-outline-primary me-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditClick(post)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Modal for Edit Post */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={editPost.title} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea className="form-control" rows="4" name="content" value={editPost.content} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" name="title" value={editPost.country_name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of visit</label>
                <input className="form-control" rows="4" name="content" value={editPost.date_of_visit} onChange={handleChange}></input>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
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
