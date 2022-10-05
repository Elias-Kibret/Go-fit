import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #f0a514;
  color: #fefefe;
  padding: 1rem 0;
  text-align: center;
  bottom: 0;
  width: 100%;
  font-size: 30px;
`;

function Footer() {
  return <FooterWrapper>Sisay © {new Date().getFullYear()}</FooterWrapper>;
}

export default Footer;
