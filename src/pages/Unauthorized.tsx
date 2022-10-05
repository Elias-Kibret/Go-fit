import React from 'react';
import { useLocation } from 'react-router-dom';

function Unauthorized() {
  const { pathname } = useLocation();

  return (
    <main>
      <h2>Unauthorized</h2>
      <h3>(admin access is required!)</h3>
      <p>
        Not authorized: Your account does not allow access to page &#39;
        {pathname}&#39;! Contact the site admin if you believe you have received this message in error.
      </p>
    </main>
  );
}

export default Unauthorized;
