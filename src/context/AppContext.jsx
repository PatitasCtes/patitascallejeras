// src/context/AppContext.js
import React, { createContext, useState } from "react";

// Crear el contexto
export const AppContext = createContext();

// Crear el proveedor del contexto
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado de ejemplo
  const [petId, setPetId] = useState(null);
  const [petName, setpetName] = useState(null);
  const [petPhotoUrl, setpetPhotoUrl] = useState(null);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// export { AppContext, AppProvider };
