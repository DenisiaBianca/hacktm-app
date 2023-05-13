import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMobile } from "../../hooks/hook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminHome = () => {
  const isMobile = useMobile();
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        display: false,
      },
      title: {
        display: true,
        text: "Alee Horizont nr.5",
      },
    },
  };

  const labels = [
    "Ap1",
    "Ap2",
    "Ap3",
    "Ap4",
    "Ap5",
    "Ap6",
    "Ap7",
    "Ap8",
    "Ap9",
    "Ap10",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Gas",
        data: [100, 300, 400, 200, 150, 100, 50, 60, 30],
        borderColor: "rgba(220,20,60,0.5)",
        backgroundColor: "rgba(220,20,60,0.5)",
      },
      {
        label: "Water",
        data: [130, 200, 440, 230, 170],
        borderColor: "rgba(44, 130, 201, 0.5)",
        backgroundColor: "rgba(44, 130, 201, 0.5)",
      },
    ],
  };

  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {isMobile ? (
        <Bar options={options} data={data} height="100vh" />
      ) : (
        <Bar options={options} data={data} height={1000} width={1000} />
      )}
    </div>
  );
};

export default AdminHome;
