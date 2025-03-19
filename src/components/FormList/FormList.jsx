import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";

const FormList = ({ forms }) => {
  const navigate = useNavigate();

  const handleViewForm = (formId) => {
    console.log("Ver formulario con ID:", formId);
  };
  const handleCloseForm = (formId) => {
    console.log("Cerrar formulario con ID:", formId);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <List>
        {forms.map((form) => (
          <ListItem
            key={form.id}
            button
            sx={{
              borderBottom: "1px solid #eee",
              "&:last-child": { borderBottom: "none" },
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex",flexDirection: "column", alignItems: "center"}}>
              <ListItemAvatar>
              <Box sx={{ display: "flex",flexDirection: "row", alignItems: "center"}}>
                <Avatar src={form.PetPhotoUrl} />
                
              </Box>
              </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                color: form.status === "NUEVO" ? "primary.main" : "black",
              }}
              primary={
                `${form.respuestas[2].respuesta} (${form.PetName}) ${form.status}` ||
                "Sin nombre de mascota"
              }
              
              secondary={`${form.respuestas[25].respuesta} |  ${form.respuestas[1].respuesta} |  ${form.respuestas[4].respuesta} |  ${form.respuestas[9].respuesta} |  ${form.respuestas[6].respuesta} |  ${form.respuestas[29].respuesta} |  ${form.fechaCreacion}`}
            />
              
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FormList;

