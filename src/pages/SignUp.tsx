import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../utils/reduxHooks';
import { signUp } from '../utils/firebase';
import { setAuthError } from '../store/userSlice';
import useAuth from '../utils/useAuth';
import useProfileRedirect from '../utils/useProfileRedirect';
import Error from '../components/Error';
import physcial from '../assets/images/physcial.jpg';

const formDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  verifyPassword: '',
  isAdmin: false,
};
const Wrapper = styled.div`
  font-size: 0.8rem;
  width: 90%;
  max-width: 1280px;
  border: solid 1px white;
  box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
  -webkit-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
  -moz-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
  margin: 10px auto;
  background-color: #fcfbf4;
  display: flex;
  margin-bottom: 100px;
  justify-content: center;
  border-radius: 30px;
  overflow: hidden;
  flex-wrap: wrap-reverse;
  section {
    width: 50%;
    min-width: 400px;
    background-color: rgba(13, 132, 230, 0.3);
    overflow: hidden;
    .image {
      width: 350px;
      height: 350px;
      margin: auto;
      object-fit: contain;
      border-radius: 50%;
      display: flex;
      align-items: center;
      border: solid 1px white;
      box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
      -webkit-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
      -moz-box-shadow: -5px 16px 87px -32px rgba(0, 0, 0, 0.42);
      img {
        width: 350px;
        height: 350px;
        border-radius: 50%;
      }
    }
    h2 {
      text-align: center;
      width: 90%;
      margin: 45px auto;
      font-size: 2rem;
      color: #c3881c;
      text-transform: uppercase;
      text-shadow: 0px 3px 0 #78755a, 3px 13px 15px #aba8a8;
    }
  }
  main {
    margin: 10px auto;
    width: 40%;

    form {
      display: flex;
      margin-left: 50px;
      justify-content: center;
      flex-direction: column;
      label {
        display: block;
        margin-bottom: 9px;
        font-weight: 600;
      }
      .checkbox {
        input {
          display: inline-block;
          min-width: 20px !important;
          margin: 10px 0px;
        }
      }
      button {
        border-radius: 8px;
        border: 1px solid lightblue;
        background-color: blueviolet;
        color: white;
      }
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
  }
`;

function Signup() {
  const dispatch = useAppDispatch();
  const { authError } = useAuth();
  const [formData, setFormData] = useState(formDefaults);
  const { firstName, lastName, email, password, verifyPassword, isAdmin } = formData;
  useProfileRedirect();

  useEffect(() => {
    dispatch(setAuthError(''));
  }, [dispatch]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { verifyPassword, ...userData } = formData;

    if (password !== verifyPassword) {
      dispatch(setAuthError('Passwords do not match!'));
      setFormData({ ...formData, password: '', verifyPassword: '' });
    } else {
      await signUp(userData);
      setFormData(formDefaults);
    }
  };

  return (
    <Wrapper>
      <section>
        <h2>Get stronger with us.</h2>
        <div className="image">
          <img src={physcial} alt="Physical fitness" />
        </div>
      </section>
      <main>
        <h2>Sign Up</h2>
        {authError && <Error message={authError} />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            First Name:
            <input
              id="firstName"
              type="firstName"
              name="firstName"
              value={firstName}
              placeholder="Jane"
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="lastName">
            Last Name:
            <input
              id="lastName"
              type="lastName"
              name="lastName"
              value={lastName}
              placeholder="Doe"
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="user@domain.com"
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="S3cr3tPW!"
              required
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="verifyPassword">
            Confirm Password:
            <input
              id="verifyPassword"
              type="password"
              name="verifyPassword"
              value={verifyPassword}
              placeholder="S3cr3tPW!"
              required
              onChange={handleInputChange}
            />
          </label>
          <span className="checkbox">
            <label htmlFor="isAdmin" className="checkbox">
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                value="true"
                checked={isAdmin}
                onChange={handleInputChange}
              />
              Set as admin
            </label>
          </span>
          <button type="submit">Submit</button>
        </form>
        <p>
          Already registered? <Link to="/signin">Sign in</Link> instead!
        </p>
      </main>
    </Wrapper>
  );
}
export default Signup;