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
            <Typography variant="h5" gutterBottom sx={{color: "primary.main"}}>
              {item.name}
            </Typography>
            <Carousel>
              {item.book.map((photo, index) => (
                <img
                  key={index}
                  src={photo.url}
                  alt={`Cover Slide ${index}`}
                  style={{ width: "100%", height: "400px" }}
                />
              ))}
            </Carousel>
            <Typography variant="body1" mt={2}>
              <strong>{item.description}</strong>
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Edad:</strong> {item.age} años
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Raza/Parecido:</strong> {item.breed}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Estado:</strong> {item.status}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column",justifyContent: "center", mt: 2 }}>
            <Button
              variant="outlined"
              color={item.vaccinated ? "success" : "primary"}
              size="small"
              sx={{ ml: 1 }}
            >
              <strong>{item.vaccinated ? "Vacunado " : "Sin vacunas "}</strong>
              {' . '}{item.vaccinatedObs}
            </Button>
            <Button
              variant="outlined"
              color={item.castred ? "success" : "primary"}
              size="small"
              sx={{ ml: 1 }}
            >
              <strong>{item.castred ? "Castrado " : "Sin castrar "}</strong>{' . '}
              {item.castredObs}
            </Button>
          </Box>
            <FeelingsSection item={item} />
            <Typography variant="body1" mt={1}>
              <strong>Observaciones:</strong> {item.obs || "-"}
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSavePetId}
              >
                Adoptar
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">Sin información del ítem.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ItemPopup;

const FeelingsSection = ({ item }) => {
  const getFeelingEmoji = (score) => {
    if (score >= 9) return "🥰";
    if (score >= 7) return "☺️";
    if (score >= 5) return "😐";
    if (score >= 3) return "🤨";
    return "😣";
  };
  return (
    <Box>
      {/* Sentimientos con personas */}

      <Typography variant="body2" mt={1}>
        <strong>Con Personas:</strong>{" "}
        {item.feelingsWithPeople !== undefined ? (
          <>{getFeelingEmoji(item.feelingsWithPeople)}</>
        ) : (
          "No disponible"
        )}
        {item.feelingsWithPeopleObs || "No disponible"}
      </Typography>

      {/* Sentimientos con perros */}
      <Typography variant="body2" mt={1}>
        <strong>Con Perros:</strong>{" "}
        {item.feelingsWithDogs !== undefined ? (
          <>{getFeelingEmoji(item.feelingsWithDogs)}</>
        ) : (
          "No disponible"
        )}
        {item.feelingsWithDogsObs || "No disponible"}
      </Typography>

      {/* Sentimientos con gatos */}
      <Typography variant="body2" mt={1}>
        <strong>Con Gatos:</strong>{" "}
        {item.feelingsWithCats !== undefined ? (
          <>{getFeelingEmoji(item.feelingsWithCats)}</>
        ) : (
          "No disponible"
        )}
        {item.feelingsWithCatsObs || "No disponible"}
      </Typography>
    </Box>
  );
};
