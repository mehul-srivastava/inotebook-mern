import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const localUserToken = localStorage.getItem("Auth-Token") || null;
  const [userToken, setUserToken] = useState(localUserToken);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("Auth-Token");
    setUserToken(null);
    return navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
