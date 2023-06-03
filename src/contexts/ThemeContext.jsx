import { createContext, useState } from "react";

const ThemeContext = createContext();
export default ThemeContext;

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  document.body.style.backgroundColor = darkMode ? "#1c1b19" : "#fff";
  document.body.style.color = darkMode ? "#fff" : "#000";

  const toggleBackgroundTheme = (color) => {
    switch (color) {
      case "red":
        document.body.style.backgroundColor = "#380402";
        return;

      case "green":
        document.body.style.backgroundColor = "#192b16";
        return;

      case "blue":
        document.body.style.backgroundColor = "#01202e";
        return;

      case "purple":
        document.body.style.backgroundColor = "#2c022e";
        return;

      default:
        break;
    }
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleBackgroundTheme, setDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
