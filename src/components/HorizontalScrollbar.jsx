import React, { useContext } from "react";
import BodyPartCard from "./BodyPartCard";
import { Box, Typography } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import RightArrowIcon from "../assets/icons/right-arrow.png";

const HorizontalScrollbar = ({
  data,
  selectedBodyPart,
  setSelectedBodyPart,
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
        <BodyPartCard
          item={item}
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
        />
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
