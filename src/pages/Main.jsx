import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import PostPage from '../components/postPage/PostPage';
import WriteBlog from '../components/writeBlog/WriteBlog';
import UserUpdate from '../components/userUpdate/UserUpdate';
import EditPost from '../components/editPost/EditPost';
import Contact from '../components/contact/Contact';

export default function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/new" element={<WriteBlog />} />
        <Route path="/update/:id" element={<UserUpdate />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
