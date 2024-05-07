import React from "react";
import { useTheme } from "../../../contexts/theme/themeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
// import CircleAvatar from "./CircleAvatar"; // Import your CircleAvatar component
import "../headerhompage/appbar.css"; // Import component-specific styles

const AppBar = ({ title }) => {
  const { isDarkTheme } = useTheme();
  const themeClass = isDarkTheme ? "dark" : "light";

  return (
    <div className={`app-bar ${themeClass}`}>
      <div className="notification-icon">
        {/* Notification bell icon */}
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  );
};

export default AppBar;
