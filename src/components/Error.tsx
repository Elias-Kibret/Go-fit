import React from 'react';
import styled from 'styled-components';

const StyledError = styled.p`
  color: red;
  font-weight: 700;
`;

function Error({ message = 'An error occurred.' }: { message: string }) {
  let customMessage;

  switch (message) {
    case 'Firebase: Error (auth/wrong-password).':
      customMessage = 'Incorrect password!';
      break;
    case 'Firebase: Error (auth/user-not-found).':
      customMessage = 'User not found!';
      break;
    case 'Firebase: Error (auth/email-already-in-use).':
      customMessage = 'Email already in use!';
      break;
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      customMessage = 'Password must be at least 6 characters!';
      break;
    default:
      customMessage = message;
  }

  return <StyledError>{customMessage}</StyledError>;
}

export default Error;
