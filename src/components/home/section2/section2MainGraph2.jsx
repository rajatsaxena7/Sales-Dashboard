import React, { useEffect, useState } from "react";
import "./section2MainGraph2.css";
import { Line } from "react-chartjs-2";
import { collection, getDocs, query, db } from "../../../firebase/firebase.js";

function Graph1() {
  const [proposalData, setProposalData] = useState([]);

  useEffect(() => {
    fetchProposalData();
  }, []);

  const fetchProposalData = async () => {
    try {
      const q = query(collection(db, "clientDetails"));
      const querySnapshot = await getDocs(q);

      const proposals = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.Proposallist) {
          data.Proposallist.forEach((proposal) => {
            const proposalDate = proposal.created_time.toDate();
            if (isInCurrentWeek(proposalDate)) {
              proposals.push({
                date: proposalDate,
                amount: proposal.Total_price,
              });
            }
          });
        }
      });
      proposals.sort((a, b) => a.date.getDay() - b.date.getDay());
      setProposalData(proposals);
    } catch (error) {
      console.error("Error fetching proposal data:", error);
    }
  };

  const isInCurrentWeek = (date) => {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const lastDayOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (6 - today.getDay())
    );
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  };

  const getDayOfWeekLabel = (day) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[day];
  };

  const totalAmount = proposalData.reduce(
    (total, proposal) => total + proposal.amount,
    0
  );

  const graphData = {
    labels: proposalData.map((proposal) =>
      getDayOfWeekLabel(proposal.date.getDay())
    ),
    datasets: [
      {
        label: "Proposal Amount",
        data: proposalData.map((proposal) => proposal.amount),
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        fill: false,
      },
    ],
    x,
  };

  return (
    <div className="mainBox">
      <div className="GraphContainer">
        <div className="header">
          <h2>Daily Analysis</h2>
          <div className="TotalAmount">
            <h3>Total Amount: {totalAmount}</h3>
          </div>
        </div>
        <div className="GraphWrapper">
          <Line data={graphData} />
        </div>
      </div>
    </div>
  );
}

export default Graph1;
