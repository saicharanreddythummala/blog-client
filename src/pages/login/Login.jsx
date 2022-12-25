import React from 'react';
import { Typography, Button, TextField } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginHandler } = useContext(UserContext);

  const navigate = useNavigate();
  return (
    <>
      <div
        className="container-fluid flex-grow-1 d-flex justify-content-center align-items-center"
        id="login"
      >
        <div className="l_main d-flex flex-column justify-content-center">
          <div className="card-body d-flex flex-column justify-content-center">
            <h1 className="card-title text-center">Welcome back</h1>
            <p className="card-subititle text-center">
              Please enter your details
            </p>
            <div className="d-flex flex-column">
              <TextField
                id="username"
                label="Username"
                variant="standard"
                className="mb-5"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                className="mb-5"
                size="small"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                className="logins"
                onClick={() => {
                  loginHandler({ username, password });
                }}
              >
                Sign in
              </Button>
            </div>
          </div>
          <div className="l_btm m-2 d-flex justify-content-end">
            <Typography variant="subtitle-text">
              Not a member?
              <span id="sign_up" onClick={() => navigate('/sign-up')}>
                {' '}
                Sign up
              </span>
            </Typography>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
