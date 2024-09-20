import React from "react";
import { Box, Typography } from "@mui/material";

const TaskList = ({ tasks }) => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Tareas
      </Typography>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No tienes tareas asignadas.</Typography>
      )}
    </Box>
  );
};

export default TaskList;
