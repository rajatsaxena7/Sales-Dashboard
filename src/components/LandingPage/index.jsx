import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { Home } from "react-icons/gi";
import { loadCollection, auth, createUser } from "../../firebase/firebase.js";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars-2";

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be a valid phone number")
    .min(10, "Too short")
    .max(15, "Too long")
    .required("Phone number is required"),
  department: Yup.string().required("Department is required"),
  position: Yup.string().required("Position is required"),
});
const handleCreateAccount = async (values, selectedFile) => {
  const { name, email, phone } = values;

  setModalOpen(false);
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  department: "",
  position: "",
};

const Header1 = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [averageAttendanceData, setAverageAttendanceData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    handleCreateAccount(
      {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,

        password: document.getElementById("password").value,
      },
      selectedFile
    );
    setModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const file = selectedFile; // Ensure you have this from the file input
    try {
      await createUser(email, password, name, phone, file); // createUser function call
      toast.success("User created successfully!"); // Display success toast
      setModalOpen(false); // Close modal upon successful submission
      // Reset form state
      setEmail("");
      setPassword("");
      setName("");
      setPhone("");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to create user: " + error.message); // Display error toast
      // Keep the modal open and the data intact so the user can try again
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
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
              backgroundColor: "#5a75f8;",
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
            onClose={() => setModalOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <form onSubmit={handleSubmit}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="phone"
                  label="Phone"
                  type="tel"
                  fullWidth
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: "100%", marginTop: 2 }}
                >
                  Upload Photo
                  <CloudUploadIcon />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(event) => setSelectedFile(event.target.files[0])}
                  />
                </Button>
                {selectedFile && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    File: {selectedFile.name}
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    width: "100%",

                    backgroundColor: "#5a75f8",
                    "&:hover": { backgroundColor: "#A3C3E2" },
                  }}
                >
                  Create Account
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
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
          <div style={{ height: "25vh" }} className="Picontainer">
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
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "40vh" }}
          className="custom-scrollbar"
        >
          <Table stickyHeader aria-label="sticky table">
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
                      backgroundColor="#5a75f8;"
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
