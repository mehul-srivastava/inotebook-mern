import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const localUserToken = localStorage.getItem("Auth-Token") || null;
  const [userToken, setUserToken] = useState(localUserToken);
  const [user, setUser] = useState({
    name: "fetching...",
    email: "fetching...",
    addedAt: "fetching...",
  });

  const BASE_URI = import.meta.env.VITE_SERVER_API_BASE_URL;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("Auth-Token");
    setUserToken(null);
    return navigate("/auth/login");
  };

  const fetchUser = async () => {
    const response = await fetch(`${BASE_URI}/api/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": userToken,
      },
    });
    const data = await response.json();

    if (!data.success) return;

    const fetchedUser = data.user;
    setUser({
      name: fetchedUser.name,
      email: fetchedUser.email,
      addedAt: fetchedUser.date,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
    return;
  };

  return (
    <AuthContext.Provider
      value={{ userToken, user, fetchUser, setUser, setUserToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
