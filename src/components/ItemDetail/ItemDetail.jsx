import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  CardContent,
  IconButton,
} from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark"; // Icono relleno
import EditIcon from "@mui/icons-material/Edit"; // Icono de lápiz
import DeleteIcon from "@mui/icons-material/Delete"; // Icono de basurero
import ItemPopup from "../ItemPopup/ItemPopup";
import { deletePetById } from "../../api/api";

const ItemDetail = ({ item }) => {
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

  const coverPhoto = book.find((photo) => photo.isCoverPhoto)?.url || "";

  const [popupOpen, setPopupOpen] = useState(false);
  const [savedItemIds, setSavedItemIds] = useState([]);

  useEffect(() => {
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
    const actualSavedItemsIds =
      JSON.parse(localStorage.getItem("savedItemIds")) || [];
    const updatedSavedItemIds = actualSavedItemsIds.includes(petUID)
      ? actualSavedItemsIds.filter((itemId) => itemId !== petUID)
      : [...actualSavedItemsIds, petUID];

    localStorage.setItem("savedItemIds", JSON.stringify(updatedSavedItemIds));
    setSavedItemIds(updatedSavedItemIds);
  };

  const handleEdit = () => {
    console.log("Editar:", petUID);
  };

  const handleDelete = async () => {
    try {
      await deletePetById(petUID);
      console.log("Eliminado correctamente:", petUID);
      // Aquí puedes agregar lógica adicional como recargar la lista de mascotas
    } catch (error) {
      console.error("Error eliminando mascota:", error);
    }
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
          ></Button>
          <IconButton color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <ItemPopup open={popupOpen} onClose={handleClosePopup} item={item} />
    </>
  );
};

export default ItemDetail;
