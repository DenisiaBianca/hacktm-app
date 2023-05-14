import { Alert, AlertTitle, Button, Collapse, Grid } from "@mui/material";
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

const empty = {
  currentRead: 0,
  monthTotal: 0,
  dailyUsage: [{ day: new Date(), value: 0 }],
};

const UserHome = () => {
  const [gasData, setGasData] = useState<IMeasureDate>(empty);
  const [waterData, setWaterData] = useState<IMeasureDate>(empty);
  const [buttonName, setButtonName] = useState("HOME ALONE");
  const [alertOpen, setAlertOpen] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    handleUserData();
    setHomeButton();
    setInterval(handleUserData, 10000);
  }, []);

  const handleUserData = async () => {
    const data: IUserData = await userData();
    if (data.gasData != null) {
      setGasData(data.gasData);

      if (data.gasData.dailyUsage[23].value > 0) {
        if (cookies.get("homeAlone") === "true") {
          console.log("bigger than 0");
          setAlertOpen(true);
        }
      }
    }
    if (data.waterData != null) setWaterData(data.waterData);
  };

  const setHomeButton = () => {
    const cookies = new Cookies();
    const currentHomeAlone = cookies.get("homeAlone");

    if (currentHomeAlone === null || currentHomeAlone === "") {
      setButtonName("HOME ALONE");
      setAlertOpen(false);
    } else if (currentHomeAlone === "true") {
      setButtonName("HOME IS NOT ALONE");
    } else if (currentHomeAlone === "false") {
      setButtonName("HOME ALONE");
      setAlertOpen(false);
    }
  };

  const handlerHomeAlone = async () => {
    const cookies = new Cookies();
    const currentHomeAlone = cookies.get("homeAlone");

    console.log(`currenHomeAlone: ${currentHomeAlone}`);

    var newValue = false;
    if (currentHomeAlone === null || currentHomeAlone === "") newValue = true;
    else if (currentHomeAlone === "true") newValue = false;
    else if (currentHomeAlone === "false") newValue = true;

    cookies.set("homeAlone", newValue);

    setHomeButton();

    const d: IHomeAlone = {
      homeAlone: cookies.get("homeAlone"),
    };

    await leftHome(d);
  };

  const isMobile = useMobile();
  return (
    <>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          onClose={() => {
            setAlertOpen(false);
          }}
        >
          <AlertTitle>Error</AlertTitle>
          <strong>You have a leak!</strong>
        </Alert>
      </Collapse>
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
        <Button
          style={{ backgroundColor: "rgba(100,149,237, 0.3)", color: "black" }}
          onClick={handlerHomeAlone}
        >
          {buttonName}
        </Button>
      </div>
    </>
  );
};

export default UserHome;
