import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { auth } from "../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoopOk from "../components/LoopOk/LoopOk";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("uid", user.uid); // Guardar UID en localStorage

      // Hacer fetch para recuperar el userId usando el UID
      const response = await fetch(
        `https://taskban-user.netlify.app/.netlify/functions/server/users/uid/${user.uid}`
      );
      const userData = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", userData.id); // Guardar userId en localStorage
        localStorage.setItem("teamId", userData.teamId);
        window.location.href = "/"; // Redirigir al inicio
      } else {
        setError("Error al obtener el ID del usuario.");
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Usuario o contraseña inválido.");
      } else if (err.code === "auth/invalid-email") {
        setError("Correo no válido.");
      } else {
        setError(err.message);
      }
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Redirigir a la página de registro
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
        Patitas Callejeras 💜
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Corrientes
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: 400 }}>
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
          placeholder="Mínimo 6 caracteres"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Iniciar Sesión
        </Button>
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        sx={{ mt: 2 }}
      >
        Registrarse
      </Button>
      <LoopOk />
    </Box>
  );
};

export default Login;

