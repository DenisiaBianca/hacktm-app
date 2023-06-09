import { Button, Collapse, Grid, makeStyles } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./mobile-menu.css";
import Cookies from "universal-cookie";

import React, { useState } from "react";
import { isLogged, parseJwt, getToken } from "../../hooks/hook";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isUserLogged = isLogged;
  const navigate = useNavigate();
  const isAdmin = parseJwt(getToken())?.role == "ADMIN" ? true : false;
  const isUser = parseJwt(getToken())?.role == "USER" ? true : false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.set("userToken", null);
    navigate("/");

    window.location.reload();
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: "10px", backgroundColor: "white" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ paddingRight: "10px" }}
        >
          <Button onClick={toggleMenu}>
            <MenuIcon />
          </Button>
          <Button onClick={handleLogout}>{isLogged() ? "Logout" : ""}</Button>
        </Grid>
      </Grid>
      <Collapse
        in={isMenuOpen}
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "left",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <Grid item className="menu-item">
          <Link className="link" to="login" onClick={toggleMenu}>
            Login
          </Link>
        </Grid>
        <Grid item className="menu-item">
          {isUserLogged() && isUser && (
            <Link className="link" to="home" onClick={toggleMenu}>
              Home
            </Link>
          )}
        </Grid>
        <Grid item className="menu-item">
          {isUserLogged() && isAdmin && (
            <Link className="link" to="all" onClick={toggleMenu}>
              All apartments
            </Link>
          )}
        </Grid>
      </Collapse>
      <Outlet />
    </>
  );
};

export default MobileHeader;
