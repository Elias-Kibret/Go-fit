import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

import Logo from '../assets/images/Logo.png';
import { StyledNavLogoLink } from '../utils/globalStyle';

function Navbar() {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{ gap: { sm: '122px', xs: '40px' }, marginTop: { sm: '32px', xs: '20px' }, justifyContent: 'none' }}
      px="20px"
    >
      <StyledNavLogoLink>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </StyledNavLogoLink>
      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <StyledNavLogoLink>
          <Link to="/">Home</Link>
        </StyledNavLogoLink>
        <StyledNavLogoLink>
          <Link to="/exercises">Exercises</Link>
        </StyledNavLogoLink>
      </Stack>
    </Stack>
  );
}

export default Navbar;
