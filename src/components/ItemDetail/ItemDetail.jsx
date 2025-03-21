import React, { useState, useEffect, useContext } from "react";
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
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemPopup from "../ItemPopup/ItemPopup";
import { deletePetById } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import fallbackImage from "../../assets/imgLogo.png";

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
    feelingsWithPeople,
    feelingsWithDogs,
    feelingsWithCats,
  } = item;

  const coverPhoto = book.find((photo) => photo.isCoverPhoto)?.url || "";

  const [popupOpen, setPopupOpen] = useState(false);
  const [savedItemIds, setSavedItemIds] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});

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

  const navigate = useNavigate();
  const { savePetId } = useContext(AppContext);

  const handleEdit = () => {
    savePetId(item.id);
    navigate(`/edit-pet`);
  };

  const handleDelete = async () => {
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

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: "auto" }}>
        <CardMedia
          component="img"
          image={loadedImages[petUID] ? coverPhoto : fallbackImage}
          height="200"
          alt="Item cover"
          onLoad={() => {
            handleImageLoad(petUID);
          }}
          onError={() => {
            setLoadedImages((prev) => ({ ...prev, [petUID]: false }));
          }}
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
          ></Button>
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
