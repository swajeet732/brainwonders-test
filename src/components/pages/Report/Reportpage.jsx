import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button
} from "@mui/material";
import axios from "axios"; // Make sure axios is imported
import { useNavigate } from "react-router-dom"; 

const ReportPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Load questions from localStorage
    const savedQuestions = JSON.parse(localStorage.getItem("questions"));
    if (savedQuestions) {
      setQuestions(savedQuestions);
    } else {
      setQuestions([]); // Ensure it's initialized as an empty array if no data
    }

    // Load answers from localStorage
    const savedAnswers = JSON.parse(localStorage.getItem("answers"));
    if (savedAnswers) {
      setAnswers(savedAnswers);
    } else {
      setAnswers([]); // Ensure it's initialized as an empty array if no data
    }

    // Fetch correct answers from the API
    axios
      .get("/api-json/api.response.json") // Adjust API URL as needed
      .then((response) => {
        const correctAnswersData = response.data.questions.map(
          (question) => question.answer // Extract the 'answer' field from the API response
        );
        setCorrectAnswers(correctAnswersData || []); // Ensure it’s initialized as an empty array if no data
      })
      .catch((error) => {
        console.error("Error fetching correct answers:", error);
      });
  }, []);

  useEffect(() => {
    // Calculate score based on correct answers
    if (correctAnswers?.length > 0 && answers?.length > 0) {
      const calculatedScore = answers.reduce((score, answer, index) => {
        // Normalize both answers and compare them
        const userAnswer = answer.trim().toLowerCase(); // Normalize user answer
        const correctAnswer = correctAnswers[index]?.trim().toLowerCase(); // Normalize correct answer

        console.log(`Comparing: User answer: ${userAnswer}, Correct answer: ${correctAnswer}`); // Debugging

        // If answer matches, add 2 to the score
        return userAnswer === correctAnswer ? score + 2 : score;
      }, 0);
      setScore(calculatedScore);
    }
  }, [answers, correctAnswers]);

  return (
    <div className="main">
      <Container sx={{ padding: 4, width: "100%", justifyContent: "center", marginLeft: "175px" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 3 }}
        >
          Submitted Answers Report
        </Typography>

        <Paper sx={{ padding: 4, boxShadow: 3, borderRadius: 2 }}>
          {questions && answers && questions.length > 0 && answers.length > 0 ? (
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 3 }}
              >
                Your Score: {score} / {questions.length * 2}
              </Typography>

              <Divider sx={{ marginBottom: 3 }} />

              <Grid container spacing={3}>
                {questions.map((question, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#333" }}
                        >
                          {question?.question}
                        </Typography>
                        <Typography sx={{ color: "#555", marginTop: 1 }}>
                          Your Answer: {answers[index] || "No answer selected"}
                        </Typography>
                        <Typography sx={{ color: "#555", marginTop: 1 }}>
                          Correct Answer: {correctAnswers[index] || "Not available"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ marginTop: 3, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/thankyou")} // Use navigate to go back to the homepage
                >
                  Home
                </Button>
              </Box>
            </Box>
            
          ) : (
            <Typography>No data available</Typography>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default ReportPage;
