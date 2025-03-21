import React, { createContext, useState, useEffect } from "react";
import { fetchForm, fetchForms, fetchPetsByCriteria } from "../api/api"; // Importar fetchForms y fetchPetsByCriteria

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [petId, setPetId] = useState(null);
    const [petName, setpetName] = useState(null);
    const [petPhotoUrl, setpetPhotoUrl] = useState(null);
    const [formAdoption, setformAdoption] = useState(null);
    const [answerNumber, setAnswerNumber] = useState(0);
    const [formAdoptionAswered, setFormAdoptionAswered] = useState(initialFormAdoptionAswered);
    const [formsData, setFormsData] = useState({ forms: [], pets: [] }); // Nuevo estado para formularios y mascotas

    useEffect(() => {
        const loadFormAdoption = async () => {
            try {
                const data = await fetchForm("adopcion");
                setformAdoption(data);
            } catch (error) {
                console.error("Error fetching adoption form:", error);
            }
        };

        loadFormAdoption();
        loadInitialData(); // Cargar datos iniciales
    }, []);

    const loadInitialData = async () => {
        try {
            const [forms, pets] = await Promise.all([
                fetchForms(),
                fetchPetsByCriteria({ status: "Disponible" })
            ]);
            setFormsData({ forms, pets });
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
    };

    const updateFormsData = (newData) => {
        setFormsData(newData);
    };

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
                formsData, // Agregar formsData al contexto
                updateFormsData, // Agregar updateFormsData al contexto
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
    },
    {
      preguntaId: 2,
    },
    {
      preguntaId: 3,
    },
    {
      preguntaId: 4,
    },
    {
      preguntaId: 5,
    },
    {
      preguntaId: 6,
    },
    {
      preguntaId: 7,
    },
    {
      preguntaId: 8,
    },
    {
      preguntaId: 9,
    },
    {
      preguntaId: 10,
    },
    {
      preguntaId: 11,
    },
    {
      preguntaId: 12,
    },
    {
      preguntaId: 13,
    },
    {
      preguntaId: 14,
    },
    {
      preguntaId: 15,
    },
    {
      preguntaId: 16,
    },
    {
      preguntaId: 17,
    },
    {
      preguntaId: 18,
    },
    {
      preguntaId: 19,
    },
    {
      preguntaId: 20,
    },
    {
      preguntaId: 21,
    },
    {
      preguntaId: 22,
    },
    {
      preguntaId: 23,
    },
    {
      preguntaId: 24,
    },
    {
      preguntaId: 25,
    },
    {
      preguntaId: 26,
    },
    {
      preguntaId: 27,
    },
    {
      preguntaId: 28,
    },
    {
      preguntaId: 29,
    },
    {
      preguntaId: 30,
      respuesta: false,
    },
  ],
};
