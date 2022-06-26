import React, { useMemo } from "react";
import { Typography, Stack, Button } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = useMemo(() => {
    return [
      {
        id: 1,
        icon: BodyPartImage,
        name: bodyPart,
      },
      {
        id: 2,
        icon: TargetImage,
        name: target,
      },
      {
        id: 3,
        icon: EquipmentImage,
        name: equipment,
      },
    ];
  }, [bodyPart, equipment, target]);

  const renderExtraDetail = extraDetail.map((extraDetail) => {
    return (
      <Stack
        key={extraDetail.id}
        direction="row"
        gap="24px"
        alignItems="center"
      >
        <Button
          sx={{
            background: "#fff2db",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
          }}
        >
          <img
            src={extraDetail.icon}
            alt={extraDetail.name}
            style={{ width: "50px", height: "50px" }}
          ></img>
        </Button>
        <Typography variant="h5" textTransform="capitalize">
          {extraDetail.name}
        </Typography>
      </Stack>
    );
  });

  return (
    // by default flexDirection is set to column
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img src={gifUrl} loading="lazy" alt={name} className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h6">
          Exercises keep you strong. {name} {` `}
          is one of the best exercises to target your {target}. It will help you
          imporve your mood and gain energy
        </Typography>
        {renderExtraDetail}
      </Stack>
    </Stack>
  );
};

export default Detail;
