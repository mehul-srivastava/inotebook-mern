import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const localUserToken = localStorage.getItem("Auth-Token") || null;
  const [userToken, setUserToken] = useState(localUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) return navigate("/auth/login");
  }, [userToken]);
  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
