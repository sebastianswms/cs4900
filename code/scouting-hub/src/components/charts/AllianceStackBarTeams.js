import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function AllianceStackBarTeams({ title, teams, values, legend }) {
  const data = {
    labels: legend,
    datasets: [
      {
        data: values.map(item => item[0]),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        data: values.map(item => item[1]),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        data: values.map(item => item[2]),
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
        display: false
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        display: true,
        color: 'black',
        formatter: function(value, context) {
          const i = context.dataIndex;
          const j = context.datasetIndex;
          return teams[i][j];
        }
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };
  
  

  return <Bar options={options} data={data} />;
}