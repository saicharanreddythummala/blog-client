import {
  Button,
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
} from '@mui/material';
import React, { useState } from 'react';
import Meta from '../../utils/Meta';
import './contact.scss';
import axios from 'axios';
import { contactApi } from '../../utils/api';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const sendMessage = async () => {
    try {
      await axios.post(contactApi, { firstName, lastName, email, message });
      toast('message successfully sent!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/')
    } catch (err) {
      toast(err.response.data.error, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <>
      <Meta title={'contact'} />
      <Typography variant="h4" className="text-center mt-2">
        Contact us
      </Typography>
      <div className="contact_form flex-grow-1 d-flex justify-content-center p-4">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {' '}
            <TextField
              fullWidth
              label="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextareaAutosize
              id="msg_area"
              value={message}
              className="border border-1"
              onChange={(e) => setMessage(e.target.value)}
            ></TextareaAutosize>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              fullWidth
              className="logins"
              onClick={() => {
                sendMessage();
              }}
            >
              Send message
            </Button>
          </Grid>
        </Grid>
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
