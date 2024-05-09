import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ReactDatePicker from "react-datepicker";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { collection, getDocs, db } from "../../../firebase/firebase.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "react-datepicker/dist/react-datepicker.css";
import "./cards2.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Cards2() {
  const [totalPortfolios, setTotalPortfolios] = useState(0);

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        // Fetch total documents from 'portfolio' collection
        const portfolioRef = collection(db, "portfolio");
        const portfolioSnapshot = await getDocs(portfolioRef);
        const portfolioCount = portfolioSnapshot.size;
        setTotalPortfolios(portfolioCount);

        // Fetch total documents from 'features' collection
        const featuresRef = collection(db, "features");
        const featuresSnapshot = await getDocs(featuresRef);
        const featuresCount = featuresSnapshot.size;
        setTotalFeatures(featuresCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTotalData(); // Fetch total portfolios and features on component mount
  }, []);
  return (
    <div className="Container2">
      <div className="GridContainer">
        {/* Container 1 */}
        <div className="GridItem">
          <div className="ContainerContent">Total Portfolios</div>
          <div className="ContainerContent1">{totalPortfolios}</div>
        </div>

        {/* Container 2 */}
        <div className="GridItem">
          <div className="ContainerContent">Total features</div>
        </div>

        {/* Container 3 */}
        <div className="GridItem">
          <div className="ContainerContent">Total SalesPerson</div>
        </div>

        {/* Container 4 */}
        <div className="GridItem">
          <div className="ContainerContent">Total proposals</div>
        </div>
      </div>
    </div>
  );
}

export default Cards2;
