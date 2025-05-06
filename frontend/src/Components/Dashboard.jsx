import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const blogPosts = [
  
];

const currentUserId = 1; 

const Dashboard = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Welcome to the blog</h1>
      <div className="row">
        {blogPosts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <div className="card h-100">
              <div className="card-body">
                
              </div>
              {currentUserId === post.user_id && (
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
