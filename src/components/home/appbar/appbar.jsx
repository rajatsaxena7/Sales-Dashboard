import React from "react";
import "./appbar.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  Box,
  Grid,
} from "@mui/material";
import Maincontent from "../maincontent/maincontent";

function appbar() {
  return (
    <div>
      <div className="Welcome">
        <Typography variant="h6" gutterBottom>
          Welcome, Admin
        </Typography>
      </div>
      <Maincontent />
    </div>
  );
}

export default appbar;
