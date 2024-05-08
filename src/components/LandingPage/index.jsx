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
} from "@mui/material";
import "./index.css";

const Header1 = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await loadCollection("users");
      const formattedRows = usersData.map((user, index) => ({
        ...user,
        number: index + 1,
      }));
      setRows(formattedRows);
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
            sx={{
              backgroundColor: "#1976d2",
              borderStyle: "solid",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#98BFE6",
              },
            }}
          >
            + New
          </Button>
        </Box>
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
          <DialogTitle id="dialog-title">Attendance Details</DialogTitle>
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
