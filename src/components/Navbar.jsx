import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { Guest, Authenticated } from "./guards";
import AuthContext from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "bg-body-tertiary"
      }`}
    >
      <div className="container-fluid">
        <img src="/favicon.ico" alt="favicon" className="favicon" />
        <CustomLink className="navbar-brand ms-2" to="/">
          iNotebook
        </CustomLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Authenticated>
              <li className="nav-item">
                <CustomLink to="/">Home</CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink to="/profile">Profile</CustomLink>
              </li>
            </Authenticated>
            <li className="nav-item">
              <CustomLink to="/blog">Guest Blog</CustomLink>
            </li>
          </ul>

          <div className="form-check form-switch dark-mode-btn">
            <input
              className="form-check-input dark-mode-input"
              type="checkbox"
              role="switch"
              onClick={() => setDarkMode((prev) => !prev)}
            />
            <label
              className={`form-check-label dark-mode-label ${
                darkMode && "text-white"
              }`}
            >
              {darkMode ? "Disable" : "Enable"} Dark Mode
            </label>
          </div>
          <Authenticated>
            <button
              className="ms-3 btn btn-outline-danger btn-sm me-2"
              onClick={logout}
            >
              Logout
            </button>
          </Authenticated>
          <Guest>
            <Link to="/auth/login">
              <button className="btn btn-outline-primary btn-sm me-2">
                Login
              </button>
            </Link>

            <Link to="/auth/signup">
              <button className="btn btn-primary btn-sm">Signup</button>
            </Link>
          </Guest>
        </div>
      </div>
    </nav>
  );
};

const CustomLink = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={`nav-link ${className} ${({ isActive }) =>
        isActive ? "active" : null}`}
    >
      {children}
    </NavLink>
  );
};

export default Navbar;
