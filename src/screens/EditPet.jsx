import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchPetById, updatePetById, addBook } from "../api/api";
import { deleteImage, uploadImage } from "../utils/firebaseImage";
import Loader from "../components/Loader/Loader";
import PetSizeSelector from "../components/PetSizeSelector/PetSizeSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const EditPet = () => {
  const navigate = useNavigate();
  const { petId } = useContext(AppContext);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [petData, setPetData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(0); // Índice de la foto de portada para nuevas subidas

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const pet = await fetchPetById(petId);
        setPetData(pet);
      } catch (error) {
        console.error("Error al cargar los datos de la mascota:", error);
      }
    };
    fetchPetData();
  }, [petId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizeSelect = (size) => {
    if (petData.size === size) {
      setPetData((prevData) => ({
        ...prevData,
        size: null,
      }));
    }else{

      setPetData((prevData) => ({
        ...prevData,
        size,
      }));
    }
  };

  const handleSliderChange = (name) => (e, value) => {
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name) => (e) => {
    setPetData((prevData) => ({
      ...prevData,
      [name]: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePetById(petId, petData);
      navigate(`/adoptions`);
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
    }
  };

  const handleDeleteExistingImage = async () => {
    if (!imageToDelete) return;

    try {
      await deleteImage(imageToDelete);
      setPetData((prevData) => ({
        ...prevData,
        book: prevData.book.filter((img) => img.url !== imageToDelete),
      }));
      setDialogOpen(false);
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const confirmDeleteImage = (imageUrl) => {
    setImageToDelete(imageUrl);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setImageToDelete(null);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({ file }));
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const handleUploadNewImages = async () => {
    setIsUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        selectedImages.map((img) => uploadImage(img.file, petId, petData.name))
      );

      const newBookEntries = uploadedUrls.map((url) => ({ url, isCoverPhoto: false }));

      setPetData((prevData) => ({
        ...prevData,
        book: [...(prevData.book || []), ...newBookEntries],
      }));

      setSelectedImages([]);
      setIsUploaded(true);
      alert("Fotos subidas correctamente");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Ocurrió un error al subir las fotos.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetCoverPhoto = (imageUrl) => {
    setPetData((prevData) => ({
      ...prevData,
      book: prevData.book.map((img) => ({
        ...img,
        isCoverPhoto: img.url === imageUrl,
      })),
    }));
  };
  if (!petData) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Editar mascota
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={petData.name || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Raza"
              name="breed"
              value={petData.breed || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="age"
              value={petData.age || ""}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={petData.description || ""}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patrocinador"
              name="sponsor"
              value={petData.sponsor || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Animal</InputLabel>
              <Select
                name="animal"
                value={petData.animal || ""}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Dog">Perro</MenuItem>
                <MenuItem value="Cat">Gato</MenuItem>
                <MenuItem value="Other">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {petData.animal && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Selecciona el tamaño:
              </Typography>
              <PetSizeSelector
                animal={petData.animal.toLowerCase()}
                onWeightSelect={handleSizeSelect}
                weight={petData.size}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Género:
            </Typography>
            <RadioGroup
              row
              name="gender"
              value={petData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="Macho"
                control={<Radio />}
                label="Macho ♂️"
              />
              <FormControlLabel
                value="Hembra"
                control={<Radio />}
                label="Hembra ♀️"
              />
              <FormControlLabel
                value="Varios"
                control={<Radio />}
                label="Varios ⚧️"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Relación con gatos</Typography>
            <Slider
              value={petData.feelingsWithCats || 5}
              onChange={handleSliderChange("feelingsWithCats")}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la relación con gatos"
              name="feelingsWithCatsObs"
              value={petData.feelingsWithCatsObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Relación con perros</Typography>
            <Slider
              value={petData.feelingsWithDogs || 5}
              onChange={handleSliderChange("feelingsWithDogs")}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la relación con perros"
              name="feelingsWithDogsObs"
              value={petData.feelingsWithDogsObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Relación con Personas</Typography>
            <Slider
              value={petData.feelingsWithPersonas || 5}
              onChange={handleSliderChange("feelingsWithPeople")}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la relación con personas"
              name="feelingsWithPeopleObs"
              value={petData.feelingsWithPeopleObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petData.castred || false}
                  onChange={handleCheckboxChange("castred")}
                />
              }
              label="Castrado"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre castración"
              name="castredObs"
              value={petData.castredObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petData.vaccinated || false}
                  onChange={handleCheckboxChange("vaccinated")}
                />
              }
              label="Vacunado"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre vacunación"
              name="vaccinatedObs"
              value={petData.vaccinatedObs || ""}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones generales"
              name="obs"
              value={petData.obs || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Fotos de la mascota
            </Typography>
            <Grid container spacing={2}>
              {petData.book &&
                petData.book.map((img, index) => (
                  <Grid item xs={4} sm={3} md={2} key={index}>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        component="img"
                        src={img.url}
                        alt={`Preview ${index}`}
                        sx={{
                          display: 'block',
                          width: "100%",
                          height: "auto",
                          borderRadius: 1,
                          boxShadow: 2,
                          border: img.isCoverPhoto ? "2px solid green" : "none",
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSetCoverPhoto(img.url)}
                      ></Box>
                        {img.isCoverPhoto && (
                          <Typography
                            sx={{
                              position: 'absolute',
                              top: 5,
                              left: 5,
                              color: 'white',
                              bgcolor: 'rgba(0, 0, 0, 0.6)',
                              borderRadius: '4px',
                              padding: '2px 4px',
                              fontSize: '0.8rem',
                            }}
                          >
                            Portada
                          </Typography>
                        )}
                      
                      <IconButton
                        onClick={() => confirmDeleteImage(img.url)}
                        color="error"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          zIndex: 1,
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Subir nuevas fotos
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
              <Typography variant="body1" sx={{ ml: 1 }}>
                Seleccionar fotos
              </Typography>
            </label>
            {selectedImages.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" gutterBottom>
                  Vista previa de nuevas fotos
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
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadNewImages}
              disabled={isUploading || selectedImages.length === 0}
              sx={{ mt: 2 }}
            >
              {isUploading ? "Subiendo..." : "Subir fotos seleccionadas"}
            </Button>
          </Grid>


          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/adoptions")}
            >
              Cancelar
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="primary" type="submit">
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
        {/* Diálogo de confirmación de eliminación */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          ¿Estás seguro de que deseas eliminar esta imagen?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteExistingImage} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditPet;
