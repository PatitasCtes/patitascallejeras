import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import HeroScreen from "../components/HeroScreen/HeroScreen";
import imgSrc from "../assets/profile.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import {
  storage,
  db,
  doc,
  setDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../api/firebaseConfig";
import Loader from "../components/Loader/Loader";

const Profile = ({ profileUid, isEditable }) => {
  if (profileUid === undefined) profileUid = localStorage.getItem("uid");
  let downloadURL = "";
  const [profile, setProfile] = useState({
    name: "-",
    email: "-",
    bio: "-",
    role: "-",
    photoURL: imgSrc,
    id: null,
  });
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfileAndTasks = async () => {
      try {
        const response = await fetch(
          `https://taskban-user.netlify.app/.netlify/functions/server/users/uid/${profileUid}`
        );
        if (response.ok) {
          const data = await response.json();
          setProfile({
            name: data.name,
            email: data.email,
            bio: data.description,
            role: data.rol,
            photoURL: data.photoURL || imgSrc,
            id: data.id,
          });
          setTasks(data.tasks || []);
        } else {
          console.error(
            "Error fetching user profile and tasks:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user profile and tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileAndTasks();
  }, [profileUid]);

  const handleEditProfile = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveProfile = async (downloadURL) => {
    const userId = profile.id; // Asegúrate de usar el ID correcto
    const updatedProfile = {
      email: profile.email,
      name: profile.name,
      userUID: profileUid,
      isAdmin: false,
      photoURL: downloadURL,
      description: profile.bio,
      rol: profile.role,
      teamId: "123456",
      UID: profileUid,
    };

    try {
      const response = await fetch(
        `https://taskban-user.netlify.app/.netlify/functions/server/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (response.ok) {
        console.log("Perfil guardado correctamente");
        setIsEditing(false);
      } else {
        console.error("Error al guardar el perfil:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud PUT:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const imageRef = ref(
          storage,
          `profile_images/${profileUid}/${file.name}`
        );
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Error uploading file:", error);
            setUploading(false);
          },
          async () => {
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setProfile((prev) => ({
              ...prev,
              photoURL: downloadURL,
            }));

            // Log cuando la imagen ya está almacenada
            console.log("Imagen almacenada correctamente. URL:", downloadURL);

            // Guardar la URL de la foto en la base de datos
            await setDoc(
              doc(db, "users", profileUid),
              { photoURL: downloadURL },
              { merge: true }
            );

            // Llamar a handleSaveProfile para actualizar el perfil
            await handleSaveProfile(downloadURL);

            setUploading(false);
          }
        );
      } catch (error) {
        console.error("Error handling file upload:", error);
        setUploading(false);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <HeroScreen
        titulo="Perfil"
        descripcion="Administra la información de tu perfil."
        imagen={profile.photoURL}
      />

      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
                mb: isMobile ? 2 : 0,
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
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
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

              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Tareas
              </Typography>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body1">
                  No tienes tareas asignadas.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Profile;
