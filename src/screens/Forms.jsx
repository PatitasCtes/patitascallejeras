import React, { useState, useEffect } from "react";
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
  Alert,
  TextField,
  IconButton,
} from "@mui/material";
import Loader from "../components/Loader/Loader";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import FormList from "../components/FormList/FormList";
import {
  fetchForms,
  fetchPetsByCriteria,
  updateForms,
  searchForms,
} from "../api/api";

const Forms = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState(() => {
    const storedFilters = localStorage.getItem("formsFilters");
    return storedFilters
      ? JSON.parse(storedFilters)
      : { petId: "", orderBy: "" };
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("formsSearchQuery") || "";
  });
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const loadFormsAndPets = async () => {
      try {
        setLoading(true);
        setError(null);

        const [formsData, petsData] = await Promise.all([
          fetchForms(),
          fetchPetsByCriteria({ status: "Disponible" }),
        ]);

        setForms(formsData);
        setPets(petsData);

        if (searchQuery) {
          const searchResults = await searchForms(searchQuery);
          setForms(searchResults);
        }
      } catch (err) {
        setError("Error al cargar los datos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    loadFormsAndPets();
  }, [searchQuery]);

  const handleCloseForms = async () => {
    const { petId } = filters;

    if (petId) {
      try {
        await updateForms({ PetId: petId }, { status: "Cerrado" });
        window.location.reload();
      } catch (error) {
        console.error("Error al cerrar los formularios:", error);
      }
    }
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    localStorage.setItem("formsFilters", JSON.stringify(updatedFilters));

    try {
      setLoading(true);
      setError(null);

      let formsData = [];
      if (name === "petId" && value) {
        formsData = await fetchForms({ PetId: value });
      } else {
        formsData = await fetchForms();
      }

      setForms(formsData);
    } catch (err) {
      setError("Error al aplicar los filtros. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    localStorage.setItem("formsSearchQuery", e.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchResults = await searchForms(searchQuery);
      setForms(searchResults);
    } catch (err) {
      setError("Error al realizar la búsqueda. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const filteredForms = forms.sort((a, b) => {
    if (filters.orderBy === "fechaCreacion") {
      return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
    } else if (filters.orderBy === "petId") {
      return a.petId.toString().localeCompare(b.petId.toString());
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
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          <Typography>Filtros</Typography>
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
                {pets.map((pet) => (
                  <MenuItem key={pet.id} value={pet.id}>
                    {pet.name}
                  </MenuItem>
                ))}
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
            <TextField
              label="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
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
      ) : filteredForms.length === 0 ? (
        <Typography variant="body1">
          No se encontraron formularios de adopción.
        </Typography>
      ) : (
        <FormList forms={filteredForms} />
      )}
    </Container>
  );
};

export default Forms;

