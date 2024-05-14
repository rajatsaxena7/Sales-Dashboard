import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListSubheader,
  Divider,
  IconButton,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  db,
  onSnapshot,
} from "../../../firebase/firebase.js";
import "./appbar.css";
import Maincontent from "../maincontent/maincontent";

function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]); // State for notifications
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "clientDetails"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const newNotifications = snapshot.docChanges().map((change) => {
          if (change.type === "added") {
            const { display_name } = change.doc.data();
            return {
              id: change.doc.id,
              name: display_name,
              timestamp: change.doc.data().timestamp,
            };
          }
          return null;
        });
        setNotifications((prevNotifications) => [
          ...newNotifications,
          ...prevNotifications,
        ]);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    navigate(`/${page}`);
    handleClose();
  };

  const handleNotificationClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <div className="Welcome">
        <Typography variant="h6" gutterBottom>
          Welcome, Admin
        </Typography>
        <div>
          <IconButton
            onClick={handleNotificationClick}
            className="Notification-icon"
          >
            <NotificationsNoneIcon />
          </IconButton>
          <Button className="button-68" onClick={handleMenuClick}>
            New
          </Button>
        </div>
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
        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={handleClose}
          className="custom-menu"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <ListSubheader component="div">
            <Typography variant="h6">Notifications</Typography>
            <Button color="primary">Mark all as read</Button>
          </ListSubheader>
          {notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText
                primary={`${notification.name} added`}
                secondary={notification.timestamp.toDate().toLocaleString()}
              />
            </MenuItem>
          ))}
          <Divider />
          <MenuItem className="view-all">
            <ListItemText primary="View All" />
          </MenuItem>
        </Menu>
      </div>
      <Maincontent />
    </div>
  );
}

export default Appbar;
