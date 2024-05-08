import React, { useEffect, useState } from "react";
// import { Home } from "react-icons/gi";
import { loadCollection } from "../../firebase/firebase.js";
import CloseIcon from "@mui/icons-material/Close";
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
import "./index.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const Header1 = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [averageAttendanceData, setAverageAttendanceData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file ? file.name : null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await loadCollection("users");
      const formattedRows = usersData.map((user, index) => ({
        ...user,
        number: index + 1,
      }));
      setRows(formattedRows);
      calculateAverageAttendance(usersData);
      setFilteredRows(formattedRows); // Initialize filteredRows the same as rows initially
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter rows based on the search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = rows.filter((row) =>
        row.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows); // If search query is empty, show all rows
    }
  }, [searchQuery, rows]);

  const calculateAverageAttendance = (users) => {
    let totalOnField = 0;
    let totalOffField = 0;
    let count = 0;

    users.forEach((user) => {
      if (user.attendance) {
        user.attendance.forEach((att) => {
          if (att.onField) {
            totalOnField++;
          } else {
            totalOffField++;
          }
          count++;
        });
      }
    });

    const averageOnField = count > 0 ? (totalOnField / count) * 100 : 0;
    const averageOffField = count > 0 ? (totalOffField / count) * 100 : 0;

    setAverageAttendanceData({
      labels: ["On Field", "Off Field"],
      datasets: [
        {
          label: "Average Attendance",
          data: [averageOnField.toFixed(2), averageOffField.toFixed(2)],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    });
  };

  const handleOpenDialog = (attendance) => {
    setAttendanceDetails(attendance);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="home">
      <div className="header">
        <Typography variant="h6" gutterBottom>
          Employee Information
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              marginRight: 2, // Adds spacing between the search bar and the button
            }}
          />
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: "#1976d2",
              borderStyle: "solid",
              "&:hover": {
                backgroundColor: "#7896B4",
              },
            }}
          >
            + New
          </Button>

          <Dialog
            open={modalOpen}
            onClose={handleCloseModal}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Add New Item</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="phone"
                    label="Phone"
                    type="tel"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="department"
                    label="Department"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="position"
                    label="Position"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      width: "100%", // Use full width of the grid column
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#7896B4",
                      },
                    }}
                  >
                    Upload Image
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
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleCloseModal}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
      <div
        style={{
          marginTop: "20px",
          textAlign: "left",
          width: "20vw",
          border: "2px  #ccc",
          padding: "10px",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h1">Average Attendance</Typography>
        {averageAttendanceData.labels && (
          <div style={{ height: "30vh" }} className="Picontainer">
            <Pie
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              data={averageAttendanceData}
            />
          </div>
        )}
      </div>
      <div className="tableContainer">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "13px",
                    color: "#646464",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "13px",
                    color: "#646464",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "13px",
                    color: "#646464",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                  }}
                >
                  No. of Clients
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "13px",
                    color: "#646464",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                  }}
                >
                  Proposals Sent
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "13px",
                    color: "#646464",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                  }}
                  align="center"
                >
                  Attendance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    style={{
                      fontSize: "13px",
                      color: "#646464",

                      fontFamily: "inherit",
                    }}
                  >
                    {row.number}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "13px",
                      color: "#646464",

                      fontFamily: "inherit",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "13px",
                      color: "#646464",

                      fontFamily: "inherit",
                    }}
                  >
                    {row.clients}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "13px",
                      color: "#646464",

                      fontFamily: "inherit",
                    }}
                  >
                    {row.proposals}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "13px",
                      color: "#646464",

                      fontFamily: "inherit",
                    }}
                    align="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(row.attendance)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Attendance Details Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="dialog-title"
        >
          <div>
            <DialogTitle id="dialog-title">Details</DialogTitle>
            <i className="fas fa-info-circle"></i>
          </div>

          <DialogContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>On Field</TableCell>
                    <TableCell>Clock In</TableCell>
                    <TableCell>Clock Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceDetails.map((att, index) => (
                    <TableRow key={index}>
                      <TableCell>{att.onField ? "Yes" : "No"}</TableCell>
                      <TableCell>{att.clockIn}</TableCell>
                      <TableCell>{att.clockOut}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            {/* <Home onClick={handleCloseDialog} color="primary"></Home> */}
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Header1;
