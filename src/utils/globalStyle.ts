import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #fefefe;
    color: #333;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    margin: 0;
    button {
      cursor: pointer;
      padding: 0.5rem 2rem;
      width: 150px;
    }
  }
`;

export const StyledNavLogoLink = styled.div`
  textdecoration: 'none';
  color: '#3A1212';
  borderbottom: '3px solid #FF2625';
  img {
    width: '48px';
    height: '48px';
    margin: '0 20px';
  }
`;

export default GlobalStyle;
