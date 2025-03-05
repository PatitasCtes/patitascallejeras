import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchPetsByCriteria } from "../../api/api";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader";

const ItemDetailList = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPets = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPetsByCriteria();
        setPets(data);
      } catch (error) {
        console.log("Error consumiendo API:", error);
      } finally {
        setIsLoading(false); // Finaliza la carga incluso en caso de error
      }
    };

    getPets();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loader /> // Muestra el componente Loader mientras se están cargando los datos
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {pets.map((item, index) => (
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
