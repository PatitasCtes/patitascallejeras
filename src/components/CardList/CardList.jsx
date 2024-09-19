import React from "react";
import { Box, Container } from "@mui/material";
import Card from "../Card/Card";
import Sim from "../Sim/Sim";

const CardList = ({ tasks, onDelete, onEdit }) => {
  return (
    <Container>
      <Box sx={{ maxHeight: "80vh", overflowY: "auto", padding: 2 }}>
        {tasks.length === 0 ? (
          <Sim isFail={false} />
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default CardList;
