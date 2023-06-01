import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";

export const Authenticated = ({ children }) => {
  const { userToken } = useContext(AuthContext);

  if (userToken) return children;
  return null;
};

export const Guest = ({ children }) => {
  const { userToken } = useContext(AuthContext);

  if (!userToken) return children;
  return null;
};

export const ProtectedRoute = ({ children }) => {
  const { userToken } = useContext(AuthContext);
  const navigate = useNavigate();

  if (userToken) return children;

  useEffect(() => {
    if (!userToken) navigate("/auth/login");
  }, []);
};
