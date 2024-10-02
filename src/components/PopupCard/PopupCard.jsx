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
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
  const teamId = localStorage.getItem("teamId");
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
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(""); // Estado para manejar errores

  useEffect(() => {
    // Cargar usuarios del teamId
    fetch(
      `https://taskban-user.netlify.app/.netlify/functions/server/users?teamId=${teamId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [teamId]);

  useEffect(() => {
    if (itemId && mode === "edit") {
      fetch(
        `https://taskban-task.netlify.app/.netlify/functions/server/tasks/${itemId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setItemDetails({
            name: data.name,
            description: data.description,
            points: data.points || 0,
            startDate: data.estimatedStartDate
              ? dayjs(data.estimatedStartDate)
              : null,
            endDate: data.estimatedFinishDate
              ? dayjs(data.estimatedFinishDate)
              : null,
            status: data.status || "Activa",
            tutor: data.tutorUser || "",
            involvedUsers: data.userInvolve || [],
          });
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
    }
  }, [itemId, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePointsChange = (change) => {
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      points: Math.max(0, prevDetails.points + change),
    }));
  };

  const handleSubmit = () => {
    // Validación de campos obligatorios
    if (
      !itemDetails.name ||
      !itemDetails.description ||
      !itemDetails.tutor ||
      itemDetails.points <= 0
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    setError(""); // Resetear el error

    const tutorUser = users.find((user) => user.id === itemDetails.tutor);
    itemDetails.userAssigned = tutorUser ? tutorUser.name : ""; // Asigna el nombre del tutor

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
        {error && <Alert severity="error">{error}</Alert>} {/* Mostrar error */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <TextField
              label="Título"
              name="name"
              value={itemDetails.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
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
              required
            />

            <Box display="flex" alignItems="center" margin="normal">
              <IconButton onClick={() => handlePointsChange(-1)}>
                <RemoveIcon />
              </IconButton>
              <TextField
                label="Puntos"
                placeholder="Ponderación de urgencia"
                name="points"
                type="number"
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                inputProps={{ min: 1 }} // Cambiado para requerir al menos 1
                required
              />
              <IconButton onClick={() => handlePointsChange(1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <Box display="flex" justifyContent="center" gap={2} marginY={2}>
              <DatePicker
                label="Fecha de Inicio"
                value={itemDetails.startDate}
                onChange={(newValue) => {
                  setItemDetails((prevDetails) => ({
                    ...prevDetails,
                    startDate: newValue,
                  }));
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
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
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Box>

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={itemDetails.status}
                onChange={handleInputChange}
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
                required
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
