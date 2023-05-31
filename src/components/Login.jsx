import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState([]);
  const { userToken, setUserToken } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) return navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const BASE_URI = import.meta.env.VITE_SERVER_API_BASE_URL;

    const response = await fetch(`${BASE_URI}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      setErrorMessage(data.errors);
    } else {
      // localStorage.setItem("Auth-Token", data.authToken);
      setUserToken(data.authToken);
    }
  };
  return (
    <div className="container d-flex mt-5 justify-content-center">
      <div className="card">
        <div className="card-body login-body">
          <h2 className="card-title">Login To Your Account</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" ref={emailRef} />
              <div className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mt-4 mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                ref={passwordRef}
              />
              <div className="form-text">
                Please use a suitable password to secure your account.
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div className="mt-3">
              {errorMessage !== []
                ? errorMessage.map((item, index) => (
                    <span key={index} className="d-block mt-1 text-danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="error-icon"
                      >
                        <title>alert-circle-outline</title>
                        <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                      </svg>{" "}
                      {item.msg}
                    </span>
                  ))
                : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
