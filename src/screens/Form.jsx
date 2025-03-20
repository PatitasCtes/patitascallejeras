import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AppContext } from "../context/AppContext";

import imgOk from "../assets/imgLogo.png";
import OkAdoption from "../components/OkAdoption/OkAdoption";
import { updateFormById, fetchFormById } from "../api/api";

const Form = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [formAnswered, setFormAdoptionAswered] = useState({});
  const [status, setStatus] = useState("");
  const { formAdoption } = useContext(AppContext);

  useEffect(() => {
    if (formId) {
      fetchFormById(formId).then((form) => {
        setFormAdoptionAswered(form);
        setStatus(form.status);
        setLoading(false);
      });
    }
  }, [formId]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    try {
      await updateFormById(formId, { status: newStatus });
      setSnackbarMessage("Estado actualizado con éxito.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      setSnackbarMessage("Error al actualizar el estado.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const copyToClipboard = () => {
    const selectedQuestions = [5, 7, 3, 6, 8];
    const textToCopy = `Mascota: ${formAnswered.PetName}\n` +
      formAnswered.respuestas
        .filter((respuesta) => selectedQuestions.includes(respuesta.preguntaId))
        .map((respuesta) => {
          const pregunta = formAdoption.preguntas.find(
            (p) => p.id === respuesta.preguntaId
          );
          const respuestaValue = Array.isArray(respuesta.respuesta)
            ? respuesta.respuesta.join(", ")
            : respuesta.respuesta;
          return `${pregunta?.pregunta}: ${respuestaValue}`;
        })
        .join("\n");

    navigator.clipboard.writeText(textToCopy);
    setSnackbarMessage("Información copiada al portapapeles.");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return <OkAdoption />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      <Typography variant="h7" color={"primary.main"} gutterBottom>
        {snackbarMessage}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Solicitud para adoptar a <strong>{formAnswered.PetName}</strong>
        </Typography>
        <Tooltip title="Copiar información al portapapeles">
          <IconButton color="primary" onClick={copyToClipboard}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <img
        src={formAnswered.PetPhotoUrl}
        alt={formAnswered.PetName}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
        }}
      />

      <Box sx={{ mt: 2, mb: 2, width: "100%", maxWidth: 600 }}>
        <Select
          value={status}
          onChange={handleStatusChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="Nuevo">
            <Typography color="primary">Nuevo</Typography>
          </MenuItem>
          <MenuItem value="Revisado">
            <Typography color="info">Revisado</Typography>
          </MenuItem>
          <MenuItem value="Aprobado">
            <Typography color="success">Aprobado</Typography>
          </MenuItem>
          <MenuItem value="Rechazado">
            <Typography color="warning">Rechazado</Typography>
          </MenuItem>
          <MenuItem value="Cerrado">
            <Typography color="inherit">Cerrado</Typography>
          </MenuItem>
        </Select>
      </Box>

      <List sx={{ width: "100%", maxWidth: 600 }}>
        {formAnswered.respuestas &&
          formAnswered.respuestas.map((respuesta) => {
            const pregunta = formAdoption.preguntas.find(
              (p) => p.id === respuesta.preguntaId
            );
            const respuestaValue = Array.isArray(respuesta.respuesta)
              ? respuesta.respuesta.join(", ")
              : respuesta.respuesta;

            return (
              <ListItem key={respuesta.preguntaId}>
                <ListItemText
                  primary={pregunta?.pregunta}
                  secondary={
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "primary.main", fontSize: "1rem" }}
                    >
                      {respuestaValue}
                    </Typography>
                  }
                />
                <Tooltip title="Copiar respuesta al portapapeles">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(respuestaValue);
                      setSnackbarMessage("Respuesta copiada al portapapeles.");
                      setSnackbarSeverity("info");
                      setSnackbarOpen(true);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                {respuesta.preguntaId === 8 && (
                  <IconButton
                    component="a"
                    href={`https://wa.me/${respuestaValue}`}
                    target="_blank"
                  >
                    <WhatsAppIcon />
                  </IconButton>
                )}
              </ListItem>
            );
          })}
      </List>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{ mr: 2 }}
          variant="outlined"
          color="error"
          onClick={() => navigate("/forms")}
        >
          Salir
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Form;
