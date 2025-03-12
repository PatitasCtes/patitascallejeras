import React from "react";
import { Box } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./gatin.json";

const ImageLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        backgroundColor: "#e5e5e5",
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
      />
    </Box>
  );
};

export default ImageLoader;
