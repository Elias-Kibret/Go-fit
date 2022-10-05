import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from '../utils/firebase';
import useAuth from '../utils/useAuth';

const HeaderWrapper = styled.header`
  align-items: center;
  background-color: #2a8572;
  color: #eef2e6;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  & > a {
    color: #fefefe;
    text-decoration: none;
  }
  h1 {
    margin: 1rem 0;
  }
  span {
    padding: 0 1rem;
  }
`;

const NavWrapper = styled.nav`
  ul {
    display: flex;
    list-style-type: none;
  }
  li {
    padding-left: 1.5rem;
    &:first-child {
      padding-left: 0;
    }
  }
  a {
    color: #fefefe;
    font-size: 1.25rem;
    font-weight: 700;
    text-decoration: none;
    &:hover {
      color: lightgrey;
    }
    &.active {
      color: #c6bbd5;
      font-style: italic;
    }
  }
`;

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <Link to="/">
        <h1>Phisical Exercise</h1>
      </Link>
      <NavWrapper>
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/signIn">Sign In</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <button type="button" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </NavWrapper>
    </HeaderWrapper>
  );
}

export default Header;
