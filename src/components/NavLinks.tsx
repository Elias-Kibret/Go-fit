import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import styled from 'styled-components';
import useAuth from 'utils/useAuth';
// import { Stack } from '@mui/system';
import { signOut } from '../utils/firebase';
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
      color: #2a8572;
      font-size: 0.9rem;
      text-decoration: none;
      border: 1px solid #2a8572;
      padding: 8px 14px;
      border-radius: 20px;
      font-weight: 500;
      margin: 0px 10px;
      &:hover {
        color: white;
        background-color: #2a8572;
      }
      &.active {
        color: white;
        font-style: italic;
        background-color: #2a8572;
      }
    }
  }
  .profile {
    display: flex;
    align-items: center;
    margin-top: -10px;
    position: relative;
    button {
      border: none;
      position: absolute;
      top: 35px;
      right: 40px;
      font-size: 0.8rem;
      background-color: black;
      color: white;
      border-radius: 14px;
      padding: 4px 10px;
      &:hover {
        background: #055342;
        color: white;
      }
    }
  }
  .profilePhoto {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .signOut {
    color: black;
    margin-left: 5px;
  }
  .displayname {
    border: none;
    font-weight: bold;
    &:hover {
      background: none;
      color: #055342;
    }
    &.active {
      background: none;
      color: #055342;
    }
  }
`;
function NavLinks() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [displaySignOut, setDisplaySignOut] = React.useState<boolean>(false);

  const handleSignOut = async () => {
    await signOut();
    console.log('logout working');
    // !user
    navigate('/');
  };
  return (
    <Wrapper>
      <ul>
        {!user && (
          <>
            <li>
              <NavLink to="/signIn">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/exercises">Exercises</NavLink>
            </li>
            <li>
              <NavLink to="/previousWork">Previous Exercise</NavLink>
            </li>
            <div>
              <div className="profile">
                <NavLink className="displayname" to="/profile">
                  {user.displayName}
                  <AiFillCaretDown
                    className="signOut"
                    onClick={() => {
                      setDisplaySignOut(!displaySignOut);
                    }}
                  />
                </NavLink>
                {displaySignOut && (
                  <button type="button" onClick={handleSignOut}>
                    signout
                  </button>
                )}
                <div className="profilePhoto">
                  <img src={user?.photoURL! as string} alt="profile" />
                </div>
              </div>
            </div>
          </>
        )}
      </ul>
    </Wrapper>
  );
}

export default NavLinks;
