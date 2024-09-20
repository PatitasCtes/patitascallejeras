import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import TaskLoader from "../components/TaskLoader/TaskLoader";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import imgSrc from "../assets/team.png";

const Team = () => {
  const [team, setTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [newTeamId, setNewTeamId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      const storedTeamId = localStorage.getItem("teamId");

      if (storedTeamId) {
        const response = await fetch(
          `https://taskban-team.netlify.app/.netlify/functions/server/teams/${storedTeamId}`
        );
        const teamData = await response.json();
        setTeam(teamData);

        const usersResponse = await fetch(
          `https://taskban-user.netlify.app/.netlify/functions/server/users?teamId=${storedTeamId}`
        );
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }
    };

    fetchTeamData();
  }, []);

  const handleCopyTeamId = () => {
    const teamId = localStorage.getItem("teamId");
    navigator.clipboard.writeText(teamId).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleChangeTeam = async () => {
    if (newTeamId) {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `https://taskban-user.netlify.app/.netlify/functions/server/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamId: newTeamId }),
        }
      );

      if (response.ok) {
        localStorage.setItem("teamId", newTeamId);
        // window.location.reload();
      } else {
        alert("Failed to change team.");
      }
    } else {
      alert("Please provide a valid team ID.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>
      <HeroScreen
        titulo="Equipos"
        descripcion="Administra y organiza tus equipos fácilmente."
        imagen={imgSrc}
      />

      {team && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: "#ffffff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            Equipo: {team.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {team.description}
          </Typography>
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            Team ID: {team.id}
          </Typography>
          <Button variant="contained" onClick={handleCopyTeamId} sx={{ mt: 1 }}>
            Copiar Team ID
          </Button>
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Usuarios en este equipo:</Typography>
        <List>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem
                key={user.id}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <UserAvatar src={user.photoURL} size={30} />
                <ListItemText
                  primary={`${user.name} (${user.email})`}
                  sx={{ ml: 2 }}
                />
              </ListItem>
            ))
          ) : (
            <TaskLoader />
          )}
        </List>
      </Box>

      <Box
        sx={{ mb: 3, bgcolor: "#ffffff", borderRadius: 2, boxShadow: 2, p: 2 }}
      >
        <Typography variant="h6">Cambiar Equipo:</Typography>
        <TextField
          label="Nuevo Team ID"
          variant="outlined"
          fullWidth
          value={newTeamId}
          onChange={(e) => setNewTeamId(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={handleChangeTeam}>
          Cambiar Equipo
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Team ID copiado al portapapeles!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Team;
