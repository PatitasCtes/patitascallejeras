import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ProfileDetails = ({
  profile,
  isEditable,
  isEditing,
  setIsEditing,
  handleEditProfile,
  handleSaveProfile,
  handleImageUpload,
  uploading,
  handleLogout,
  setProfile,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
        mb: 2,
        position: "relative",
      }}
    >
      {isEditable && (
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <PhotoCamera />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </IconButton>
      )}

      {uploading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "0%",
            right: "10%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      <Typography variant="h4" gutterBottom>
        Perfil
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Nombre:</Typography>
        {isEditing ? (
          <TextField
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography variant="h6">{profile.name}</Typography>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Email:</Typography>
        {isEditing ? (
          <TextField
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            variant="outlined"
            fullWidth
          />
        ) : (
          <Typography variant="h6">{profile.email}</Typography>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Biografía:</Typography>
        {isEditing ? (
          <TextField
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
          />
        ) : (
          <Typography variant="body2">{profile.bio}</Typography>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Rol:</Typography>
        <Typography variant="h6">{profile.role}</Typography>
      </Box>

      {isEditable && (
        <Button
          variant="contained"
          color="primary"
          onClick={isEditing ? handleSaveProfile : handleEditProfile}
          sx={{ mr: 2 }}
        >
          {isEditing ? "Guardar Perfil" : "Editar Perfil"}
        </Button>
      )}

      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default ProfileDetails;
