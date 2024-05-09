import React, { useEffect, useState } from "react";
import { collection, getDocs, db } from "../../../firebase/firebase.js";
import { Bar } from "react-chartjs-2";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./cards.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Cards3() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rawData, setRawData] = useState({});

  const fetchData = async () => {
    const q = collection(db, "clientDetails");
    const querySnapshot = await getDocs(q);
    const data = {};

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const date = docData.created_time.toDate();
      const month = date.toLocaleString("default", { month: "long" });
      const week = `Week ${getISOWeekNumber(date)}`;
      const monthWeekKey = `${month} - ${week}`;

      if (data[monthWeekKey]) {
        data[monthWeekKey] += 1;
      } else {
        data[monthWeekKey] = 1;
      }
    });

    setRawData(data);
    setMonths([
      ...new Set(Object.keys(data).map((key) => key.split(" - ")[0])),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    updateChartData(rawData);
  }, [selectedDate, rawData]);

  const updateChartData = (data) => {
    const selectedMonth = selectedDate.toLocaleString("default", {
      month: "long",
    });
    const filteredData = Object.keys(data).filter((key) =>
      key.startsWith(selectedMonth)
    );
    const chartData = {
      labels: filteredData,
      datasets: [
        {
          label: "Number of Clients Added",
          data: filteredData.map((key) => data[key]),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
      ],
    };
    setChartData(chartData);
  };

  return (
    <div className="Container1">
      <div className="Title">
        Client Added Statistics
        <IconButton onClick={() => setShowDatePicker(!showDatePicker)}>
          <FilterListIcon />
        </IconButton>
      </div>
      <div style={{ position: "relative" }}>
        {showDatePicker && (
          <div style={{ position: "absolute", zIndex: 1000 }}>
            <ReactDatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowDatePicker(false);
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              inline={false}
            />
          </div>
        )}
      </div>
      <Bar data={chartData} />
    </div>
  );
}

function getISOWeekNumber(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

export default Cards3;
