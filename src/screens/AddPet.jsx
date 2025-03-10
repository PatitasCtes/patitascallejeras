import { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addPet } from "./../api/api";
import dayjs from "dayjs"; // Importar dayjs para uso de fechas
import PetBook from "../components/PetBook/PetBook";

const AddPet = () => {
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: "",
    description: "",
    breed: "",
    age: "",
    petUID: "22",
    animal: "",
    sponsor: "",
    obs: "",
    status: "Disponible",
    castred: false,
    castredObs: "",
    vaccinated: false,
    vaccinatedObs: "",
    feelingsWithCats: 5,
    feelingsWithCatsObs: "",
    feelingsWithDogs: 5,
    feelingsWithDogsObs: "",
    feelingsWithPeople: 5,
    feelingsWithPeopleObs: "",
    bookID: "",
    litter: null,
    adopter: null,
    adoptionDate: "",
    rescueDate: dayjs().toISOString().substring(0, 10), // Uso de dayjs para obtener fecha actual
    birthdate: "", // birthdate: (age) => {
    //   const today = dayjs();
    //   const ageNum = parseInt(age, 10);
    //   const pastDate = today.subtract(ageNum, "year");
    //   return pastDate.toISOString().substring(0, 10);
    // },
  });

  const [newPetId, setNewPetId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      const newPet = await addPet(petData);
      setNewPetId(newPet.petId);
    } catch (error) {
      console.error("Error al agregar el pet:", error);
    }
  };

  const handleCancel = () => {
    navigate("/adoptions");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agregar nueva mascota
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={petData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Raza"
              name="breed"
              value={petData.breed}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Edad"
              name="age"
              value={petData.age}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={petData.description}
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
              value={petData.sponsor}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Animal</InputLabel>
              <Select
                name="animal"
                value={petData.animal}
                onChange={handleInputChange}
                required
              >
                <MenuItem value="Dog">Perro</MenuItem>
                <MenuItem value="Cat">Gato</MenuItem>
                <MenuItem value="Other">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Relación con gatos</Typography>
            <Slider
              value={petData.feelingsWithCats}
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
              value={petData.feelingsWithCatsObs}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Relación con perros</Typography>
            <Slider
              value={petData.feelingsWithDogs}
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
              value={petData.feelingsWithDogsObs}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Relación con personas</Typography>
            <Slider
              value={petData.feelingsWithPeople}
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
              value={petData.feelingsWithPeopleObs}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petData.castred}
                  onChange={handleCheckboxChange("castred")}
                />
              }
              label="Esterilizado"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la esterilización"
              name="castredObs"
              value={petData.castredObs}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={petData.vaccinated}
                  onChange={handleCheckboxChange("vaccinated")}
                />
              }
              label="Vacunado"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones sobre la vacunación"
              name="vaccinatedObs"
              value={petData.vaccinatedObs}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones generales"
              name="obs"
              value={petData.obs}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Agregar mascota
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>

      {newPetId && <PetBook petId={newPetId} />}
    </Container>
  );
};

export default AddPet;
