import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { getPostsApi } from '../../utils/api';
import { PostContext } from '../Context';

export default function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await axios.get(getPostsApi);
    setPosts(data);
  };

  //get posts by user
  const getPostByUser = async (author) => {
    const { data } = await axios.get(`${getPostsApi}?user=${author}`);
    setPosts(data);
  };

  //get posts by category
  const getPostByCategory = async (category) => {
    const { data } = await axios.get(`${getPostsApi}?category=${category}`);
    setPosts(data);
  };

  return (
    <PostContext.Provider
      value={{ posts, getPosts, getPostByUser, getPostByCategory }}
    >
      {children}
    </PostContext.Provider>
  );
}
