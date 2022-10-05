import React from 'react';
import useAuth from '../utils/useAuth';

function Profile() {
  const userData = useAuth();

  return (
    <main>
      <h2>Profile</h2>
      <p>This page is accessible by authenticated users; admin access is not required.</p>
      <section>
        <strong>Authenticated user data:</strong>
        <code>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </code>
      </section>
      <p>empty</p>
    </main>
  );
}
export default Profile;
