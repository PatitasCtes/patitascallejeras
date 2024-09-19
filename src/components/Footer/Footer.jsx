import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";
import Tracks from "../Tracks/Tracks";
import Ok from "../Ok/Ok";

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
      {showLottie && <Ok />}
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
            href="https://github.com/Matijasevic-Emer/taskban"
            target="_blank"
            rel="noopener"
            size="large"
          >
            <GitHubIcon />
          </IconButton>

          <Typography variant="h6" pl={3}>
            Made with ❤️‍🔥 by Equipo5
          </Typography>
          <IconButton color="inherit" size="large" onClick={handleClick}>
            <EmojiObjectsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
