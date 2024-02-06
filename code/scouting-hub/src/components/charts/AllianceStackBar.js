import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AllianceStackBar({ title, teams, values, legend }) {
    const data = {
      labels: teams,
      datasets: [
        {
            label: legend[0],
          data: [values[0][0], values[1][0], values[2][0], values[3][0], values[4][0]],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
            label: legend[1],
          data: [values[0][1], values[1][1], values[2][1], values[3][1], values[4][1]],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
            label: legend[2],
          data: [values[0][2], values[1][2], values[2][2], values[3][2], values[4][2]],
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          font: {
            size: 15,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
      datalabels: {
        formatter: function (value) {
          return `${value} %`;
        },
        font: {
          size: 10,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
    },
  };
  return <Bar options={options} data={data} />;
}
    
