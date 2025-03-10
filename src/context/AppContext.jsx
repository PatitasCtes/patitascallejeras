import React, { createContext, useState, useEffect } from "react";
import { fetchForm } from "../api/api";

// Crear el contexto
export const AppContext = createContext();

// Crear el proveedor del contexto
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado de ejemplo
  const [petId, setPetId] = useState(null);
  const [petName, setpetName] = useState(null);
  const [petPhotoUrl, setpetPhotoUrl] = useState(null);
  const [formAdoption, setformAdoption] = useState(null); // Inicializar como null
  const [answerNumber, setAnswerNumber] = useState(0); // Inicializar como null
  const [formAdoptionAswered, setFormAdoptionAswered] = useState(
    initialFormAdoptionAswered
  ); // Inicializar como null
  useEffect(() => {
    // Cargar los datos de adopción
    const loadFormAdoption = async () => {
      try {
        const data = await fetchForm("adopcion"); // Resuelve la promesa
        setformAdoption(data); // Almacena el objeto completo en el estado
      } catch (error) {
        console.error("Error fetching adoption form:", error);
      }
    };

    loadFormAdoption();
  }, []); // Se ejecuta solo una vez al montar el componente

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const savePetId = (id) => {
    setPetId(id);
  };

  const savePetName = (name) => {
    setpetName(name);
  };

  const savePetPhotoUrl = (url) => {
    setpetPhotoUrl(url);
  };

  const saveFormAdoption = (data) => {
    setformAdoption(data);
  };

  const saveFormAdoptionAswered = (data) => {
    setFormAdoptionAswered(data);
  };
  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        petId,
        petName,
        petPhotoUrl,
        savePetId,
        savePetName,
        savePetPhotoUrl,
        formAdoption,
        saveFormAdoption,
        formAdoptionAswered,
        saveFormAdoptionAswered,
        answerNumber,
        setAnswerNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const initialFormAdoptionAswered = {
  tipo: "adopcion",
  PetId: "44444",
  PetName: "Freya",
  PetPhotoUrl: "http://example.com/images/rex.jpg",
  respuestas: [
    {
      preguntaId: 1,
      respuesta: "correo@ejemplo.com",
    },
    {
      preguntaId: 2,
      respuesta: "Para mi familia",
    },
    {
      preguntaId: 3,
      respuesta: "SOTA Pérez",
    },
    {
      preguntaId: 4,
      respuesta: "12345678",
    },
    {
      preguntaId: 5,
      respuesta: "http://instagram.com/juanperez",
    },
    {
      preguntaId: 6,
      respuesta: "30",
    },
    {
      preguntaId: 7,
      respuesta: "Calle FRESITA 123",
    },
    {
      preguntaId: 8,
      respuesta: "123456789",
    },
    {
      preguntaId: 9,
      respuesta: "987654321",
    },
    {
      preguntaId: 10,
      respuesta: ["Estudiante", "Independiente"],
    },
    {
      preguntaId: 11,
      respuesta: ["Pareja", "Hijos mayores de 12 años"],
    },
    {
      preguntaId: 12,
      respuesta: ["Perros", "Gatos"],
    },
    {
      preguntaId: 13,
      respuesta: "987654321",
    },
    {
      preguntaId: 14,
      respuesta: "Sí",
    },
    {
      preguntaId: 15,
      respuesta: "Propio",
    },
    {
      preguntaId: 16,
      respuesta: ["Paseos", "Educar y enseñar", "Jugar"],
    },
    {
      preguntaId: 17,
      respuesta: "Adentro, en una PILETA",
    },
    {
      preguntaId: 18,
      respuesta: "2",
    },
    {
      preguntaId: 19,
      respuesta: "Lo dejaría con un amigo de un amigo de confianza",
    },
    {
      preguntaId: 20,
      respuesta: "Sí",
    },
    {
      preguntaId: 21,
      respuesta: "Pipetas antipulgas",
    },
    {
      preguntaId: 22,
      respuesta: "Croquetas de marca X",
    },
    {
      preguntaId: 23,
      respuesta: "Sí",
    },
    {
      preguntaId: 24,
      respuesta: ["Veterinario particular", "Jornada a bajo costo"],
    },
    {
      preguntaId: 25,
      respuesta: "5 a 6 meses",
    },
    {
      preguntaId: 26,
      respuesta: "Abogado",
    },
    {
      preguntaId: 27,
      respuesta: "Oficina ABC, Calle Ficticia 456",
    },
    {
      preguntaId: 28,
      respuesta: "No, no estoy interesado en un animal específico",
    },
    {
      preguntaId: 29,
      respuesta:
        "Me gustaría adoptar porque quiero darle un hogar a un animal necesitado.",
    },
    {
      preguntaId: 30,
      respuesta: true,
    },
  ],
};
