import React, { useState, useEffect, useRef } from "react";

//  Textfield => input field
import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import fetchData, { exerciseOptions } from "../util/fetchData";
import GetOrFetch from "../util/GetOrFetch"; // For localstorage

const SearchExercises = ({
  setExercises,
  selectedBodyPart,
  setSelectedBodyPart,
}) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const inputRef = useRef();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearch = async (event, searchTerm) => {
    if (searchTerm || search) {
      const exercisesData = await fetchData(
        // we can also search for categories
        "https://exercisedb.p.rapidapi.com/exercises", // all the available exercises
        exerciseOptions
      );
      const searchedData = exercisesData.filter((exercise) => {
        // Search Algorithm
        return (
          exercise.name.toLowerCase().includes(searchTerm || search) ||
          exercise.target.toLowerCase().includes(searchTerm || search) ||
          exercise.equipment.toLowerCase().includes(searchTerm || search) ||
          exercise.bodyPart.toLowerCase().includes(searchTerm || search)
        );
      });
      setSearch(""); // clear the input
      setExercises(searchedData);
    }
  };

  useEffect(() => {
    // * THE PROBLEM WITH THAT IS: THE STATE INSIDE THE FUNCTION WILL NOT CHANGE
    //  * INSIDE NATIVE DOM EVENT LISTENER
    // * TO work around THAT problem:  useRef so we have an active reference
    // *  to the input element
    function handleSubmitWithMeta(event) {
      if (event.key === "Enter") {
        handleSearch(event, inputRef.current.value);
      }
    }

    //  => DONT WORK WITH NATIVE DOM METHODS like addEventListener
    document.addEventListener("keydown", handleSubmitWithMeta);

    // use saveAndCheck
    // provide it the function to fetch the data which returns the data we want

    //  This function will be called if the items under the name we're not found in the localStorage
    //  thereupon save the data from the api request in the localstorage and simultaneously return it to save state
    const fetchExercisesData = async () => {
      const response = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      const bodyPartsData = await response.json();
      return bodyPartsData;
    };
    GetOrFetch("bodyParts", fetchExercisesData).then((exerciseData) => {
      setBodyParts(["all", ...exerciseData]);
    });

    return () => {
      document.removeEventListener("keydown", handleSubmitWithMeta);
    };
  }, []);

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should know
      </Typography>
      <Box position="relative" mb="72px">
        {/* Controlled Component */}
        <TextField
          height="76px"
          value={search}
          onChange={handleChange}
          placeholder="Search Exercises"
          type="text"
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          inputRef={inputRef}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "white",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: 0,
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          isBodyParts={true}
          data={bodyParts}
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
