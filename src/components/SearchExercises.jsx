import React, { useState, useEffect, useRef } from "react";
//  Textfield => input field
import { Box, Stack, Button, TextField, Typography } from "@mui/material";

// OWN UTILITIES
import fetchData, { exerciseOptions } from "../util/fetchData";
import GetOrFetch from "../util/GetOrFetch"; // For localstorage

// COMPONENTS
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({
  setExercises,
  selectedBodyPart,
  setSelectedBodyPart,
}) => {
  // STATE
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  // REF
  const inputRef = useRef();

  // inputField / TextField
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // DO ACTUAL API REQUEST
  const handleSearch = async (_, searchTerm) => {
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
    /* * ! STATE DOES NOT UPDATE INSIDE OF A NATIVE DOM EVENT LISTENER FUNCTION
     * TO work around THAT problem:  useRef so we have an active reference
     *  to the input element
     */

    function handleSubmitWithMeta(event) {
      if (event.key === "Enter") {
        handleSearch(event, inputRef.current.value);
      }
      // Ignore
    }

    //  => DONT WORK WITH NATIVE DOM METHODS like addEventListener
    document.addEventListener("keydown", handleSubmitWithMeta);

    // INITIAL CATEGORIES: [All, "Back", ...]
    const fetchExercisesData = async () => {
      const response = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      const bodyPartsData = await response.json();
      return bodyPartsData;
    };

    // Params [0, 1] => First check for [0] in the localStorage else call [1] to save data as [0] in localStorage
    // and return it back so we can save it as state
    GetOrFetch("bodyParts", fetchExercisesData).then((exerciseData) => {
      setBodyParts(["all", ...exerciseData]);
    });

    // clean up function
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
