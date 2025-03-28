import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
  IconButton,
  Chip,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemPopup from "../ItemPopup/ItemPopup";
import { deletePetById } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import fallbackImage from "../../assets/imgLogo.png";
import PetSizeSelector from "../PetSizeSelector/PetSizeSelector";

const ItemDetail = ({ item }) => {
  const {
    id,
    petUID,
    name,
    description,
    castred,
    breed,
    book,
    animal,
    gender,
    size,
  } = item;
  const isLoggedIn = localStorage.getItem("uid");
  const coverPhoto = book.find((photo) => photo.isCoverPhoto)?.url || "";

  const [popupOpen, setPopupOpen] = useState(false);
  const [savedItemIds, setSavedItemIds] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const storedItemIds =
      JSON.parse(localStorage.getItem("savedItemIds")) || [];
    setSavedItemIds(storedItemIds);
  }, []);

  let displayText = "";

  if (gender === "Varios") {
    const animalPlural = animal === "Dog" ? "perritos" : "gatitos";
    displayText = `Somos ${animalPlural}. ${
      castred ? "Castrados" : "Sin castrar"
    }.`;
  } else {
    const animalSingular =
      animal === "Dog"
        ? gender === "Macho"
          ? "Perro"
          : "Perra"
        : gender === "Macho"
        ? "Gato"
        : "Gata";
    displayText = `Soy ${
      gender === "Macho" ? "un" : "una"
    } ${animalSingular}. ${
      castred ? (gender === "Macho" ? "Castrado" : "Castrada") : "Sin castrar"
    }.`;
  }

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };


  const handleSave = () => {
    const actualSavedItemsIds =
      JSON.parse(localStorage.getItem("savedItemIds")) || [];
    const updatedSavedItemIds = actualSavedItemsIds.includes(petUID)
      ? actualSavedItemsIds.filter((itemId) => itemId !== petUID)
      : [...actualSavedItemsIds, petUID];

    localStorage.setItem("savedItemIds", JSON.stringify(updatedSavedItemIds));
    setSavedItemIds(updatedSavedItemIds);
  };

  const navigate = useNavigate();
  const { savePetId } = useContext(AppContext);

  const handleEdit = () => {
    if (!isLoggedIn) return;
    savePetId(item.id);
    navigate(`/edit-pet`);
  };

  const handleDelete = async () => {
    if (!isLoggedIn) return;
    try {
      await deletePetById(id);
      console.log("Eliminado correctamente:", id);
      window.location.reload();
    } catch (error) {
      console.error("Error eliminando mascota:", error);
    }
  };

  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => ({ ...prev, [imageId]: true }));
  };

  const openConfirmDialog = () => setConfirmDialogOpen(true);
  const closeConfirmDialog = () => setConfirmDialogOpen(false);

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: "auto" }}>
        <CardMedia
          component="img"
          image={loadedImages[petUID] ? (coverPhoto || fallbackImage) : fallbackImage}
          height="200"
          alt="Item cover"
          onClick={handleOpenPopup}
          onLoad={() => handleImageLoad(petUID)}
          onError={() =>
            setLoadedImages((prev) => ({ ...prev, [petUID]: false }))
          }
        />

        <CardContent>
          <Typography
            sx={{ fontSize: 24, marginRight: 1 }}
            color="text.primary"
            gutterBottom
            align="center"
          >
            {name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Chip
              label={breed}
              color="primary"
              sx={{ marginBottom: 1, fontSize: 12 }}
            />

            <PetSizeSelector animal={animal.toLowerCase()} weight={size} />
          </Box>
          <Typography
            ml={1}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {displayText}
          </Typography>
          <Typography
            ml={1}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Descripción: {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-evenly" }}>
          <Button
            variant="outlined"
            startIcon={
              savedItemIds.includes(petUID) ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderIcon />
              )
            }
            onClick={handleSave}
          ></Button>
          <Button
            variant="contained"
            endIcon={<CottageIcon />}
            onClick={handleOpenPopup}
          ></Button>

          {isLoggedIn && (
            <>
              <IconButton color="primary" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={openConfirmDialog}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
      <ItemPopup open={popupOpen} onClose={handleClosePopup} item={item} />
      {/* Dialogo de confirmación */}
      <Dialog open={confirmDialogOpen} onClose={closeConfirmDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta mascota? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemDetail;
