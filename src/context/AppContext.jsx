// src/context/AppContext.js
import React, { createContext, useState } from "react";

// Crear el contexto
const AppContext = createContext();

// Crear el proveedor del contexto
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado de ejemplo
  const [petId, setPetId] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const savePetId = (id) => {
    setPetId(id);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, petId, savePetId }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
