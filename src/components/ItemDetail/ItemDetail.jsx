import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
} from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark"; // Icono relleno
import ItemPopup from "../ItemPopup/ItemPopup";

const ItemDetail = ({ item }) => {
  // Desestructuramos las propiedades relevantes de 'item'
  const {
    petUID,
    name,
    description,
    castred,
    breed,
    book,
    animal,
    feelingsWithPeople,
    feelingsWithDogs,
    feelingsWithCats,
  } = item;

  // Encontrar la foto de portada usando 'isCoverPhoto'
  const coverPhoto = book.find((photo) => photo.isCoverPhoto)?.url || "";

  const [popupOpen, setPopupOpen] = useState(false);
  const [savedItemIds, setSavedItemIds] = useState([]);

  useEffect(() => {
    // Cargar ítems guardados desde localStorage
    const storedItemIds =
      JSON.parse(localStorage.getItem("savedItemIds")) || [];
    setSavedItemIds(storedItemIds);
  }, []);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleSave = () => {
    // Leer siempre el estado más actualizado de localStorage
    const actualSavedItemsIds =
      JSON.parse(localStorage.getItem("savedItemIds")) || [];

    // Actualizar los ítems guardados en función de si el ID actual está en la lista o no
    const updatedSavedItemIds = actualSavedItemsIds.includes(petUID)
      ? actualSavedItemsIds.filter((itemId) => itemId !== petUID)
      : [...actualSavedItemsIds, petUID];

    // Guardar los cambios en localStorage y actualizar el estado
    localStorage.setItem("savedItemIds", JSON.stringify(updatedSavedItemIds));
    setSavedItemIds(updatedSavedItemIds);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: "auto" }}>
        <CardMedia
          component={"img"}
          image={coverPhoto}
          height="200"
          alt="Item cover"
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 24 }}
            color="text.primary"
            gutterBottom
            align="center"
          >
            {name}
          </Typography>
          <Typography
            ml={1}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Soy un {animal} de raza {breed}.{" "}
            {castred ? "Castrado" : "Sin castrar"}.
          </Typography>
          <Typography
            ml={1}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Descripción: {description}
          </Typography>
          <Typography
            ml={1}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Relación con personas: {feelingsWithPeople}/10 perros:{" "}
            {feelingsWithDogs}/10 gatos: {feelingsWithCats}/10.
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
          >
            {savedItemIds.includes(petUID) ? "GUARDADO" : "GUARDAR"}
          </Button>
          <Button
            variant="contained"
            endIcon={<CottageIcon />}
            onClick={handleOpenPopup}
          >
            DARLE HOGAR
          </Button>
        </CardActions>
      </Card>
      <ItemPopup open={popupOpen} onClose={handleClosePopup} item={item} />
    </>
  );
};

export default ItemDetail;
