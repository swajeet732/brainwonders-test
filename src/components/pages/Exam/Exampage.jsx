import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions from the API
    axios
      .get("/api-json/api.response.json")
      .then((response) => {
        const { questions } = response.data;
        setQuestions(questions);
        setAnswers(new Array(questions.length).fill(null));

        // Save questions to localStorage
        localStorage.setItem('questions', JSON.stringify(questions));
      })
      .catch(() => {
        setError("Error fetching questions.");
      });

    // Load answers from localStorage (if already submitted)
    const savedAnswers = JSON.parse(localStorage.getItem('answers'));
    if (savedAnswers) {
      setAnswers(savedAnswers);
      setSubmitted(true);
    }
  }, []);

  const handleAnswerChange = (index, event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Save answers to localStorage
    localStorage.setItem('answers', JSON.stringify(answers));

    setSubmitted(true);
    console.log("Submitted answers:", answers);
    navigate("/report")
  };


  

  return (


    <Container className="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
     // Add background color
        padding: 0, // Optional, to ensure no padding around the container
      }}
    >
      <Box
        sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
         
        </Typography>

        <Paper
          sx={{
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            width: "800px",
            marginTop: "900px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form>
            {questions.map((question, index) => (
              <Card
                key={index}
                sx={{ marginBottom: 3, boxShadow: 2, borderRadius: 2 }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {question.question}
                  </Typography>
                  <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                    <RadioGroup
                      name={`question-${index}`}
                      value={answers[index] || ""}
                      onChange={(e) => handleAnswerChange(index, e)}
                    >
                      {question.options.map((option, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={option}
                          control={<Radio />}
                          label={option}
                          sx={{ marginBottom: 1 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            ))}
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  padding: "12px 30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Paper>

        {submitted && (
          <Box sx={{ marginTop: 4, marginLeft:'100px' }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Submitted Answers
            </Typography>
            <Paper sx={{ padding: 2, boxShadow: 2, borderRadius: 2 }}>
              <Box component="ul" sx={{ paddingLeft: 2 }}>
                {answers.map((answer, index) => (
                  <Box component="li" key={index} sx={{ marginBottom: 2 }}>
                    <Typography sx={{ color: "#555" }}>
                      Question {index + 1}: {answer || "No answer selected"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>

    
  );
};

export default ExamPage;
