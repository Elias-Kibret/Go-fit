import React from 'react';
import styled from 'styled-components';
import Hero from '../assets/images/bycle.png';
// import { Link } from 'react-router-dom';
// import useAuth from '../utils/useAuth';
const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 3rem;
  div {
    @media (min-width: 700px) {
      width: 50%;
      p {
        font-size: 3rem;
      }
    }
    p {
      text-transform: uppercase;
      font-weight: 800;
      color: #f88740;
      border-left: 10px solid black;
      padding: 0px 20px;
      font-size: 2.3rem;
    }
    span {
      color: #413d3d;
    }
  }
`;
const ImageWrapper = styled.div`
  filter: drop-shadow(0 -1mm 10mm rgb(206, 196, 210));
  width: 500px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
function Home() {
  // const { isAuthenticated } = useAuth();

  return (
    <main>
      {/* <p>
        home page display here
        {!isAuthenticated && (
          <span>
            Do you need to <Link to="/signin">sign in</Link> or <Link to="/signup">sign up</Link>?
          </span>
        )}
      </p> */}
      <Wrapper>
        <div>
          <p>Work hard to become strong</p>
          <span>
            since what we do with our bodies also affects what we can do with our minds, fitness influences to some
            degree qualities such as mental alertness and emotional stability.
          </span>
        </div>
        <ImageWrapper>
          <img src={Hero} alt="" />
        </ImageWrapper>
      </Wrapper>
    </main>
  );
}

export default Home;
