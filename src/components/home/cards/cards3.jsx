import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  db,
  orderBy,
  limit,
} from "../../../firebase/firebase.js";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@mui/material";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
import "./cards3.css";

ChartJS.register(Title, Tooltip, Legend);

function Cards3() {
  const [topPerformers, setTopPerformers] = useState([]);

  useEffect(() => {
    fetchTopPerformers();
  }, []);

  const fetchTopPerformers = async () => {
    try {
      const q = query(
        collection(db, "users"),
        orderBy("proposalsends", "desc"),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      const performers = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setTopPerformers(performers);
    } catch (error) {
      console.error("Error fetching top performers:", error);
    }
  };

  return (
    <div className="Container1">
      <div className="Title">Best Performer This Month💫</div>
      <div className="TableContainer">
        <Table>
          <TableBody>
            {topPerformers.map((performer) => (
              <TableRow key={performer.id}>
                <TableCell className="TableCell">
                  <div className="AvatarWrapper">
                    <Avatar
                      alt={performer.display_name}
                      src={performer.photo_url}
                    />
                    <span className="DisplayName">
                      {performer.display_name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{performer.proposalsends}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Cards3;
