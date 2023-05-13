import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { color } from "@mui/system";
import { IRecordData } from "../../interfaces/interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface IProps {
  data: IRecordData[];
  title: String;
  color: String;
}

const hours = [
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
  "12AM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
  "12PM",
];

const Graphic: React.FC<IProps> = (props) => {
  const today = new Date().toLocaleTimeString("ro-RO", { hour: "2-digit" });
  const todayDate = new Date().toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const options = {
    responsive: false,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: `${props.title} - ${todayDate}`,
      },
    },
    labels: false,
    scales: {
      //   x: {
      //     display: true,
      //     title: {
      //       display: true,
      //       text: "Day",
      //     },
      //   },
      //   y: {
      //     display: true,
      //     title: {
      //       display: true,
      //       text: "Value",
      //     },
      //   },
    },
  };

  const labels = hours; //props.data.map((d) => 1); //`${d.day.getDate}/${d.day.getMonth}`);

  const data = {
    labels,
    datasets: [
      {
        label: props.title.toString(),
        data: props.data.slice(Number(0), 24).map((d) => d.value),
        borderColor: props.color.toString(),
        backgroundColor: props.color.toString(),
        fill: true,
      },
    ],
  };
  return (
    <div
      style={{
        width: "90%",
        minHeight: "200px",
        padding: "5px",
      }}
    >
      <Line
        options={options}
        data={data}
        style={{
          minWidth: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default Graphic;
