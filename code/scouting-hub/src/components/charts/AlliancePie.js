import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export const data = {
  labels: ["4779", "2054", "5675"],
  datasets: [
    {
      // label: "OPR",
      data: [31.6, 33.5, 34.9],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 20,
        font: {
          size: 20,
        },
      },
    },
    title: {
      display: true,
      text: "Red Alliance",
      font: {
        size: 30,
      },
    },
    datalabels: {
      formatter: function (value) {
        return `${value} %`;
      },
      font: {
        size: 30,
      },
    },
    tooltip: {
      enabled: false,
    },
  },
};

export default function AlliancePie({ title, teams, values }) {
  const data = {
    labels: teams,
    datasets: [
      {
        // label: "OPR",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          font: {
            size: 20,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 30,
        },
      },
      datalabels: {
        formatter: function (value) {
          return `${value} %`;
        },
        font: {
          size: 30,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  return <Pie options={options} data={data} />;
}
