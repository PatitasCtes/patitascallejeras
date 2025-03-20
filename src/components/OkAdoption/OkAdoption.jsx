import React from "react";
import { Box } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./OkAdoption.json";

const OkAdoption = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        
        "& .lottie-player": {
          width: "50%",
          "@media (max-width: 600px)": {
            width: "100%",
          },
        },
      }}
    >
      <Player autoplay loop src={animationData} className="lottie-player" />
    </Box>
  );
};

export default OkAdoption;
