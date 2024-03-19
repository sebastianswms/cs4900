import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const sectionColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

const sectionBorderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(255, 159, 64, 1)",
];

export default function AllianceStackBar({ title, teams, values, legend }) {
  const numSections = Math.min(values[0].length, legend.length);
  const datasets = [];
  for (let i = 0; i < numSections; i++) {
    datasets.push({
      label: legend[i],
      data: values.map((item) => item[i]),
      backgroundColor: sectionColors[i % sectionColors.length],
      borderColor: sectionBorderColors[i % sectionBorderColors.length],
      borderWidth: 1,
    });
  }

  const data = {
    labels: teams,
    datasets: datasets,
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
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };
  return <Bar options={options} data={data} />;
}
