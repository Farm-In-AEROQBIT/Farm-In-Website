import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInFrame from '../components/LoginPage/LogInFrame';
import SignupFrame from '../components/SignupPage/SignupFrame';
import LinkSignIn from '../components/LoginPage/LinkSignIn';
import Form from '../components/LoginPage/Form';
import SignupForm from '../components/SignupPage/SignupForm';
import LinkLogIn from '../components/SignupPage/LinkLogIn';
import StatisticsFrame from '../components/StatisticsPage/pageFrame';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LogInFrame form={<Form />} link={<LinkSignIn />} />} />
            <Route path="/signup" element={<SignupFrame form={<SignupForm/>} link={<LinkLogIn/>}/>} />
            <Route path="/statistics" element={<StatisticsFrame/>}/>
        </Routes>
    );
};

export default AppRoutes;