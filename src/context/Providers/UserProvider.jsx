import React from 'react';
import { useState } from 'react';
import { UserContext } from '../Context';
import axios from 'axios';
import { loginApi, registerApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserProvider({ children }) {
  const user = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).user
    : null;

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //register user
  const register = async (userData) => {
    try {
      await axios.post(registerApi, userData);
      navigate('/login');
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

  //login user
  const loginHandler = async (ud) => {
    try {
      const { data } = await axios.post(loginApi, ud);
      setLoading(false);
      localStorage.setItem('user', JSON.stringify(data));
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

  //user logout
  const logoutHandler = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <UserContext.Provider
      value={{ user, register, loginHandler, loading, logoutHandler }}
    >
      {children}
    </UserContext.Provider>
  );
}
