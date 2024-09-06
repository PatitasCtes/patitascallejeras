// StateCompo.jsx
import React, { useState } from "react";
import SavedContext from "./SavedContext";

const StateCompo = ({ children }) => {
  const [savedItemIds, setSavedItemIds] = useState([]);

  const guardarItem = (id) => {
    setSavedItemIds((prevIds) =>
      prevIds.includes(id) ? prevIds : [...prevIds, id]
    );
  };

  const eliminarItem = (id) => {
    setSavedItemIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
  };

  return (
    <SavedContext.Provider value={{ savedItemIds, guardarItem, eliminarItem }}>
      {children}
    </SavedContext.Provider>
  );
};

export default StateCompo;
