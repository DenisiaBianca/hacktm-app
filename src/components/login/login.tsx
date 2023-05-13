import { Box, Button, Grid, Input, Paper, TextField } from "@mui/material";
import React, { useRef } from "react";
import useMobile from "../../hooks/hook";
import background from "../../images/wall2.jpeg";

const Login = () => {
  const isMobile = useMobile();
  console.log(isMobile);

  return (
    <div>
      {isMobile ? (
        <Grid
          container
          sx={{ color: "black", marginTop: "150px" }}
          spacing={2}
          minHeight="100%"
        >
          <Grid item md={3} xs={12}>
            <div style={{ fontSize: "24px", marginBottom: "50px" }}>
              Welcome <br /> Glad to see you
            </div>
          </Grid>
          <Grid item md={3} xs={12}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              placeholder="Username"
            ></TextField>
          </Grid>
          <Grid item md={3} xs={12}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              placeholder="Password"
              type="password"
            ></TextField>
          </Grid>
          <Grid item md={3} xs={12}>
            <Button variant="contained" sx={{ width: "50%" }}>
              Login
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          sx={{ color: "black", marginTop: "150px" }}
          minHeight="100%"
          width="100%"
          alignItems="center"
          columns={1}
        >
          <Grid item md={24}>
            <div
              style={{
                fontSize: "24px",
                marginBottom: "50px",
                marginTop: "16px",
              }}
            >
              Welcome <br /> Glad to see you
            </div>
          </Grid>
          <Grid item md={24}>
            <TextField
              size="small"
              sx={{ width: "480px" }}
              placeholder="Username"
            ></TextField>
          </Grid>
          <Grid item md={12}>
            <TextField
              size="small"
              sx={{ width: "480px", marginTop: "16px" }}
              placeholder="Password"
              type="password"
            ></TextField>
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              sx={{ width: "300px", marginTop: "16px" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Login;
