import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsApi } from '../../utils/api';
import Post from '../post/Post';
import SideBar from '../sideBar/SideBar';
import './postPage.scss';
import { ToastContainer, toast } from 'react-toastify';

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`${getPostsApi}${params.id}`);

        setPost(data);
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
      <div className="d-flex post_page">
        <Post className="col-9" post={post} />
        <SideBar className="col-3" />
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
