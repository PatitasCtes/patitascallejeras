import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

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
    points: 0,
    startDate: null,
    endDate: null,
    status: "Activa",
    tutor: "",
    involvedUsers: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (itemId && mode === "edit") {
      fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${itemId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setItemDetails({
            name: data.name,
            description: data.description,
            points: data.points || 0,
            startDate: data.startDate ? dayjs(data.startDate) : null,
            endDate: data.endDate ? dayjs(data.endDate) : null,
            status: data.status || "Activa",
            tutor: data.tutor || "",
            involvedUsers: data.involvedUsers || [],
          });
          setIsEditing(true);
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
        });
    } else if (mode === "create") {
      setItemDetails({
        name: "",
        description: "",
        points: 0,
        startDate: null,
        endDate: null,
        status: "Activa",
        tutor: "",
        involvedUsers: [],
      });
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [itemId, mode]);

  useEffect(() => {
    fetch(
      "https://taskban-user.netlify.app/.netlify/functions/server/users?teamId=123456"
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

            <TextField
              label="Puntos"
              name="points"
              type="number"
              value={itemDetails.points}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              disabled={!isEditing}
            />

            <DatePicker
              label="Fecha de Inicio"
              value={itemDetails.startDate}
              onChange={(newValue) => {
                setItemDetails((prevDetails) => ({
                  ...prevDetails,
                  startDate: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
              disabled={!isEditing}
            />

            <DatePicker
              label="Fecha de Fin"
              value={itemDetails.endDate}
              onChange={(newValue) => {
                setItemDetails((prevDetails) => ({
                  ...prevDetails,
                  endDate: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
              disabled={!isEditing}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={itemDetails.status}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <MenuItem value="Activa">Activa</MenuItem>
                <MenuItem value="En espera">En espera</MenuItem>
                <MenuItem value="Inactiva">Inactiva</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Tutor</InputLabel>
              <Select
                name="tutor"
                value={itemDetails.tutor}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Usuarios Involucrados</InputLabel>
              <Select
                name="involvedUsers"
                value={itemDetails.involvedUsers}
                onChange={(e) => {
                  const { value } = e.target;
                  setItemDetails((prevDetails) => ({
                    ...prevDetails,
                    involvedUsers:
                      typeof value === "string" ? value.split(",") : value,
                  }));
                }}
                multiple
                disabled={!isEditing}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {mode === "create" ? "Crear" : "Guardar"}
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PopupCard;
