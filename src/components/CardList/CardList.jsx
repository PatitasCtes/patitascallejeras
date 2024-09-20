import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Card from "../Card/Card";
import { getRandomEmoji } from "../../utils/getRandomEmoji";

const CardList = ({ tasks, onDelete, onEdit }) => {
  return (
    <Container>
      <Box sx={{ maxHeight: "80vh", overflowY: "auto", padding: 2 }}>
        {tasks.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              {getRandomEmoji()}
            </Typography>
          </Box>
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
