import React from "react";

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Login to Your Account</h2>

          <form>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account?
              <a href="/register" className="ms-1 text-primary text-decoration-none">
                Register
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
