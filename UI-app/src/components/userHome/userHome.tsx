import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMobile } from "../../hooks/hook";

import { IMeasureDate, IUserData } from "../../interfaces/interfaces";
import { userData } from "../../services/api";
import GraphData from "../graph/graph-data";

const empty = {
  currentRead: 0,
  monthTotal: 0,
  dailyUsage: [{ day: new Date(), value: 0 }],
};

const UserHome = () => {
  const [gasData, setGasData] = useState<IMeasureDate>(empty);
  const [waterData, setWaterData] = useState<IMeasureDate>(empty);

  useEffect(() => {
    setInterval(handleUserData, 5000);
  }, []);

  const handleUserData = async () => {
    const data: IUserData = await userData();
    if (data.gasData != null) setGasData(data.gasData);
    if (data.waterData != null) setWaterData(data.waterData);

    console.log(gasData);
  };

  const isMobile = useMobile();
  return (
    <div
      className="graphics"
      style={{
        display: "flex",
        justifyContent: isMobile ? "center" : "space-evenly",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <GraphData data={gasData} type={"Gas"} color={"rgba(220,20,60,0.5)"} />
      <GraphData
        data={waterData}
        type={"Water"}
        color={"rgba(44, 130, 201, 0.5)"}
      />
      <Button onClick={handleUserData}>Get data</Button>
    </div>
  );
};

export default UserHome;
