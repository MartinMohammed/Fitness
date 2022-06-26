import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import LogoImage from "../assets/images/Logo-1.png";

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4">
      <Stack gap="40px" alignItems="center" px="40x" pt="24px">
        <img src={LogoImage} alt="Logo-1" width="200px" height="50px"></img>
        <Typography variant="h5" pb="40px" mt="20px">
          Made with ❤️ by Martin Mohammed. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
