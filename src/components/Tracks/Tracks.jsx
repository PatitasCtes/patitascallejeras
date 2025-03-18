import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./gatin.json"; 

import { Box } from "@mui/material";
import { useEffect } from "react";

const Tracks = () => {
  useEffect(() => {
    // Desplazarse al fondo de la página
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Opcional: para un desplazamiento suave
    });
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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

export default Tracks;
