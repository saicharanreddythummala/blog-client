import React from 'react';
import './register.scss';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


export default function Register() {
  const { register } = useContext(UserContext);

  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="register card col col-lg col-md d-flex align-items-center border-0">
        <div className="card-body d-flex flex-column  align-self-center justify-content-center">
          <h1 className="card-title text-center">Register account</h1>
          <TextField
            label="username"
            variant="standard"
            className="mb-5"
            size="small"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="email"
            variant="standard"
            className="mb-5"
            size="small"
            name="email"
            email={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            type="password"
            variant="standard"
            className="mb-5"
            size="small"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            className="logins"
            onClick={() => register({ username, email, password })}
          >
            Create account
          </Button>
          <div className="m-2">
            <Button color="secondary" fullWidth onClick={()=>navigate('/login')}>
              Back to login
            </Button>
          </div>
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
    </>
  );
}
