import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import styled from 'styled-components';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import login from '../img/login.png'

const LoginSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered successfully');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <CenteredContainer>
      <ContentContainer>
        <div className="left">
          <img src={login} alt="Login/SignUp" />
        </div>
        <div className="right">
          <h1>Hello, Welcome!</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="buttons">
              <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </div>
          </form>
          <div className="toggle">
            {isLogin ? (
              <p>
                Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            ) : (
              <p>
                Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
              </p>
            )}
          </div>
          {error && <p>{error}</p>}
        </div>
      </ContentContainer>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100vh;
  background-color: #f0f0f0; /* optional background color */
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: stretch; /* Stretch items to match height */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  height: 500px;
  position: relative;

  .left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    img {
      max-width: 100%;
      height: auto;
      object-fit: cover; /* Ensure the image covers the container */
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    h1 {
      margin-bottom: 2rem;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      input {
        padding: 1rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
      }
      .buttons {
        display: flex;
        justify-content: center;
      }
      button {
        padding: 1rem;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.3s;
        background: ${props => props.isLogin ? '#007bff' : '#28a745'};
        color: white;
        &:hover {
          background: ${props => props.isLogin ? '#0056b3' : '#218838'};
        }
      }
    }
    .toggle {
      margin-top: 1rem;
      span {
        color: blue;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    p {
      color: red;
      margin-top: 1rem;
  }
}
`;


export default LoginSignUp;
