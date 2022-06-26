import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import fetchData, {
  exerciseOptions,
  youtubeOptions,
} from "../util/fetchData.js";

import Detail from "../components/Detail.jsx";
import ExerciseVideos from "../components/ExerciseVideos.jsx";
import SimilarExercises from "../components/SimilarExercises.jsx";

// RENDER EXERCISE DETAILS FOR A SPECIFIC CLICKED EXERCISE => BY /exercise/:id
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercisesData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDBUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      // FIRST API CALL FOR EXERCISE DATA
      const exerciseDetailData = await fetchData(
        `${exerciseDBUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      // SECOND API CALL FOR YOUTUBE VIDEOS FOR THE SINGULAR SPECIFIC EXERCISE
      const youtubeExercises = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );
      setExerciseVideos(youtubeExercises.contents);

      // THIRD API CALL FOR MORE EXERCISES FOR THE PARTICULAR MUSCLE GROUP
      const targetMuscleExercisesData = await fetchData(
        `${exerciseDBUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      setTargetMuscleExercises(targetMuscleExercisesData, exerciseOptions);

      // FOURTH API CALL FOR MORE EQUIPMENT
      const equipmentExercisesData = await fetchData(
        `${exerciseDBUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );

      setEquipmentExercisesData(equipmentExercisesData);
    };

    // fetchExerciseData is a memoized function => if id did not change return memoized
    // value instead of making a brand new api request
    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
