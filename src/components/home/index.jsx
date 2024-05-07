import React from "react";
import { useAuth } from "../../contexts/authContexts";
import Sidebar from "./sidebar";
import "./index";
import { useTheme } from "..//../contexts/theme/themeContext.jsx";

const Home = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const themeClass = isDarkTheme ? "dark" : "light";
  const { currentUser } = useAuth();
  return <div className="home ">cool</div>;
};

export default Home;
