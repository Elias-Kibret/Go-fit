import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from '../utils/firebase';
import useAuth from '../utils/useAuth';
const Wrapper = styled.div`
  display: none !important;
  @media (min-width: 700px) {
    display: block !important;
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
  }
`;
function NavLinks() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default NavLinks;
