import React from "react";

function Createaccount() {
  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            borderRadius="20"
          />

          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />

          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            variant="outlined"
          />

          <TextField
            margin="dense"
            id="department"
            label="Department"
            type="text"
            fullWidth
            variant="outlined"
          />

          <TextField
            margin="dense"
            id="position"
            label=""
            type="text"
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              width: "100%",
              paddingTop: "10", // Use full width of the grid column
              backgroundColor: "#FDFDFD00",
              color: "#000000", // Black text color
              "&:hover": {
                backgroundColor: "#A3C3E2",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px", // Adjust the gap between icon and text
            }}
          >
            <CloudUploadIcon /> Upload
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileSelect}
            />
          </Button>
          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              File: {selectedFile}
            </Typography>
          )}
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
          }}
        >
          <Button
            onClick={handleCloseModal}
            color="primary"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#5a75f8;",
              color: "#FFFFFF", // Black text color
              "&:hover": {
                backgroundColor: "#A3C3E2",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px", // Adjust the gap between icon and text
            }}
          >
            Create Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Createaccount;
