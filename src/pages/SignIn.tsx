import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../utils/reduxHooks';
import { signIn } from '../utils/firebase';
import { setAuthError } from '../store/userSlice';
import useAuth from '../utils/useAuth';
import useProfileRedirect from '../utils/useProfileRedirect';
import Error from '../components/Error';

const formDefaults = { email: '', password: '' };
const Wrapper = styled.div`
  overflow-x: hidden;
  display: flex;
  width: 80%;
  margin: 100px auto;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 700px) {
    flex-direction: row;
  }
  color: #2a8572;
  main {
    h2 {
      color: #0b846a;
      font-size: 2rem;
    }
    padding: 0px;
    margin: 0px;
    margin: auto;
    form {
      display: flex;
      flex-direction: column;
      label {
        display: block;
        margin-bottom: 9px;
        font-weight: 600;
        font-size: 0.9rem;
        input {
          display: block;
          padding: 10px 8px;
          max-width: 300px;
          min-width: 250px;
          margin: 5px 0px;
          border: none;
          border-radius: 8px;
          border: solid 1px lightgray;
          &:focus {
            outline: solid 1px lightblue;
          }
        }
      }
      button {
        background-color: #2a8572;
        border: none;
        color: white;
        font-weight: 700;
        border-radius: 20px;
        margin: 20px 0px;
        border: 1px solid #2a8572;
        &:hover {
          background-color: white;
          color: #2a8572;
        }
      }
    }
  }
`;
const ImageWrapper = styled.div``;
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
    <Wrapper>
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
      <ImageWrapper>
        <p>Hello</p>
      </ImageWrapper>
    </Wrapper>
  );
}
export default SignIn;
