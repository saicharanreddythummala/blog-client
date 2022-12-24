import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import './posts.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { PostContext } from '../../context/Context';
import { ToastContainer } from 'react-toastify';

export default function Posts() {
  const navigate = useNavigate();

  const { posts, getPosts, getPostByUser } = useContext(PostContext);

  const [author, setAuthor] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="posts">
        <Grid container spacing={1}>
          {posts.map((post, i) => (
            <Grid item xs={6} key={post._id}>
              <div className="card">
                <div className="card-header">
                  <img src={post.image ? post.image.url : ''} alt="" />
                  <div className="details d-flex justify-content-between align-items-center">
                    <div>
                      <Typography
                        variant="body1"
                        onClick={() => {
                          setAuthor(post.username);
                          getPostByUser(author);
                        }}
                      >
                        {post.username}
                      </Typography>
                      <Typography variant="body2">
                        {new Date(post.updatedAt).toDateString()}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body1">
                        {post.category}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-title">{post.title}</div>
                  <div className="card-para">{post.desc}</div>
                </div>
                <div className="card-footer">
                  <Button onClick={() => navigate(`/post/${post._id}`)}>
                    Read post
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
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
