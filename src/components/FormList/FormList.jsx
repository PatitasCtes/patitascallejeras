import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { fetchForms } from "../../api/api";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadForms = async () => {
      try {
        const data = await fetchForms();
        setForms(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadForms();
  }, []);

  const handleViewForm = (formId) => {
    // Redirigir a una página para ver los detalles del formulario (opcional)
    console.log("Ver formulario con ID:", formId);
    // Por ejemplo: navigate(`/form/${formId}`);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recientes
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Loader />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : forms.length === 0 ? (
        <Typography variant="body1">No se encontraron formularios de adopción.</Typography>
      ) : (
        <List>
          {forms.map((form) => (
            <ListItem
              key={form.id}
              button
            //   onClick={() =>
            //     navigate("/resume-adoption", {
            //       state: { formAdoptionAswered: form },
            //     })
            //   }
              sx={{
                borderBottom: "1px solid #eee",
                "&:last-child": { borderBottom: "none" },
                cursor: "pointer",
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PetsIcon color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={form.PetName || "Sin nombre de mascota"}
                secondary={`|  ${form.respuestas[2].respuesta} |  ${form.respuestas[25].respuesta} |  ${form.respuestas[1].respuesta} |  ${form.respuestas[4].respuesta} |  ${form.respuestas[9].respuesta} |  ${form.respuestas[6].respuesta} |  ${form.respuestas[29].respuesta}`}

              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FormList;