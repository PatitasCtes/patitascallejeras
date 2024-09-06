import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "react-material-ui-carousel";
import Loader from "../Loader/Loader";

const ItemPopup = ({ open, onClose, itemId }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (itemId) {
      // Fetch the item details using the itemId
      fetch(
        `https://mandalas-backend.netlify.app/.netlify/functions/server/listings?id=${itemId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setItemDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
          setLoading(false);
        });
    }
  }, [itemId]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {loading ? (
          <Loader />
        ) : itemDetails ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              {itemDetails.name}
            </Typography>
            <Carousel>
              {itemDetails.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Slide ${index}`}
                  style={{ width: "100%", height: "500px" }}
                />
              ))}
            </Carousel>
            <Typography variant="body1" mt={2}>
              <strong>Metros cuadrados:</strong> {itemDetails.dimensions}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>{itemDetails.status}</strong>
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Locador:</strong> {itemDetails.seller} (
              {itemDetails.sellerEmail})
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Contactos:</strong> {itemDetails.sellerPhone1},{" "}
              {itemDetails.sellerPhone2}, {itemDetails.sellerPhone3}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">sin información del terreno.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ItemPopup;
