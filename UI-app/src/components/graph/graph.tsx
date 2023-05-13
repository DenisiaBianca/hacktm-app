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

const Graphic: React.FC<IProps> = (props) => {
  const options = {
    //responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: `${props.title} luna Martie`,
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
  const labels = props.data.map(
    (d) => `${d.day.getDate()}/${d.day.getMonth()}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: props.title.toString(),
        data: props.data.map((d) => d.value),
        borderColor: props.color.toString(),
        backgroundColor: props.color.toString(),
        fill: true,
      },
    ],
  };
  return (
    <Line
      height={50}
      width={100}
      options={options}
      data={data}
      style={{ paddingLeft: "15px" }}
    />
  );
};

export default Graphic;
