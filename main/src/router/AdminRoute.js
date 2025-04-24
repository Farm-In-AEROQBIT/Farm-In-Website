import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    // 로그인 안 된 경우
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    // 어드민이 아닌 경우
    return <Navigate to="/statistics" replace />;
  }

  return children; // 어드민 맞으면 해당 컴포넌트 보여줌
};

export default AdminRoute;
