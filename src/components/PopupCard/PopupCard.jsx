import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopupCard = ({
  open,
  onClose,
  itemId,
  mode, // 'create', 'edit', or 'delete'
  onCreate,
  onEdit,
  onDelete,
  children, // Additional content
}) => {
  const [itemDetails, setItemDetails] = useState({
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (itemId && mode === "edit") {
      // Fetch the item details using the itemId if editing
      fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${itemId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setItemDetails({ name: data.name, description: data.description });
          setIsEditing(true);
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
        });
    } else if (mode === "create") {
      // Clear form for creation
      setItemDetails({ name: "", description: "" });
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [itemId, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (mode === "create") {
      onCreate(itemDetails);
    } else if (mode === "edit") {
      onEdit(itemId, itemDetails);
    }
    onClose();
  };

  const handleDelete = () => {
    onDelete(itemId);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setIsEditing(false);
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

        <Typography variant="h6" gutterBottom>
          {mode === "create" ? "Crear uno Nuevo!" : "Editar"}
        </Typography>

        <Box>
          <TextField
            label="Título"
            name="name"
            value={itemDetails.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
          />

          <TextField
            label="Descripción"
            name="description"
            value={itemDetails.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            disabled={!isEditing}
          />

          {children && <Box mt={2}>{children}</Box>}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            {mode === "edit" && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ mr: 2 }}
              >
                Eliminar
              </Button>
            )}

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {mode === "create" ? "Crear" : "Guardar"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PopupCard;
