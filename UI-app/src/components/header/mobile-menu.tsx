import { Button, Collapse, Grid, makeStyles } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";
import "./mobile-menu.css";

import React, { useState } from "react";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <Grid>
          <Button onClick={toggleMenu}>
            <MenuIcon />
          </Button>
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
          <Link className="link" to="home" onClick={toggleMenu}>
            Home
          </Link>
        </Grid>
        <Grid item className="menu-item">
          <Link className="link" to="graphic" onClick={toggleMenu}>
            Graphic
          </Link>
        </Grid>
      </Collapse>
      <Outlet />
    </>
  );
};

export default MobileHeader;
