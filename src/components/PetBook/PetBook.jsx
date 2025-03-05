import { useState } from "react";
import { Box, Button, Typography, IconButton, Grid } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom"; // Importamos navigate
import { addBook } from "../../api/api";
import uploadImage from "../../utils/uploadImage";

const PetBook = ({ petId }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(0); // Índice de la foto de portada
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate(); // Usamos navigate para redirigir

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({ file }));
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const handleUploadImages = async () => {
    setIsUploading(true);
    try {
      // Subir imágenes y obtener URLs
      const uploadedUrls = await Promise.all(
        selectedImages.map((img) => uploadImage(img.file, petId))
      );

      // Crear datos del "book"
      const bookData = {
        petId,
        photos: uploadedUrls.map((url, index) => ({
          url,
          isCoverPhoto: index === coverPhotoIndex, // Usamos el índice de portada
        })),
      };

      // Enviar datos a la API
      await addBook(petId, bookData);
      alert("Fotos subidas correctamente");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Ocurrió un error al subir las fotos.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    // Borra las imágenes seleccionadas
    setSelectedImages([]);
    setCoverPhotoIndex(0); // Resetear la portada seleccionada
    navigate("/adoptions"); // Redirigir a /adoptions
  };

  const handleFinish = () => {
    navigate("/adoptions"); // Redirigir a /adoptions
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Agregar fotos
      </Typography>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
        style={{ display: "none" }}
        id="upload-button"
      />
      <label htmlFor="upload-button">
        <IconButton
          color="primary"
          aria-label="upload pictures"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>

      {selectedImages.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" gutterBottom>
            Vista previa
          </Typography>
          <Grid container spacing={2}>
            {selectedImages.map((img, index) => (
              <Grid item xs={4} sm={3} md={2} key={index}>
                <Box
                  component="img"
                  src={URL.createObjectURL(img.file)}
                  alt={`Preview ${index}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 1,
                    boxShadow: 2,
                    border:
                      coverPhotoIndex === index ? "2px solid green" : "none", // Resaltar la portada
                  }}
                  onClick={() => setCoverPhotoIndex(index)} // Cambiar portada al hacer clic
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUploadImages}
        disabled={isUploading || selectedImages.length === 0}
        sx={{ mt: 2 }}
      >
        {isUploading ? "Subiendo..." : "Subir fotos"}
      </Button>

      <Box mt={2}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel} // Acción de cancelar
          sx={{ mr: 2 }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFinish} // Acción de finalizar
          disabled={isUploading || selectedImages.length === 0}
        >
          Finalizar
        </Button>
      </Box>
    </Box>
  );
};

export default PetBook;
