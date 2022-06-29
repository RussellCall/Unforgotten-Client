import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500]
  },
  customHeight: {
    minHeight: 200
  },
  offset: theme.mixins.toolbar
}));

export const NavBar = () => {
  const classes = useStyles();
  const [example] = useState("customColor");
  const isCustomColor = example === "customColor";
  const isCustomHeight = example === "customHeight";
  const history = useHistory()

  return (
    <><AppBar
        color="customColor"
        className={`${isCustomColor && classes.customColor} ${
          isCustomHeight && classes.customHeight
        }`}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            <div>Unforgotten Nashville</div>
          </Typography>
          <IconButton>
            <Link className="navbar__link_home" to="/">Home</Link>
          </IconButton>
          {localStorage.getItem("auth_token") !== null ?
          
          <IconButton color="inherit" onClick={() => {
            localStorage.removeItem("auth_token");
            history.push({ pathname: "/" });
          } }>
            Logout
          </IconButton>
          
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>}
        </Toolbar>
      
      
      </AppBar></>
  )
}