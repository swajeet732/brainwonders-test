import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Instruction.css"; // Import the external CSS file

const InstructionPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleProceed = () => {
    console.log("Proceed button clicked"); // Check if this logs to the console
    navigate("/exam"); // Navigate to the /exam page
  };

  return (
    <div className="background-container">
      <Box className="content">
        <Paper elevation={3} className="form-paper">
          <Typography variant="h3" component="h1" className="header-text">
            Instruction Page
          </Typography>

          <div className="instructions-box">
            <Typography variant="h6" className="instruction-text">
              Congratulations! You have successfully registered. Please follow
              the instructions below:
            </Typography>
            <ul className="instruction-list">
              <li>Read all the instructions carefully before starting the exam.</li>
              <li>Select only one option for each question.</li>
              <li>Once you are ready, click "Proceed" to begin the exam.</li>
            </ul>
          </div>

          {/* Proceed Button */}
          <Box className="proceed-btn-container" display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProceed}
              className="proceed-button"
            >
              Proceed
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default InstructionPage;
