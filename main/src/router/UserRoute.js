import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!accessToken) {
    // 로그인 안 되어 있음
    return <Navigate to="/" replace />;
  }

  if (isAdmin) {
    // 관리자는 접근 불가
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;
