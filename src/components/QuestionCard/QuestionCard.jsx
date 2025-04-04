import React, { useState, useEffect } from "react";
import './QuestionCard.css';
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
} from "@mui/material";

const QuestionCard = ({ question, onAnswer, onNext, onPrevious }) => {
  const [answer, setAnswer] = useState(
    question.tipo === "opcion_multiple" ? [] : ""
  );
  const [alert, setAlert] = useState(false);
  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setAnswer((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleRadioChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleNext = () => {
    if (question.obligatoria && !answer) setAlert(true);
    else {
      setAlert(false);
      onAnswer(question.id, answer);
      let nextAnswer = onNext();
      if (!nextAnswer) {
        setAnswer(question.tipo === "opcion_multiple" ? [] : "");
      } else {
        setAnswer(nextAnswer);
      }
    }
  };

  const handlePrevious = () => {
    setAlert(false);
    let valuePrevious = onPrevious();
    setAnswer(valuePrevious);
  };

  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        maxHeight: 450, // Altura máxima para el scroll
        overflowY: "auto", // Scroll vertical si excede la altura
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {question.obligatoria && (
          <Typography variant="body1" color={"error"} mr={1}>
            *
          </Typography>
        )}
        {question.pregunta}
      </Typography>
      {alert && (
      <Typography variant="body1" color={"error"} gutterBottom className="tambalea">
        Pregunta obligatoria
      </Typography>
      )}
      {question.tipo === "texto" && (
        <TextField
          fullWidth
          label="Tu respuesta"
          value={answer}
          onChange={handleInputChange}
        />
      )}

      {question.tipo === "numero" && (
        <TextField
          fullWidth
          label="Tu respuesta"
          type="number"
          value={answer}
          onChange={handleInputChange}
        />
      )}

      {question.tipo === "opcion_unica" && (
        <Box
          sx={{
            padding: 1,
            border: "1px solid #e0e0e0",
            borderRadius: 1,
          }}
        >
          <RadioGroup value={answer} onChange={handleRadioChange}>
            {question.opciones.map((opcion, index) => (
              <FormControlLabel
                key={index}
                value={opcion}
                control={<Radio />}
                label={opcion}
              />
            ))}
          </RadioGroup>
        </Box>
      )}

      {question.tipo === "opcion_multiple" && (
        <Box>
          <FormGroup>
            {question.opciones.map((opcion, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={opcion}
                    checked={answer.includes(opcion)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={opcion}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handlePrevious}>
          Anterior
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionCard;
