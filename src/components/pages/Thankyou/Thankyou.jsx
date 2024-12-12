import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ThankYouPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle back button click
  const handleBack = () => {
    navigate("/register"); // Navigate back to the home or main page
  };

  return (
    <Container sx={{ padding: 4, textAlign: "center", marginLeft:'212px', }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Thank You for Completing the Exam!
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Your responses have been recorded successfully.
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
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
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ThankYouPage;
