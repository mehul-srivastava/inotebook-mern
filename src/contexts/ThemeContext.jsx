import { createContext, useState } from "react";

const ThemeContext = createContext();
export default ThemeContext;

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  document.body.style.backgroundColor = darkMode ? "#1c1b19" : "#fff";
  document.body.style.color = darkMode ? "#fff" : "#000";
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
