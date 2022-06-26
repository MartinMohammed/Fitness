import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../assets/icons/gym.png";

const BodyPartCard = ({ item, selectedBodyPart, setSelectedBodyPart }) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        // Highlight current selected item from the Horizontal Scrollbar
        borderTop: item === selectedBodyPart ? "4px solid #ff2625" : "",
        backgroundColor: "white",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px",
      }}
      onClick={(e) => {
        setSelectedBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img src={Icon} alt="dumbell" style={{ width: "40px", height: "40px" }} />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPartCard;
