import React, { useState } from 'react';
import '../post/post.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import { editPostApi, getPostsApi } from '../../utils/api';
import { useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Meta from '../../utils/Meta'



export default function EditPost() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const params = useParams();

  const [post, setPost] = useState();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  const [oldImage, setOldImage] = useState();

  const submitHandler = async () => {
    try {
      const editedPost = {
        username: user.username,
        title,
        desc,
        image: file,
      };

      await axios.put(`${editPostApi}/${params.id}`, editedPost);

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

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`${getPostsApi}/${params.id}`);
        setPost(data);
        setTitle(data.title);
        setDesc(data.desc);
        setOldImage(data.image.url);
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
    }
    getPost();
  }, [params.id]);

  return (
    <>
        <Meta title={'Edit post'}/>
      {post && (
        <div className="write flex-grow-1 d-flex flex-column">
          <div className="b_img">
            <img src={oldImage} alt="" />
          </div>

          <div className="d-flex justify-content-start flex-row-reverse mb-2 mt-2">
            <label htmlFor="bl_img">
              Choose image <ImageIcon />
            </label>
            <input
              type="file"
              id="bl_img"
              style={{ visibility: 'hidden' }}
              onChange={(e) => uploadImg(e)}
            />
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
              value={desc}
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
            Update
          </Button>
        </div>
      )}
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
