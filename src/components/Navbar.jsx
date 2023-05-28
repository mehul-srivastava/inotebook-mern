import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
              <CustomLink path="/about">About</CustomLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
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
