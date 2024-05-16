import React, { useState } from "react";
import "./categories2.css";
import Portfolio from "./portfolio/portfolio.jsx";
import Products from "../products/products.jsx";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import AddPortfolioModal from "./AddFeatureModal.jsx";
import AddProductModal from "./AddPortfolioModal.jsx";
import AddFeatureModal from "./AddProductModal.jsx";

function Categories2() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPortfolioModal, setOpenPortfolioModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openFeatureModal, setOpenFeatureModal] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenPortfolioModal = () => {
    setOpenPortfolioModal(true);
    handleCloseMenu();
  };

  const handleClosePortfolioModal = () => {
    setOpenPortfolioModal(false);
  };

  const handleOpenProductModal = () => {
    setOpenProductModal(true);
    handleCloseMenu();
  };

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
  };

  const handleOpenFeatureModal = () => {
    setOpenFeatureModal(true);
    handleCloseMenu();
  };

  const handleCloseFeatureModal = () => {
    setOpenFeatureModal(false);
  };

  return (
    <div className="Category-Container2">
      <div className="Category-Header">
        <h2>Manage Portfolios</h2>
        <Button
          variant="contained"
          color="primary"
          className="manage-button"
          onClick={handleClick}
        >
          Add Items+
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            style: {
              borderRadius: 10,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "10px 0",
            },
          }}
        >
          <MenuItem onClick={handleOpenPortfolioModal}>
            <ListItemIcon>
              <AddCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Portfolio</Typography>
          </MenuItem>
          <MenuItem onClick={handleOpenProductModal}>
            <ListItemIcon>
              <InventoryIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Products</Typography>
          </MenuItem>
          <MenuItem onClick={handleOpenFeatureModal}>
            <ListItemIcon>
              <FeaturedPlayListIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Features</Typography>
          </MenuItem>
        </Menu>
      </div>
      <Portfolio />
      <div>
        <h2>Manage Products</h2>
      </div>
      <Products />
      <AddPortfolioModal
        open={openPortfolioModal}
        handleClose={handleClosePortfolioModal}
      />
      <AddProductModal
        open={openProductModal}
        handleClose={handleCloseProductModal}
      />
      <AddFeatureModal
        open={openFeatureModal}
        handleClose={handleCloseFeatureModal}
      />
    </div>
  );
}

export default Categories2;
