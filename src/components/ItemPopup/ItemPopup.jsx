import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ItemPopup = ({ open, onClose, item }) => {
  const { savePetId, savePetName, savePetPhotoUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleSavePetId = () => {
    savePetId(item.id);
    savePetName(item.name);
    savePetPhotoUrl(item.book[0].url);
    navigate("/adoption");
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

        {item ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Carousel>
              {item.book.map((photo, index) => (
                <img
                  key={index}
                  src={photo.url}
                  alt={`Cover Slide ${index}`}
                  style={{ width: "100%", height: "500px" }}
                />
              ))}
            </Carousel>
            <Typography variant="body1" mt={2}>
              <strong>Descripción:</strong> {item.description}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Edad:</strong> {item.age} años
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Raza:</strong> {item.breed}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Estado:</strong> {item.status}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Vacunado:</strong> {item.vaccinated ? "Sí" : "No"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Castrado:</strong> {item.castred ? "Sí" : "No"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Rescate:</strong> {item.rescueDate}
            </Typography>

            {/* Más datos */}
            <Typography variant="body1" mt={2}>
              <strong>Sentimientos con personas:</strong>{" "}
              {item.feelingsWithPeople || "No disponible"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Sentimientos con perros:</strong>{" "}
              {item.feelingsWithDogs || "No disponible"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Sentimientos con gatos:</strong>{" "}
              {item.feelingsWithCats || "No disponible"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Sentimientos con personas (observaciones):</strong>{" "}
              {item.feelingsWithPeopleObs || "No disponible"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Sentimientos con perros (observaciones):</strong>{" "}
              {item.feelingsWithDogsObs || "No disponible"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Sentimientos con gatos (observaciones):</strong>{" "}
              {item.feelingsWithCatsObs || "No disponible"}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Observaciones:</strong> {item.obs || "No disponible"}
            </Typography>

            {/* Más información opcional si está disponible */}
            {item.adopter && (
              <Typography variant="body1" mt={2}>
                <strong>Adoptante:</strong> {item.adopter}
              </Typography>
            )}

            {item.litter && (
              <Typography variant="body1" mt={1}>
                <strong>Cama:</strong> {item.litter}
              </Typography>
            )}

            {item.bookID && (
              <Typography variant="body1" mt={1}>
                <strong>ID del libro:</strong> {item.bookID}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePetId}
              sx={{ mt: 2 }}
            >
              Adoptar
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">Sin información del ítem.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ItemPopup;
