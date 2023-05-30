import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { darkMode } = useContext(ThemeContext);

  const handleSubmit = () => {};

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <div className="card" style={{ width: "550px", maxWidth: "550px" }}>
        <div className="card-body">
          <h1 className="mb-3">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className={`form-control ${
                  darkMode ? "bg-black text-white border border-dark" : null
                }`}
                placeholder="Enter your email"
                name="email"
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className={`form-control ${
                  darkMode ? "bg-black text-white border border-dark" : null
                }`}
                placeholder="Enter your password"
                name="current-password"
              />
            </div>
            <button type="submit" className="btn w-100 btn-primary">
              Login
            </button>
            <span className="text-right" style={{ textAlign: "right" }}>
              <Link to="/auth/signup">New? Click here to signup</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
