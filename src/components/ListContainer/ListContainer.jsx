import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ColumnWithTasks from "../ColumnWithTasks/ColumnWithTasks";

const ListContainer = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColumns = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${boardId}`
        );
        const data = await response.json();
        setColumns(Array.isArray(data.columns) ? data.columns : []); // Asegúrate de que sea un array
      } catch (error) {
        console.error("Error al obtener las columnas:", error);
        setColumns([]); // Manejar error estableciendo un array vacío
      } finally {
        setLoading(false); // Finalizar carga
      }
    };

    fetchColumns();
  }, [boardId]);

  const fetchTasks = async (columnId) => {
    try {
      const response = await fetch(
        `https://taskban-task.netlify.app/.netlify/functions/server/tasks?boardId=${boardId}`
      );
      const data = await response.json();
      return Array.isArray(data) ? data : []; // Asegúrate de que sea un array
    } catch (error) {
      console.error(
        `Error al obtener tareas de la columna ${columnId}:`,
        error
      );
      return []; // Devuelve un array vacío en caso de error
    }
  };

  if (loading) {
    return <p>Cargando columnas...</p>; // Mensaje de carga
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      {columns.map((column) => (
        <ColumnWithTasks
          key={column.id}
          boardId={boardId}
          column={column}
          fetchTasks={fetchTasks}
        />
      ))}
    </Box>
  );
};

export default ListContainer;
