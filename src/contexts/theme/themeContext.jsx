import React, { createContext, useState, useContext } from "react";

// Create a context for managing themes
const ThemeContext = createContext();

// Custom hook to consume the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Theme Provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Provide theme state and toggle function to the context
  const themeData = {
    isDarkTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};
