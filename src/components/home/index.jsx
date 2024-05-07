import React from "react";
import { useAuth } from "../../contexts/authContexts";
import { useTheme } from "../../contexts/theme/themeContext";
import AppBar from "../home/headerhompage/appbar.jsx"; // Import the AppBar component

import "./index.css"; // Import component-specific styles

const Home = () => {
  const { isDarkTheme } = useTheme();
  const { currentUser } = useAuth();

  return (
    <div className={`home ${isDarkTheme ? "dark" : "light"}`}>
      <AppBar title="Welcome to My App" />
      <div className="content"></div>
    </div>
  );
};

export default Home;
