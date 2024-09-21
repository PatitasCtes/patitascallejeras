import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router-dom"; // Importar useParams
import HeroScreen from "../components/HeroScreen/HeroScreen";
import Loader from "../components/Loader/Loader";
import ColumnContainer from "../components/ColumnContainer/ColumnContainer";
import imgSrc from "../assets/cartelera3.jpeg";
const Board = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [refreshColumns, setRefreshColumns] = useState(false); // Nuevo estado para refrescar columnas

  const fetchBoardDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${id}`
      );
      if (!response.ok) {
        throw new Error("Error fetching board details");
      }
      const data = await response.json();
      setBoard(data);
      localStorage.setItem("boardData", JSON.stringify(data));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching board details:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const storedBoard = localStorage.getItem("boardData");
      if (storedBoard) {
        setBoard(JSON.parse(storedBoard));
        setIsLoading(false);
      } else {
        fetchBoardDetails();
      }
    }
  }, []);

  const handleAdd = () => {
    setDialogOpen(true);
  };

  const handleCreateColumn = async () => {
    if (!newColumnName) return;

    let boardAct = JSON.parse(localStorage.getItem("boardData"));
    const newColumn = {
      id: boardAct.columns.length + newColumnName,
      name: newColumnName,
      tasks: [],
    };

    const updatedBoard = {
      ...board,
      columns: [...board.columns, newColumn],
    };

    try {
      const response = await fetch(
        `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBoard),
        }
      );

      if (response.ok) {
        setBoard(updatedBoard);
        localStorage.setItem("boardData", JSON.stringify(updatedBoard));
        setDialogOpen(false);
        setNewColumnName("");

        // Forzar recarga de columnas
        setRefreshColumns((prev) => !prev);
      } else {
        console.error("Error al agregar la columna:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar la columna:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Sim isFail={true} />
      ) : (
        <HeroScreen
          titulo={board?.name || "Tablero"}
          descripcion={board?.description || "Sin descripción"}
          imagen={imgSrc}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={handleAdd}
      >
        Agregar Columna
      </Button>

      {/* Pasar el estado para refrescar las columnas */}
      <ColumnContainer boardId={id} refresh={refreshColumns} />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Agregar Nueva Columna</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre de la columna"
            fullWidth
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateColumn} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Board;
