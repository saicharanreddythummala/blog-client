import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import './writeBlog.scss';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import axios from 'axios';
import { createPostApi, getCategoriesApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Meta from '../../utils/Meta';

export default function WriteBlog() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  const submitHandler = async () => {
    try {
      const newPost = {
        username: user.username,
        title,
        desc,
        image: file,
        category,
      };

      await axios.post(createPostApi, newPost);

      navigate('/');
    } catch (error) {
      toast(error.response.data.error, {
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

  async function getCategories() {
    try {
      const { data } = await axios.get(getCategoriesApi);
      setCategories(data);
    } catch (error) {
      toast(error.response.data.error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }

  const uploadImg = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Meta title={'new post'} />
      <div className="write flex-grow-1 d-flex flex-column">
        {file ? (
          <div className="b_img">
            <img src={file} alt="" />
          </div>
        ) : null}

        <div className="d-flex justify-content-between flex-row-reverse mb-2 mt-2">
          <div id="cat_div">
            <FormControl>
              <InputLabel id="bl_img1">Category</InputLabel>
              <Select
                labelId="bl_img1"
                label="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="d-flex align-items-center">
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
        <div className="title">
          <TextField
            placeholder="title"
            variant="filled"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="t_area flex-grow-1">
          <textarea
            className="t_area-t"
            placeholder="please type your content here"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <Button
          variant="contained"
          className="p_button"
          onClick={() => {
            submitHandler();
          }}
        >
          Post
        </Button>
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
