import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { auth } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import PopupLoader from "../components/PopupLoader/PopupLoader";
import LoopOk from "../components/LoopOk/LoopOk";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el popup

  const navigate = useNavigate(); // Crear instancia de useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validación del campo nombre
    if (name.length < 3) {
      setError("El nombre debe contener al menos 3 letras");
      return;
    }

    setLoading(true); // Mostrar popup

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;


      const userData = {
        UID: user.uid,
        userUID: user.uid,
        email: user.email,
        photoURL: "",
        isAdmin: false,
        rol: "Rescatista",
        name: name,
        description: description,
      };

      const response = await fetch(
        "https://taskban-user.netlify.app/.netlify/functions/server/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo crear el usuario en el servidor.");
      }

      // Guardar UID y teamId en localStorage y redirigir
      localStorage.setItem("uid", user.uid);
      navigate("/login"); // Redirigir a login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Cerrar popup
    }
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
      <Typography variant="h2" gutterBottom sx={{ mb: 2 }}>
        Registrarse
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleRegister} style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          label="Nombre"
          placeholder="Nombre completo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Acerca de vos"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Registrar
        </Button>
      </form>

      {/* Botón para usuarios con cuenta */}
      <Button
        variant="text"
        color="secondary"
        onClick={() => navigate("/login")}
        sx={{ mt: 2 }}
      >
        Ya tengo una cuenta
      </Button>

      <LoopOk />
      {/* Mostrar el PopupLoader si loading es true */}
      <PopupLoader open={loading} handleClose={() => setLoading(false)} />
    </Box>
  );
};

export default Register;
