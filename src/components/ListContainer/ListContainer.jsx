import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ColumnWithTasks from "../ColumnWithTasks/ColumnWithTasks";

const ListContainer = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("tu_api_endpoint");
        const data = await response.json();
        setTasks(data.tasks || []); // Asegúrate de que sea un array
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // En caso de error, establece un array vacío
      }
    };

    fetchTasks();
  }, [boardId]);

  const fetchTasks = async (columnId) => {
    try {
      const response = await fetch(
        `https://taskban-task.netlify.app/.netlify/functions/server/tasks?boardId=${boardId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Error al obtener tareas de la columna ${columnId}:`,
        error
      );
      return [];
    }
  };

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
