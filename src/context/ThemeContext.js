import React, { createContext, useState } from "react";

const ThemeContext = createContext();
export default ThemeContext;

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  document.body.style.backgroundColor = darkMode ? "#191a1c" : "white";
  document.body.style.color = darkMode ? "white" : "black";

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
