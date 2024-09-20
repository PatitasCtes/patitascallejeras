// PopupLoader.jsx
import React from "react";
import { Box, Modal } from "@mui/material";
import Loader from "../Loader/Loader";
const PopupLoader = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Loader />
      </Box>
    </Modal>
  );
};

export default PopupLoader;
