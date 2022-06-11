import React from "react";
import { Bar } from "react-chartjs-2";

const rand = () => Math.floor(Math.random() * 255);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Total Leave Requests",
      data: Array.from({ length: 12 }, (v, i) => rand()),
      backgroundColor: "rgba(173,11,99,0.5)",
      borderColor: "#AD0B63",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const screen = window.matchMedia("(max-width: 768px)");

const Charts = () => (
  <>
    <Bar
      data={data}
      options={options}
      width={100}
      height={screen.matches ? 80 : 35}
    />
  </>
);

export default Charts;
