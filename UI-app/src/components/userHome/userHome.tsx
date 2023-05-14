import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMobile } from "../../hooks/hook";

import {
  IHomeAlone,
  IMeasureDate,
  IUserData,
} from "../../interfaces/interfaces";
import { leftHome, userData } from "../../services/api";
import GraphData from "../graph/graph-data";
import Cookies from "universal-cookie";
import { CookieSharp } from "@mui/icons-material";

const empty = {
  currentRead: 0,
  monthTotal: 0,
  dailyUsage: [{ day: new Date(), value: 0 }],
};

const UserHome = () => {
  const [gasData, setGasData] = useState<IMeasureDate>(empty);
  const [waterData, setWaterData] = useState<IMeasureDate>(empty);
  const [buttonName, setButtonName] = useState("HOME ALONE");

  useEffect(() => {
    handleUserData();
    setInterval(handleUserData, 2000);
  }, []);

  const handleUserData = async () => {
    const data: IUserData = await userData();
    if (data.gasData != null) setGasData(data.gasData);
    if (data.waterData != null) setWaterData(data.waterData);
  };

  const handlerHomeAlone = async () => {
    const cookies = new Cookies();
    const currentHomeAlone = cookies.get("homeAlone");

    console.log(`currenHomeAlone: ${currentHomeAlone}`);

    var newValue = false;
    if (currentHomeAlone == null) newValue = true;
    else if (currentHomeAlone === "true") newValue = false;
    else if (currentHomeAlone === "false") newValue = true;

    console.log(`newHomeAlone: ${newValue}`);

    cookies.set("homeAlone", newValue);

    const d: IHomeAlone = {
      homeAlone: cookies.get("homeAlone"),
    };

    await leftHome(d);

    if (!newValue) setButtonName("HOME ALONE");
    else setButtonName("HOME IS NOT ALONE");
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
      <Button onClick={handlerHomeAlone}>{buttonName}</Button>
    </div>
  );
};

export default UserHome;
