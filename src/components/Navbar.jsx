import React from "react";
import { Link, useLocation } from "react-router-dom";

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
import AnchorLink from "./StyledComponents/AnchorLink";
import Logo from "./StyledComponents/Logo";

const Navbar = () => {
  const location = useLocation();
  return (
    <Stack
      direction="row"
      justifyContent="none"
      sx={{
        gap: { sm: "122px", xs: "40px; " },
        mt: { sm: "32px", xs: "20px" },
      }}
      px="20px"
    >
      {/* LOGO */}
      <Link to="/">
        <Logo src={LogoImage} alt="Logo" />
      </Link>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        {/* MAIN NAV */}
        <NavLink to="/">Home</NavLink>
        {/* Only the Home Page contains the "exercises" section */}
        {!location.pathname.includes === "/" && (
          <AnchorLink href="#exercises">Exercises</AnchorLink>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
