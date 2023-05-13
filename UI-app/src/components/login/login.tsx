import { Box, Button, Grid, Input, Paper, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import background from "../../images/wall2.jpeg";
import { IUserLogin } from "../../interfaces/interfaces";
import { login } from "../../services/api";
import Cookies from "universal-cookie";
import { parseJwt, useMobile, getToken } from "../../hooks/hook";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const user: IUserLogin = { username: username, password: password };

    const { token } = await login(user);

    const cookies = new Cookies();
    cookies.set("userToken", token);

    const isAdmin = parseJwt(getToken())?.role == "ADMIN" ? true : false;
    const isUser = parseJwt(getToken())?.role == "USER" ? true : false;

    if (isAdmin) navigate("/all");
    if (isUser) navigate("/home");
  };

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
              onChange={(u) => setUsername(u.target.value)}
            ></TextField>
          </Grid>
          <Grid item md={3} xs={12}>
            <TextField
              size="small"
              sx={{ width: "80%" }}
              placeholder="Password"
              type="password"
              onChange={(p) => setPassword(p.target.value)}
            ></TextField>
          </Grid>
          <Grid item md={3} xs={12}>
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={handleLogin}
            >
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
              onChange={(u) => setUsername(u.target.value)}
            ></TextField>
          </Grid>
          <Grid item md={12}>
            <TextField
              size="small"
              sx={{ width: "480px", marginTop: "16px" }}
              placeholder="Password"
              type="password"
              onChange={(p) => setPassword(p.target.value)}
            ></TextField>
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              sx={{ width: "300px", marginTop: "16px" }}
              onClick={handleLogin}
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
