import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import { Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/courses">
          Courses
        </Button>
        {/* ЗАПОЛНЕНИЕ ПРОСТРАНСТВА С ПОМОЩЬЮ Box и flexGrow: 1 */}
        <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit" component={Link} to="/auth">
          Вход
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
