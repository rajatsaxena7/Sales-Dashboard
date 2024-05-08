import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { loadCollection } from "../../../firebase/firebase.js";

function Piecharts() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadCollection("users");
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const generateChartData = () => {
    const labels = userData.map((user) => user.name);
    const data = userData.map((user) => user.clients);

    return {
      labels: labels,
      datasets: [
        {
          label: "Clients",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };
  };

  return (
    <div>
      <h2>User Clients Pie Chart</h2>
      {userData.length > 0 && (
        <div style={{ height: "400px", width: "400px" }}>
          <Pie key={userData.length} data={generateChartData()} />
        </div>
      )}
    </div>
  );
}

export default Piecharts;
