import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";

const Navigationbar = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    {
      title: "Inicio",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Tableros",
      path: "/boards",
      icon: <DashboardIcon />,
    },
    {
      title: "Equipo",
      path: "/team",
      icon: <GroupIcon />,
    },
    {
      title: "Perfil",
      path: "/profile",
      icon: <AccountCircleIcon />,
    },
  ];
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <a href="/">
            <img src="/logo-arg.png" width={50} alt="Logo"></img>
          </a>
          <Typography variant="h6" pl={3} flexGrow={1}>
            ᓚTask ᓚBan
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component="a"
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ display: { xs: "block", sm: "none" } }}
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
};

export default Navigationbar;
