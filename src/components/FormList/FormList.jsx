import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { useNavigate } from "react-router-dom";

const FormList = ({ forms, updateFormStatus }) => {
  const navigate = useNavigate();

  const handleViewForm = (formId) => {
    navigate(`/form/${formId}`);
    console.log("Ver formulario con ID:", formId);
  };

  const handleArchiveForm = (formId, event, formStatus) => {
    event.stopPropagation(); // Evita que el evento afecte al ListItem
    if (formStatus === "Archivado") {
      updateFormStatus(formId, "Revisado");
    } else {
      updateFormStatus(formId, "Archivado");
    }
    console.log("Archivado formulario con ID:", formId);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <List>
        {forms.map((form) => (
          <ListItem
            key={form.id}
            sx={{
              borderBottom: "1px solid #eee",
              "&:last-child": { borderBottom: "none" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => handleViewForm(form.id)} // Ejecuta handleViewForm al hacer clic en el ListItem
            secondaryAction={
              <IconButton
                onClick={(event) => handleArchiveForm(form.id, event, form.status)} // Maneja la acción de archivo
                aria-label="archive"
                sx={{ mt: -6 }}
              >
                {form.status === "Archivado" ? (
                  <RestoreIcon sx={{ color: "gray" }} />
                ) : (
                  <DeleteIcon sx={{ color: "primary.main" }} />
                )}
              </IconButton>
            }
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItemAvatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={form.PetPhotoUrl} />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  color:
                    form.status === "Nuevo"
                      ? "primary.main"
                      : form.status === "Revisado"
                      ? "info.main"
                      : form.status === "Rechazado"
                      ? "warning.main"
                      : form.status === "Aprobado"
                      ? "success.main"
                      : form.status === "Cerrado"
                      ? "inherit"
                      : "black",
                }}
                primary={
                  `${form.respuestas[2].respuesta} (${form.PetName}) ${form.status}` ||
                  "Sin nombre de mascota"
                }
                secondary={`${form.respuestas[25].respuesta} |  ${
                  form.respuestas[1].respuesta
                } |  ${form.respuestas[4].respuesta} |  ${
                  form.respuestas[9].respuesta
                } |  ${form.respuestas[6].respuesta} |  ${
                  form.respuestas[29].respuesta
                } |  ${new Date(form.fechaCreacion).toLocaleString("es-AR", {
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FormList;

