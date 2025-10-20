import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/cryptocomtext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PorfolioChart = () => {
  const { assets } = useCrypto();
  const data = {
    labels: assets.map((asset) => asset.id),
    datasets: [
      {
        label: "# of Votes",
        data: assets.map((asset) => asset.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        justifyContent: "center",
        height: "600px",
      }}
    >
      <Pie data={data} />
    </div>
  );
};

export default PorfolioChart;
