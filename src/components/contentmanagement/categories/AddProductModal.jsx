import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

function AddProductModal({ open, handleClose }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Typography variant="h6" component="h2">
          Add Product Item
        </Typography>
        <TextField label="Product Name" fullWidth margin="normal" />
        <TextField label="Price" fullWidth margin="normal" />
        <Button variant="contained" color="primary" onClick={handleClose}>
          Add Item
        </Button>
      </Box>
    </Modal>
  );
}

export default AddProductModal;
