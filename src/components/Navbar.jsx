import React from "react";
import { Link } from "react-router-dom";

/*
  The stack component manages layout of immediate
  children along the vertical or horizontal axis
  with optional spacing and/ or dividers between each child

  * IN SHORT: a optimized flex-box wraper
*/
import { Stack } from "@mui/material";

// Assets
import LogoImage from "../assets/images/Logo.png";

// Styled Components
import NavLink from "./StyledComponents/NavLink";
import Logo from "./StyledComponents/Logo";
import AnchorLink from "./StyledComponents/AnchorLink";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="none"
      // gap is changing its size depnding on the device
      sx={{
        gap: { sm: "122px", xs: "40px; " },
        mt: { sm: "32px", xs: "20px" },
      }}
      px="20px"
    >
      <Link to="/">
        <Logo src={LogoImage} alt="Logo" />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <NavLink to="/">Home</NavLink>
        <AnchorLink href="#exercises">Exercises</AnchorLink>
      </Stack>
    </Stack>
  );
};

export default Navbar;
