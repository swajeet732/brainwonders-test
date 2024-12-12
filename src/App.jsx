import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/pages/Register/Register";
import InstructionPage from "./components/pages/Instruction/Instruction";
import ExamPage from "./components/pages/Exam/Exampage";
import ReportPage from "./components/pages/Report/Reportpage";
import ThankYouPage from "./components/pages/Thankyou/Thankyou";

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/instruction" element={<InstructionPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
       
      </Routes>
    </Router>
  );
};

export default App;