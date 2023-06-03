import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import ThemeContext from "../contexts/ThemeContext";

import ErrorMessages from "./ErrorMessages";
import Input from "./Input";

const Signup = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState([]);

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const { userToken, setUserToken } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const BASE_URI = import.meta.env.VITE_SERVER_API_BASE_URL;

  useEffect(() => {
    if (userToken) navigate("/");
  }, []);

  const setupUser = (authToken) => {
    localStorage.setItem("Auth-Token", authToken);
    localStorage.removeItem("user");
    setUserToken(authToken);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;

    const response = await fetch(`${BASE_URI}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      setErrorMessage(data.errors);
      return;
    }

    setupUser(data.authToken);
    return navigate("/");
  };
  return (
    <div className="container d-flex mt-5 justify-content-center">
      <div className={`card ${darkMode && "bg-black text-white"}`}>
        <div className="card-body login-body">
          <h2 className="card-title">Signup For An Account</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <Input
              label="Name"
              name="name"
              autoComplete="username"
              ref={usernameRef}
            />
            <Input
              label="Email Address"
              name="email"
              helperText="We'll never share your email with anyone else."
              autoComplete="username"
              ref={emailRef}
            />
            <Input
              label="Password"
              name="password"
              helperText="Please use a suitable password to secure your account."
              autoComplete="current-password"
              ref={passwordRef}
            />
            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
            <ErrorMessages errorMessage={errorMessage} />
            <span className="login-signup-interchange">
              <Link to="/auth/login">Already have an account?</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
