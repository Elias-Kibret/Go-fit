import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BiMenu } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import NavLinks from './NavLinks';
import Logo from '../assets/images/Logo.png';
const HeaderWrapper = styled.header`
  overflow: hidden !important;
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  color: #ff731d;
  background-color: rgba(207, 255, 141, 0.4) !important;
  box-shadow: -1px 9px 59px -21px rgba(0, 0, 0, 0.31);
  -webkit-box-shadow: -1px 9px 59px -21px rgba(0, 0, 0, 0.31);
  -moz-box-shadow: -1px 9px 59px -21px rgba(0, 0, 0, 0.31);
  h1 {
    margin: 1rem 0;
  }
  a {
    color: #ff731d;
    text-decoration: none;
  }
  .logo {
    display: flex;
    align-items: center;
  }
  span {
    padding: 0 1rem;
  }
  nav {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 1.5rem;
    & > a {
      color: #fefefe;
      text-decoration: none;
    }
  }
`;
const MobileMenu = styled.div`
  color: #ff731d;
  @media (min-width: 700px) {
    display: none !important;
  }
`;
const NavWrapper = styled.nav`
  display: none !important;
  @media (min-width: 700px) {
    display: block !important;
  }
`;
function Header() {
  const [toggleMenu, setToggleMenu] = React.useState<boolean>(true);
  return (
    <HeaderWrapper>
      <nav>
        <div className="logo">
          <span>
            <img src={Logo} alt="Logo" />
          </span>
          <Link to="/">
            <h1>Go Fit</h1>
          </Link>
        </div>
        <NavWrapper>
          <NavLinks />
        </NavWrapper>
        <MobileMenu>
          {toggleMenu && (
            <BiMenu
              size={40}
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            />
          )}
          {!toggleMenu && (
            <ImCancelCircle
              size={40}
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            />
          )}
        </MobileMenu>
      </nav>
    </HeaderWrapper>
  );
}

export default Header;
