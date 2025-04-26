import React, { use } from "react";
import { useState } from "react";

 function Register() {

    const[values,setValues]=useState({
        username:"",
        email:"",
        password:""
    })

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Create an Account</h2>

          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="johndoe123"
                onChange={(e)=>setValues({...values,username:e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="john@example.com"
                onChange={(e)=>setValues({...values,email:e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                onChange={(e)=>setValues({...values,password:e.target.value})}
                required
              />
              <div className="form-text">Must be at least 8 characters</div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?
              <a href="/login" className="ms-1 text-primary text-decoration-none">
                Sign in
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;