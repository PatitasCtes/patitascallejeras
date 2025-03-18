import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { AppContext } from "../context/AppContext";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import imgOk from "../assets/imgLogo.png";

const Adoption = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const {
    petId,
    petName,
    petPhotoUrl,
    formAdoption,
    saveFormAdoptionAswered,
    answerNumber,
    setAnswerNumber,
  } = useContext(AppContext);

  // Verificar si petId no está definido y redirigir al Home
  useEffect(() => {
    if (!petId) {
      navigate("/");
    }
  }, [petId, navigate]);

  const handleCancel = () => {
    saveFormAdoptionAswered({});
    setAnswerNumber(0);
    setCurrentQuestionIndex(0);
    navigate("/adoptions");
  };

  const handleAnswer = (questionId, answer) => {
    saveFormAdoptionAswered((prev) => ({
      ...prev,
      PetId: petId,
      PetName: petName,
      PetPhotoUrl: petPhotoUrl,
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
    } else {
      setCurrentQuestionIndex(1);
      setAnswerNumber(1);
      navigate("/resume-adoption");
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
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontSize: { xs: "1.2rem", sm: "2rem" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        Por favor completa el siguiente formulario para adoptar a {petName} 🐾
      </Typography>
      {answerNumber + 1 === formAdoption.preguntas.length ? (
        <img
          src={imgOk}
          alt={petName}
          onClick={handleCancel}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
          }}
        />
      ) : (
        <img
          src={petPhotoUrl}
          alt={petName}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
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
