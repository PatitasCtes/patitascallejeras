import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { auth } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Resetea el error antes de intentar registrar
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        UID: user.uid,
        email: user.email,
        photoURL: "https://i.imgur.com/rmOYYo4.png",
        isAdmin: false,
        rol: "developer",
        teamId: "123456",
        name: name,
        description: description,
      };

      // Intentar guardar el usuario en el servidor
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

      // Si todo fue exitoso, guardar el UID en localStorage y redirigir
      localStorage.setItem("uid", user.uid);
      window.location.href = "/login"; // Redirigir al login
    } catch (err) {
      setError(err.message);
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
      <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
        Registrarse
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleRegister} style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Descripción"
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
    </Box>
  );
};

export default Register;
