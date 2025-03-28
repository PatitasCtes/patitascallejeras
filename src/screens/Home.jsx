import React, { useState } from "react";
import './Home.css';

import {
  Box,
  Typography,
  CardMedia,
  useMediaQuery,
  Grid,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import InstagramIcon from "@mui/icons-material/Instagram";
import Carousel from "react-material-ui-carousel";
import h1 from "../assets/home-images/h1.jpg";
import h2 from "../assets/home-images/h2.jpg";
import h3 from "../assets/home-images/h3.jpg";
import h4 from "../assets/home-images/h4.jpg";
import h5 from "../assets/home-images/h5.jpg";
import h6 from "../assets/home-images/h6.jpg";
import h7 from "../assets/home-images/h7.jpg";
import h8 from "../assets/home-images/h8.jpg";
import h9 from "../assets/home-images/h9.jpg";
import h10 from "../assets/home-images/h10.jpg";

const Home = () => {
  const [copied, setCopied] = useState(false); // Estado para el mensaje
  const images = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10];
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  // Función para copiar el alias al portapapeles
  const handleCopy = () => {
    navigator.clipboard.writeText("Patitas.callej").then(() => {
      setCopied(true); // Mostrar mensaje
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        p: 3,
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{ mb: 3, color: "primary.main" }}
      >
        Rescate de animales 💜
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mr: 1, color: "GrayText.primary" }}
        >
          #castrarsalvavidas
        </Typography>
        <IconButton
          color="primary"
          href="https://www.instagram.com/patitascallejera/?hl=es"
          target="_blank"
          rel="noopener"
          size="large"
        >
          <InstagramIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex",flexDirection: "column", alignItems: "center", mt: 3 }}>
      
        <Typography
          id="alias"
          variant="h7"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={handleCopy} // Agregar función de copia
        >
          ALIAS: PATITAS.CALLEJ
        </Typography>
        <a
            href="https://www.mercadopago.com.ar/checkout/v1/payment/redirect/474bcf57-735f-4e17-be92-1b64e480c2a0/payment-option-form-v2/?source=link&preference-id=213470304-0a9a9297-f8a0-4a8f-a09a-af69d41b6a22&router-request-id=3cb65f91-4c30-48df-88a5-b773aff1e6b1&p=455ca0cfc7deb8c75dd985784eb32fdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
          <div className="tambalea">
          <PaymentIcon sx={{ mr: 1, color: "primary.main" }} />
          </div>
          </a>
      </Box>

      <CarouselHome isSmallScreen={isSmallScreen} images={images} />

      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 3, mt: 3, color: "GrayText.main", fontSize: 15 }}
      >
        Te gustaria que tu mascota aparezca aquí? Envianos su foto a nuestras
        redes 💜
      </Typography>

      {/* Mensaje de confirmación */}
      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
      >
        <Alert onClose={() => setCopied(false)} severity="success" sx={{ width: '100%' }}>
          Alias copiado al portapapeles!
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Componente CarouselHome (sin cambios)
const CarouselHome = ({ isSmallScreen, images }) => {
  return (
    <>
      {isSmallScreen ? (
        <Box
          sx={{
            width: 150,
            maxHeight: 300,
            height: 200,
            position: "relative",
            borderRadius: 2,
            boxShadow: 3,
            mt: 4,
          }}
        >
          <Carousel
            navButtonsAlwaysVisible={false}
            indicators={false}
            sx={{ height: "100%", width: "100%" }}
          >
            {images.map((src, index) => (
              <CardMedia
                key={index}
                component="img"
                height="100%"
                width="100%"
                objectFit="contain"
                image={src}
                alt={`Imagen ${index + 1}`}
              />
            ))}
          </Carousel>
        </Box>
      ) : (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          {[0, 1, 2].map((index) => (
            <Grid item xs={12} md={2} key={index}>
              <Box
                sx={{
                  width: 150,
                  maxHeight: 300,
                  height: 200,
                  position: "relative",
                  borderRadius: 2,
                  boxShadow: 3,
                  mt: 4,
                }}
              >
                <Carousel
                  navButtonsAlwaysVisible={false}
                  indicators={false}
                  sx={{ height: "100%", width: "100%" }}
                >
                  {Array.from({ length: 3 }).map((_, index) => {
                    const randomIndex = Math.floor(
                      Math.random() * images.length
                    );
                    return (
                      <CardMedia
                        key={index}
                        component="img"
                        height="100%"
                        width="100%"
                        objectFit="contain"
                        image={images[randomIndex]}
                        alt={`Imagen ${index + 1}`}
                      />
                    );
                  })}
                </Carousel>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Home;
