import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ColumnWithTasks from "../ColumnWithTasks/ColumnWithTasks";
import TaskLoader from "../TaskLoader/TaskLoader";

const ColumnContainer = ({ boardId, refresh }) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBoardData = () => {
    setLoading(true);

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
  }, [boardId, refresh]); // Agregar `refresh` como dependencia para que se recarguen los datos

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
        overflowX: "auto",
        backgroundColor: "#7A5C8C",
        padding: 2,
      }}
    >
      {columns.map((column) => {
        const tasksForColumn = tasks.filter(
          (task) => task.columnId == column.id.toString()
        );

        return (
          <ColumnWithTasks
            key={column.id}
            column={column}
            boardId={boardId}
            tasks={tasksForColumn}
            reloadTasks={fetchBoardData}
          />
        );
      })}
    </Box>
  );
};

export default ColumnContainer;
