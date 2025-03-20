import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { AppContext } from "../context/AppContext";
import imgOk from "../assets/imgLogo.png";
import OkAdoption from "../components/OkAdoption/OkAdoption";
import { saveForm } from "../api/api";

const ResumeAdoption = () => {
  const navigate = useNavigate();
  const {
    petId,
    petName,
    petPhotoUrl,
    formAdoption,
    formAdoptionAswered,
    saveFormAdoptionAswered,
    answerNumber,
    setAnswerNumber,
  } = useContext(AppContext);
  console.log(formAdoptionAswered);

  const [editableFields, setEditableFields] = useState({});
  const [editedAnswers, setEditedAnswers] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState(""); // Puede ser 'success' o 'error'

  const handleCancel = () => {
    saveFormAdoptionAswered({});
    setAnswerNumber(0);
    navigate("/adoptions");
  };

  const handleConfirm = async () => {
    try {
      console.log("Enviando formulario:", formAdoptionAswered);
      await saveForm(formAdoptionAswered);
      setSnackbarMessage("Formulario enviado con éxito !!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      saveFormAdoptionAswered({}); // Limpiar el formulario respondido
      setAnswerNumber(0);
      setTimeout(() => {
        navigate("/adoptions");
      }, 3500); // Redirigir después de un breve tiempo
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSnackbarMessage("Hubo un error al enviar el formulario.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEdit = (preguntaId, respuestaActual) => {
    setEditableFields({ ...editableFields, [preguntaId]: true });
    setEditedAnswers({ ...editedAnswers, [preguntaId]: respuestaActual });
  };

  const handleSave = (preguntaId) => {
    const updatedRespuestas = formAdoptionAswered.respuestas.map(resp =>
      resp.preguntaId === preguntaId ? { ...resp, respuesta: editedAnswers[preguntaId] } : resp
    );
    saveFormAdoptionAswered({ ...formAdoptionAswered, respuestas: updatedRespuestas });
    setEditableFields({ ...editableFields, [preguntaId]: false });
  };

  const handleChange = (event, preguntaId) => {
    setEditedAnswers({ ...editedAnswers, [preguntaId]: event.target.value });
  };

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
        Revisa tus respuestas para adoptar a <strong>{petName}</strong>
      </Typography>
      <OkAdoption/>
      <List sx={{ width: '100%', maxWidth: 600 }}>
        {formAdoptionAswered.respuestas && formAdoptionAswered.respuestas.map((respuesta) => {
          const pregunta = formAdoption.preguntas.find(p => p.id === respuesta.preguntaId);
          const isEditable = editableFields[pregunta?.id];
          const respuestaValue = Array.isArray(respuesta.respuesta) ? respuesta.respuesta.join(', ') : respuesta.respuesta;

          return (
            <ListItem
              key={respuesta.preguntaId}
              secondaryAction={
                isEditable ? (
                  <IconButton edge="end" aria-label="save" onClick={() => handleSave(pregunta.id)}>
                    <SaveIcon sx={{ color: 'primary.main' }} />
                  </IconButton>
                ) : (
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(pregunta.id, respuestaValue)}>
                    <EditIcon />
                  </IconButton>
                )
              }
            >
              <ListItemText
                primary={pregunta?.pregunta}
                secondary={
                  isEditable ? (
                    <TextField
                      fullWidth
                      value={editedAnswers[pregunta?.id] || ''}
                      onChange={(e) => handleChange(e, pregunta?.id)}
                      variant="outlined"
                      size="small"
                    />
                  ) : (

                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontSize: '1rem' }}>
                      {respuestaValue}
                    </Typography>
                  )
                }
              />
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" color="error" onClick={handleCancel} sx={{ mr: 2 }}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Enviar
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResumeAdoption;