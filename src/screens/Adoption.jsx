import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { AppContext } from "../context/AppContext";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import imgOk from "../assets/imgLogo.png";
const Adoption = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    saveFormAdoptionAswered({});
    setAnswerNumber(0);
    setCurrentQuestionIndex(0);
    navigate("/adoptions");
  };

  const {
    petId,
    petName,
    petPhotoUrl,
    formAdoption,
    formAdoptionAswered,
    saveFormAdoptionAswered,
    answerNumber,
    setAnswerNumber,
  } = useContext(AppContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (questionId, answer) => {
    saveFormAdoptionAswered((prev) => ({
      ...prev,
      respuestas: [
        ...prev.respuestas.filter((res) => res.preguntaId !== questionId),
        { preguntaId: questionId, respuesta: answer },
      ],
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < formAdoption.preguntas.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswerNumber((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswerNumber((prev) => prev - 1);
    }
  };

  const currentQuestion = formAdoption.preguntas[currentQuestionIndex];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "#f5f5f5",
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Por favor completa el siguiente formulario para adoptar a {petName} 🐾
      </Typography>
      {answerNumber + 1 == formAdoption.preguntas.length ? (
        <img
          src={imgOk}
          alt={petName}
          onClick={handleCancel}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            marginBottom: "16px",
          }}
        />
      ) : (
        <img
          src={petPhotoUrl}
          alt={petName}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            marginBottom: "16px",
          }}
        />
      )}

      <Typography variant="h6" gutterBottom>
        {answerNumber} / {formAdoption.preguntas.length}
      </Typography>
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <Button
        variant="outlined"
        color="error"
        onClick={handleCancel}
        sx={{ mt: 2 }}
      >
        Cancelar
      </Button>
    </Box>
  );
};

export default Adoption;
