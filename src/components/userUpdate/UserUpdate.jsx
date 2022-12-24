import { Button, Grid, InputLabel, TextField } from '@mui/material';
import React from 'react';
import './userUpdate.scss';
// import SideBar from '../sideBar/SideBar';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteUserApi, editUserApi, getUserApi } from '../../utils/api';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { ToastContainer, toast } from 'react-toastify';
import Meta from '../../utils/Meta';

export default function UserUpdate() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [oldImage, setOldImage] = useState();

  const navigate = useNavigate();
  const params = useParams();

  const uploadImg = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setOldImage(reader.result);
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uHandler = async () => {
    try {
      await axios.put(`${editUserApi}/${params.id}`, {
        username,
        email,
        password,
        userId: user._id,
        avatar: file,
      });

      navigate('/');
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

  const deleteHandler = async () => {
    await axios.delete(`${deleteUserApi}/${params.id}`, {
      data: {
        userId: user._id,
      },
    });
    navigate('/login');
  };

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get(`${getUserApi}/${params.id}`);
      setUser(data);
      setUsername(data.username);
      setEmail(data.email);
      setOldImage(data.avatar.url);
    }
    getUser();
  }, [params.id]);
  return (
    <>
      <Meta title={'update user'} />
      <div className="update container d-flex justify-content-center">
        <div className="u_main d-flex flex-column">
          <h1 className="title">Update your account</h1>
          <div className="user_info d-flex justify-content-between">
            <div className="user ">
              <img src={oldImage} alt="" />
            </div>
            <div className="d-flex flex-column">
              <Button
                className="d_btn"
                onClick={() => {
                  deleteHandler();
                }}
              >
                Delete account
              </Button>
              <div className="i_btn d-flex justify-content-center align-items-center">
                <label htmlFor="bl_img">
                  Choose image <ImageIcon />
                </label>
                <input
                  type="file"
                  id="bl_img"
                  style={{ display: 'none' }}
                  onChange={(e) => uploadImg(e)}
                />
              </div>
            </div>
          </div>
          <div className="u_grid flex-grow-1">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="username">username</InputLabel>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="email">email</InputLabel>

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="password">password</InputLabel>

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <div className="u_btn">
              <Button variant="contained" onClick={() => uHandler()}>
                Update
              </Button>
            </div>
          </div>
        </div>
        {/* <SideBar /> */}
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
