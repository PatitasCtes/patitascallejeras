import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from "@mui/material/styles";

import Tracks from "../Tracks/Tracks";

const Footer = () => {
  const theme = useTheme();
  const [showLottie, setShowLottie] = useState(false);

  const handleClick = () => {
    setShowLottie(true);
    setTimeout(() => {
      setShowLottie(false);
    }, 3000);
  };

  return (
    <>
      {showLottie && <Tracks />}
      <AppBar
        position="static"
        sx={{
          top: "auto",
          bottom: 0,
          mt: 1,
          bgcolor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <IconButton
            color="inherit"
            href="https://www.instagram.com/patitascallejera/?hl=es"
            target="_blank"
            rel="noopener"
            size="large"
          >
            <InstagramIcon />
          </IconButton>

          <Typography variant="h6" pl={3}>
            Corrientes,Argentina
          </Typography>
          <IconButton color="inherit" size="large" onClick={handleClick}>
            <PetsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
