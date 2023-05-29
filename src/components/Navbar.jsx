import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        darkMode ? "navbar-dark bg-black" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <img
          src="./favicon.ico"
          alt="logo"
          height={40}
          style={{ marginRight: "10px" }}
        />
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
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
        <div
          className="collapse navbar-collapse ms-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <CustomLink path="/">Home</CustomLink>
            </li>
            <li className="nav-item">
              <CustomLink path="/my-notes">My Notes</CustomLink>
            </li>
          </ul>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={() => setDarkMode((prev) => !prev)}
            />
            <label
              className={`form-check-label ${
                darkMode ? "text-light" : "text-dark"
              }`}
              htmlFor="flexSwitchCheckDefault"
            >
              {darkMode ? "Disable" : "Enable"} Dark Mode
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

const CustomLink = ({ path, children }) => {
  const location = useLocation();
  return (
    <Link
      className={`nav-link ${path === location.pathname ? "active" : null}`}
      aria-current="page"
      to={path}
    >
      {children}
    </Link>
  );
};

export default Navbar;
