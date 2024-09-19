import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ColumnWithTasks from "../ColumnWithTasks/ColumnWithTasks";
import TaskLoader from "../TaskLoader/TaskLoader";

const ColumnContainer = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBoardData = () => {
    setLoading(true);

    // Obtener columnas
    fetch(
      `https://taskban-boards.netlify.app/.netlify/functions/server/boards/${boardId}`
    )
      .then((columnsResponse) => {
        if (!columnsResponse.ok) {
          throw new Error("Error al obtener columnas");
        }
        return columnsResponse.json();
      })
      .then((columnsData) => {
        setColumns(
          Array.isArray(columnsData.columns) ? columnsData.columns : []
        );

        // Obtener tareas
        return fetch(
          `https://taskban-task.netlify.app/.netlify/functions/server/tasks?boardId=${boardId}`
        );
      })
      .then((tasksResponse) => {
        if (!tasksResponse.ok) {
          throw new Error("Error al obtener tareas");
        }
        return tasksResponse.json();
      })
      .then((tasksData) => {
        setTasks(Array.isArray(tasksData) ? tasksData : []);
      })
      .catch((error) => {
        console.error("Error al obtener datos del tablero y tareas:", error);
        setColumns([]);
        setTasks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBoardData();
  }, [boardId]);

  if (loading) {
    return <TaskLoader />;
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
      {columns.map((column) => {
        // Filtrar las tareas que corresponden a esta columna
        const tasksForColumn = tasks.filter(
          (task) => task.columnId == column.id.toString()
        );

        return (
          <ColumnWithTasks
            key={column.id}
            column={column}
            boardId={boardId}
            tasks={tasksForColumn} // Pasar solo las tareas de esta columna
            reloadTasks={fetchBoardData} // Pasar la función de recarga
          />
        );
      })}
    </Box>
  );
};

export default ColumnContainer;
