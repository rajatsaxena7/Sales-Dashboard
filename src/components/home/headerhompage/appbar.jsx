import React from "react";
import { useTheme } from "../../../contexts/theme/themeContext";
import "../headerhompage/appbar.css"; // Import component-specific styles

const AppBar = ({ title }) => {
  const { isDarkTheme } = useTheme();
  const themeClass = isDarkTheme ? "dark" : "light";

  return (
    <div className={`app-bar ${themeClass}`}>
      <div className="Container">Welcome</div>
      {/* Add additional app bar content or buttons here */}
    </div>
  );
};

export default AppBar;
