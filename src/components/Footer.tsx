import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #2a8572;
  color: #fefefe;
  padding: 0.4rem 0;
  text-align: center;
  bottom: 0;
  font-size: 0.8rem;
  width: 100%;
  overflow: hidden !important;
`;

function Footer() {
  return <FooterWrapper>Sisay © {new Date().getFullYear()}</FooterWrapper>;
}

export default Footer;
