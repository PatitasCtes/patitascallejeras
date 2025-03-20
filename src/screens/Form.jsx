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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import imgOk from "../assets/imgLogo.png";
import OkAdoption from "../components/OkAdoption/OkAdoption";
import { saveForm, fetchFormById } from "../api/api";
import { AppContext } from "../context/AppContext";

const Form = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [formAnswered, setFormAdoptionAswered] = useState({});
  const { formAdoption } = useContext(AppContext);

  useEffect(() => {
    if (formId) {
      console.log('fetchFormById', formId);
      
      fetchFormById(formId).then((form) => {
        setFormAdoptionAswered(form);
        setLoading(false);
      });
    }
  }, [formId]);

  const handleCancel = () => {
    setFormAdoptionAswered({});
    navigate("/forms");
  };

  const handleConfirm = async () => {
    try {
      
      setSnackbarMessage("Formulario Aprobado con éxito !!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setFormAdoptionAswered({});
      setTimeout(() => {
        navigate("/forms");
      }, 3500);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSnackbarMessage("Hubo un error al enviar el formulario.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
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
      <Typography variant="h4" color={"primary.main"} gutterBottom>
        {snackbarMessage}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Solicitud para adoptar a <strong>{formAnswered.PetName}</strong>
      </Typography>
      <img
        src={formAnswered.PetPhotoUrl}
        alt={formAnswered.petName}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
        }}
      />
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
                <Tooltip title="Copiar al portapapeles">
                  <IconButton
                  color="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(respuestaValue);
                      setSnackbarMessage("Respuesta copiada al portapapeles");
                      setSnackbarSeverity("info");
                      setSnackbarOpen(true);
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                {(respuesta.preguntaId === 8) && (
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
          onClick={handleCancel}
        >
          Salir
        </Button>
        <Button sx={{ mr: 2 }} variant="contained" color="primary" onClick={handleConfirm}>
          Aprobar
        </Button>
        <Button variant="outlined" color="primary" onClick={handleConfirm}>
          Cerrar
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

