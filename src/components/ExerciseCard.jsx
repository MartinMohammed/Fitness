import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exerciseItem }) => {
  console.log(exerciseItem.id, "jajsdjfj");
  return (
    // For later get more details for the particular exercise
    <Link className="exercise-card" to={`/exercise/${exerciseItem.id}`}>
      {/* Lazy loading  - not load immediately = not slowing down the website */}
      <img src={exerciseItem.gifUrl} alt={exerciseItem.name} loading="lazy" />
      <Stack direction="row">
        {/* Button only for a category - we could also use a Box with a typography within */}
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#ffa9a9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exerciseItem.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#fcc757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exerciseItem.target}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        mt="11px"
        fontSize="22px"
        pb="10px"
        textTransform="capitalize"
      >
        {exerciseItem.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
