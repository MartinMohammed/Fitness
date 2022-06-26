import React from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../util/fetchData";

import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, selectedBodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  /* // * Dynamically determine the interval[start, end] of exercises we're currently on
  If currentPage = 2 : 2 * 9 = 18 is the last exerciseCard we render
  18 - 9 = 8 is the first exerciseCard we render
  [8, 18] = 9 Cards we render : currentExercises
  */

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOffFirstExercise = indexOfLastExercise - exercisesPerPage;
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
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
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
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            page={currentPage}
            size="large"
            onChange={paginate}
            count={Math.ceil(exercises.length / exercisesPerPage)}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
