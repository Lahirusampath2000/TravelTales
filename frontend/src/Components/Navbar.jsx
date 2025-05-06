import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";  // Added ShoppingCart import
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-light bg-light py-2"  
      style={{ 
        minHeight: '90px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <img
            src="/images/LOGO-INSTRUMEDENT-3_300x300.avif"
            alt="Logo"
            style={{ 
              height: "70px", 
              width: "112px", 
              objectFit: "contain",
              marginLeft: '1rem' 
            }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 fs-6">
            <li className="nav-item mx-3"><Link className="nav-link active" to="/">Home</Link></li>
           
            <li className="nav-item mx-3"><Link className="nav-link" to="/guide-menu">Dashboard</Link></li>
            
            <li className="nav-item mx-3"><Link className="nav-link" to="#">BLOG</Link></li>
            
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto gap-3">
          <div className="d-flex align-items-center">
            {!showSearch ? (
              <button 
                onClick={toggleSearch} 
                className="btn btn-link text-dark p-1" 
                style={{ textDecoration: "none" }}
              >
                <Search size={24} />
              </button>
            ) : (
              <div className="position-relative" ref={searchRef}>
                <input
                  className="form-control fs-6 pe-5"
                  type="search"
                  placeholder="Search"
                  autoFocus
                  style={{ width: "200px" }}
                />
                <Search
                  size={18}
                  className="position-absolute end-0 top-50 translate-middle-y me-2 text-muted"
                  onClick={toggleSearch}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </div>

          {/* Shopping Cart Icon */}
          <button 
            className="btn btn-link text-dark p-1"
            style={{ textDecoration: "none" }}
          >
            <ShoppingCart size={24} />
          </button>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <button 
                className="btn btn-outline-dark fs-6 px-3 py-1 rounded-1 d-flex align-items-center gap-2"
                onClick={logout}
              >
                <i className="bi bi-power" style={{ fontSize: '0.9rem' }}></i>
                Logout
              </button>
            ) : (
              <div className="d-flex gap-2">
                <Link
                  to="/register"
                  className="btn btn-outline-dark fs-6 px-3 py-1 d-flex align-items-center gap-2 rounded-1"
                  style={{ minWidth: "100px" }}
                >
                  <i className="bi bi-person-plus" style={{ fontSize: '0.9rem' }}></i>
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn btn-primary fs-6 px-3 py-1 d-flex align-items-center gap-2 rounded-1"
                  style={{ minWidth: "90px" }}
                >
                  <i 
                    className="bi bi-key" 
                    style={{ 
                      transform: "rotate(145deg)",
                      fontSize: '0.9rem' 
                    }}
                  ></i>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;