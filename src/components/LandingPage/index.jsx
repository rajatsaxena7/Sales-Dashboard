import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContexts";
import { doSignOut } from "../../firebase/auth";

const Header1 = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return <div>sidebar</div>;
};

export default Header1;
