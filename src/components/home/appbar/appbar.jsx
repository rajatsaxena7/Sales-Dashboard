import React, { useState } from "react";
import Header1 from "../../LandingPage/index.jsx";
import Home from "../../../components/home/index";
import Login from "../../../components/auth/login/index.jsx";
import Register from "../../../components/auth/register/index.jsx";
import "./appbar.css";
import { Typography, Button, Menu, MenuItem } from "@mui/material";
import Maincontent from "../maincontent/maincontent";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    navigate(`/${page}`);
    handleClose();
  };

  return (
    <div>
      <div className="Welcome">
        <Typography variant="h6" gutterBottom>
          Welcome, Admin
        </Typography>
        <Button className="button-68" onClick={handleClick}>
          New
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className="dropdown-container"
        >
          <MenuItem
            className="dropdown-item"
            onClick={() => handleMenuItemClick("header")}
          >
            User Details
          </MenuItem>
          <MenuItem
            className="dropdown-item"
            onClick={() => handleMenuItemClick("page2")}
          >
            Page 2
          </MenuItem>
          <MenuItem
            className="dropdown-item"
            onClick={() => handleMenuItemClick("page3")}
          >
            Page 3
          </MenuItem>
        </Menu>
      </div>
      <Maincontent />
    </div>
  );
}

export default Appbar;
