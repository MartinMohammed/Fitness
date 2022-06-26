import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  const renderExerciseVideos = exerciseVideos
    ?.slice(0, 3)
    .map((exerciseVideo, index) => {
      const href = `https://www.youtube.com/watch?v=${exerciseVideo.video.videoId}`;
      return (
        <a
          key={index}
          href={href}
          className="exercise-video"
          traget="_blank"
          rel="noreferrer"
        >
          <img
            src={exerciseVideo.video.thumbnails[0].url}
            alt={exerciseVideo.video.title}
          ></img>
          <Box>
            <Typography variant="h6" color="black">
              {exerciseVideo.video.title}
            </Typography>
            <Typography variant="h7" color="black">
              {exerciseVideo.video.channelName}
            </Typography>
          </Box>
        </a>
      );
    });
  return (
    <Box sx={{ marginTop: { lg: "200px", xs: "20px" } }} p="20px">
      <Typography variant="h3" mb="33px">
        Watch{" "}
        <span style={{ color: "#ff2625", textTransform: "capitalize" }}>
          {name}
        </span>{" "}
        exercise videos
      </Typography>

      <Stack
        justifyContent="flex-start"
        flexWrap="wrap"
        alignItems="center"
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "110px", xs: "30px" } }}
      >
        {!renderExerciseVideos?.length ? "Loading..." : renderExerciseVideos}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
