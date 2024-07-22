import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInFrame from '../components/LoginPage/LogInFrame';
import SignupFrame from '../components/SignupPage/SignupFrame';
import LinkSignIn from '../components/LoginPage/LinkSignIn';
import Form from '../components/LoginPage/Form';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LogInFrame form={<Form />} link={<LinkSignIn />} />} /> {/* 시작 화면 설정 */}
            <Route path="/login" element={<LogInFrame />} />
            <Route path="/signup" element={<SignupFrame />} />
        </Routes>
    );
};

export default AppRoutes;