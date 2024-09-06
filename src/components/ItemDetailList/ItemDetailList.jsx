import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import getListings from "../../assets/MOCK-LISTINGS";
import Loader from "../Loader/Loader";
const ItemDetailList = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://mandalas-backend.netlify.app/.netlify/functions/server/listings"
    )
      .then((result) => result.json())
      .then((data) => {
        setListings(data);
        setIsLoading(false); // Finaliza la carga cuando los datos son recibidos
      })
      .catch((err) => {
        console.log("Error consumiendo API: " + err);
        let mockData = getListings();
        console.log(mockData);
        setListings(mockData);
        setIsLoading(false); // Finaliza la carga incluso en caso de error
      });
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loader /> // Muestra el componente Loader mientras se están cargando los datos
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {listings.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ItemDetail item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ItemDetailList;
