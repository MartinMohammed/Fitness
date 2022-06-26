import React, { useState } from "react";
import { Box } from "@mui/material";

// Components
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  // Changes in these states are going to be reflected all across our application
  // not just in the searchExercises but in the exercises itself

  // ! SHOULD USE REACT CONTEXT API
  // STATE
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        selectedBodyPart={selectedBodyPart}
        setSelectedBodyPart={setSelectedBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        selectedBodyPart={selectedBodyPart}
      />
    </Box>
  );
};

export default Home;
