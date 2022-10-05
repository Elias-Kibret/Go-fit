import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../utils/useAuth';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      <p>
        home page display here
        {!isAuthenticated && (
          <span>
            Do you need to <Link to="/signin">sign in</Link> or <Link to="/signup">sign up</Link>?
          </span>
        )}
      </p>
    </main>
  );
}

export default Home;
