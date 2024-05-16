import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

function AddFeatureModal({ open, handleClose }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Typography variant="h6" component="h2">
          Add Feature Item
        </Typography>
        <TextField label="Feature Name" fullWidth margin="normal" />
        <TextField label="Details" fullWidth margin="normal" />
        <Button variant="contained" color="primary" onClick={handleClose}>
          Add Item
        </Button>
      </Box>
    </Modal>
  );
}

export default AddFeatureModal;
