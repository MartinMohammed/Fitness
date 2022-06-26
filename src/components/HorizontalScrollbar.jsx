import React, { useContext } from "react";
import BodyPartCard from "./BodyPartCard";
import { Box, Typography } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import ExerciseCard from "./ExerciseCard";

const HorizontalScrollbar = ({
  data,
  selectedBodyPart,
  setSelectedBodyPart,
  isBodyParts,
}) => {
  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
      <Typography onClick={() => scrollPrev()} className="right-arrow">
        <img src={LeftArrowIcon} alt="right-arrow" />
      </Typography>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return (
      <Typography onClick={() => scrollNext()} className="left-arrow">
        <img src={RightArrowIcon} alt="right-arrow" />
      </Typography>
    );
  };

  const renderItems = data.map((item) => {
    return (
      <Box
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
        m="0 40px"
      >
        {/* RENDERING DIFFERENT KINDS OF CARDS DEPENDING ON THE PURPOSE */}
        {isBodyParts ? (
          <BodyPartCard
            item={item}
            selectedBodyPart={selectedBodyPart}
            setSelectedBodyPart={setSelectedBodyPart}
          />
        ) : (
          <ExerciseCard exerciseItem={item} />
        )}
      </Box>
    );
  });

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {renderItems}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;
