import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import Loader from "../components/Loader/Loader";
import ItemDetail from "../components/ItemDetail/ItemDetail";
import Tracks from "../components/Tracks/Tracks";

const Compare = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedItemIds, setSavedItemIds] = useState([]);

  useEffect(() => {
    // Cargar ítems guardados desde localStorage
    const storedItemIds =
      JSON.parse(localStorage.getItem("savedItemIds")) || [];
    setSavedItemIds(storedItemIds);

    if (storedItemIds.length > 0) {
      // Construir la URL con los IDs guardados
      const idsParam = storedItemIds.join(",");
      const compareUrl = `https://mandalas-backend.netlify.app/.netlify/functions/server/compare?ids=${idsParam}`;

      fetch(compareUrl)
        .then((result) => result.json())
        .then((data) => {
          setListings(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error consumiendo API: " + err);
          setListings([]); // En caso de error, establece listings como un array vacío
          setIsLoading(false);
        });
    } else {
      // Si no hay IDs guardados, establecer isLoading a false directamente
      setIsLoading(false);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Asegura que el contenedor ocupe al menos la altura de la ventana
      }}
    >
      <Container sx={{ flex: 1 }}>
        <Typography variant="h6" align="center">
          En esta sección podras comparar tus terrenos guardados.
        </Typography>
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {listings.length > 0 ? (
              listings.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ItemDetail item={item} />
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  minHeight: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="p" align="center">
                  No hay ítems guardados.
                </Typography>
                <Tracks />
              </Box>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Compare;
