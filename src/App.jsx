import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material"; // div with shading and colors

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";

const App = () => {
  return (
    // On extra large devices - responsive design
    <Box width="400px" sx={{ width: { xl: "100%" } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/exercise/:id" element={<ExerciseDetail />}></Route>
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
