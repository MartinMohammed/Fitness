import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

// OWN UTILITIES
import fetchData, { exerciseOptions } from "../util/fetchData";

// OWN COMPONENTS
import ExerciseCard from "./ExerciseCard";

// CONSTANTS
const EXERCISES_PER_PAGE = 9;

// ---------- GET US DIFFERENT EXERCISES DEPENDING ON THE SELECTED_BODY_PART
const Exercises = ({ exercises, setExercises, selectedBodyPart }) => {
  // STATE
  const [currentPage, setCurrentPage] = useState(1);

  /* // * Dynamically determine the interval[start, end] of exercises we're currently on
  If currentPage = 2 : 2 * 9 = 18 is the last exerciseCard we render
  18 - 9 = 8 is the first exerciseCard we render
  [8, 18] = 9 Cards we render : currentExercises
  */

  const indexOfLastExercise = currentPage * EXERCISES_PER_PAGE;
  const indexOffFirstExercise = indexOfLastExercise - EXERCISES_PER_PAGE;
  const currentExercises = exercises.slice(
    indexOffFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    // event from the event Listener
    //  and the value of the page we're currently click on - behind the scenes by material ui
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exerciseData = [];

      // FETCH ALL AVAILABLE EXERCISES DATA IN THE API (1320)
      if (selectedBodyPart === "all") {
        exerciseData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
        // FETCH ONLY THE EXERCISES FOR THE PARTICUALR BODY PART
      } else {
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
          exerciseOptions
        );
        setExercises(exerciseData);
      }
    };

    fetchExercisesData();
  }, [selectedBodyPart]);

  const renderExercisesList = currentExercises.map((exerciseItem, index) => {
    return <ExerciseCard exerciseItem={exerciseItem} key={index} />;
  });
  return (
    <Box
      id="exercises"
      sx={{ mt: { lg: "110px" } }}
      /* What is usually set */
      mt="50px"
      p="20px"
    >
      {renderExercisesList.length > 0 && (
        <Typography variant="h3" mb="46px">
          Showing Results
        </Typography>
      )}

      <Stack
        direction="row"
        sx={{
          gap: { lg: "110px", xs: "50px" },
        }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {renderExercisesList}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > EXERCISES_PER_PAGE && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            page={currentPage}
            size="large"
            onChange={paginate}
            count={Math.ceil(exercises.length / EXERCISES_PER_PAGE)}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
