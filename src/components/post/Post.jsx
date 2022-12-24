import React from 'react';
import './post.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { deletePostApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import Meta from '../../utils/Meta';

export default function Post({ className, post }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const deleteHandler = async () => {
    try {
      await axios.delete(`${deletePostApi}/${post._id}`, {
        data: {
          username: user.username,
        },
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

  return (
    <>
    <Meta title={'Blog post'}/>
      <div className={`${className} post`}>
        <div className="main">
          <div className="image">
            <img src={post.image ? post.image.url : ''} alt="" />
          </div>
          <div className="d-flex ">
            <h3 className="flex-grow-1 text-center">{post.title}</h3>
            <div className="d-flex align-items-center">
              <EditIcon onClick={() => navigate(`/post/edit/${post._id}`)} />
              <DeleteIcon
                onClick={() => {
                  deleteHandler();
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <h4>{post.username}</h4>
            <h4>{new Date(post.updatedAt).toDateString()}</h4>
          </div>
          <p className="post_p">{post.desc}</p>
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
