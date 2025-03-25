import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from "@mui/material/styles";

import Tracks from "../Tracks/Tracks";

const Footer = () => {
  const theme = useTheme();
  const [showLottie, setShowLottie] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Toolbar sx={{ justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
          <Typography variant="h6" pl={3}>
            Corrientes, Argentina
          <IconButton color="inherit" size="large" onClick={handleClick}>
            <PetsIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.instagram.com/patitascallejera/?hl=es"
            target="_blank"
            rel="noopener"
            size="large"
          >
            <InstagramIcon />
          </IconButton>
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.75rem",
              color: theme.palette.primary.contrastText,
              position: isMobile ? "static" : "absolute",
              right: isMobile ? "auto" : 16,
              mt: isMobile ? 1 : 0,
            }}
          >
            <a
              href="https://ematijasevic.com.ar"
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              by ematijasevic🦦
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;

