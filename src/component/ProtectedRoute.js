import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(['authToken']); 

  if (!cookies.authToken) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;
