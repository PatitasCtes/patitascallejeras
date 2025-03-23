import React, { useState, useContext } from "react";
import { getRandomEmoji } from "../utils/getRandomEmoji";
import {
  Container,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  TextField,
  IconButton,
} from "@mui/material";
import Loader from "../components/Loader/Loader";
import CloseIcon from "@mui/icons-material/Close";
import FormList from "../components/FormList/FormList";
import { fetchForms, updateForms, searchForms, updateFormById } from "../api/api";
import { AppContext } from "../context/AppContext";

const Forms = () => {
  const { formsData, updateFormsData } = useContext(AppContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [filters, setFilters] = useState(() => {
    const storedFilters = localStorage.getItem("formsFilters");
    return storedFilters
      ? JSON.parse(storedFilters)
      : { petId: "", orderBy: "", verArchivados: false };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("formsSearchQuery") || "";
  });
  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSearchSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const searchResults = searchQuery
        ? await searchForms(searchQuery,filters.verArchivados)
        : await fetchForms({'archivados': filters.verArchivados});
      updateFormsData({ ...formsData, forms: searchResults });

      searchQuery && localStorage.setItem("formsFilters", JSON.stringify(searchQuery));
    } catch (err) {
      setError("Error al realizar la búsqueda. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormStatus = async (formId, newStatus) => {
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

  const handleCloseForms = async () => {
    const { petId } = filters;
    if (petId) {
      try {
        await updateForms({ PetId: petId }, { status: "Cerrado" });
        updateFormsData({
          ...formsData,
          forms: formsData.forms.filter((form) => form.petId !== petId),
        });
      } catch (error) {
        console.error("Error al cerrar los formularios:", error);
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
   
  };

  const filteredForms = formsData.forms
    .filter((form) => {
      if (filters.petId && form.petId !== filters.petId) return false;
      if (!filters.verArchivados && form.status === "Cerrado")
        return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.orderBy === "fechaCreacion") {
        return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
      } else if (filters.orderBy === "petId") {
        return a.PetId.toString().localeCompare(b.PetId.toString());
      }
      return 0;
    });

  return (
    <Container>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1,
          padding: 1,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontSize: { xs: "1rem", sm: "2rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Listado de Formularios de Adopción {getRandomEmoji()}
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: { sm: "space-between" },
            alignItems: "center",
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant={filters.petId ? "contained" : "outlined"}
              startIcon={<CloseIcon />}
              onClick={handleCloseForms}
              color={filters.petId ? "primary" : "info"}
            >
              Cerrar Formularios
            </Button>
          </Box>
        </Box>
        <IconButton
          sx={{ display: { xs: "block", sm: "block" , md: "block", lg: "block"} }}
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          {filtersVisible ? <CloseIcon /> :  <Typography>Filtros</Typography>}
        </IconButton>

        {filtersVisible && (
          <Box
            sx={{
              id: "form-filters",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              marginTop: 2,
            }}
          >
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="filter-petId">Filtrar por Mascota</InputLabel>
              <Select
                labelId="filter-petId"
                name="petId"
                value={filters.petId}
                onChange={handleFilterChange}
                label="Filtrar por Mascota"
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {formsData.pets.map(
                  (
                    pet // Usar formsData.pets
                  ) => (
                    <MenuItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="order-by">Ordenar por</InputLabel>
              <Select
                labelId="order-by"
                name="orderBy"
                value={filters.orderBy}
                onChange={handleFilterChange}
                label="Ordenar por"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="fechaCreacion">Recientes</MenuItem>
                <MenuItem value="petId">Mascota</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="ver-archivados">Ver Archivados</InputLabel>
              <Select
                labelId="ver-archivados"
                name="verArchivados"
                value={filters.verArchivados}
                onChange={handleFilterChange}
                label="Ver Archivados"
              >
                <MenuItem value={false}>
                  <em>No</em>
                </MenuItem>
                <MenuItem value={true}>
                  <em>Sí</em>
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearchSubmit}>
              Buscar
            </Button>
          </Box>
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Loader />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filteredForms.length === 0 && !loading ? (
        <Typography variant="body1">
          No se encontraron formularios de adopción.
        </Typography>
      ) : (
        <FormList forms={filteredForms} updateFormStatus={updateFormStatus} />
      )}

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
    </Container>
  );
};

export default Forms;


