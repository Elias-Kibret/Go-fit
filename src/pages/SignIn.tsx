import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../utils/reduxHooks';
import { signIn } from '../utils/firebase';
import { setAuthError } from '../store/userSlice';
import useAuth from '../utils/useAuth';
import useProfileRedirect from '../utils/useProfileRedirect';
import Error from '../components/Error';

const formDefaults = { email: '', password: '' };

function SignIn() {
  const dispatch = useAppDispatch();
  const { authError } = useAuth();
  const [formData, setFormData] = useState(formDefaults);
  const { email, password } = formData;
  useProfileRedirect();

  useEffect(() => {
    dispatch(setAuthError(''));
  }, [dispatch]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn({ email, password });
    setFormData(formDefaults);
  };

  return (
    <main>
      <h2>Sign In</h2>
      {authError && <Error message={authError} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              value={email}
              placeholder="Enter email address.."
              onChange={handleInputChange}
            />
          </label>
        </div>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="S3cr3tPW!"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>
        Need to register? <Link to="/signup">Sign up</Link> instead!
      </p>
    </main>
  );
}
export default SignIn;
