import { Grid } from "@mui/material";
import React from "react";
import { useMobile } from "../../hooks/hook";
import { IMeasureDate } from "../../interfaces/interfaces";
import Graphic from "./graph";

interface IProps {
  data: IMeasureDate;
  type: String;
  color: String;
}
const GraphData: React.FC<IProps> = (props) => {
  const isMobile = useMobile();

  return (
    <div className="one-graph">
      <Grid
        className="first-grid"
        container
        direction="column"
        style={{
          marginTop: "50px",
          width: "100%",
        }}
      >
        <Grid
          className="second-grid"
          item
          alignItems="center"
          display="flex"
          justifyContent="space-evenly"
          style={{ marginBottom: "20px", fontSize: "12px" }}
        >
          <Grid item>
            Current read: <b>{props.data.currentRead.toString()}</b>
          </Grid>
          <Grid item>
            Total per month: <b>{props.data.monthTotal.toString()}</b>
          </Grid>
        </Grid>
        <Grid
          className="3rd-grid"
          item
          alignItems="center"
          display="flex"
          justifyContent="center"
          style={{ width: isMobile ? "100vw" : "40vw" }}
        >
          <Graphic
            title={props.type}
            data={props.data.dailyUsage}
            color={props.color}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default GraphData;
