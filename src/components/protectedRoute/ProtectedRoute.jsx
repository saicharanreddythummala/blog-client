import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from '../../context/Context';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();


  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  return children;
}
