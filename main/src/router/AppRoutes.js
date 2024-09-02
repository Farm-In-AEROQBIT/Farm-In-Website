import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInFrame from '../components/LoginPage/JS/LogInFrame';
import SignupFrame from '../components/SignupPage/JS/SignupFrame';
import LinkSignIn from '../components/LoginPage/JS/LinkSignIn';
import Form from '../components/LoginPage/JS/Form';
import SignupForm from '../components/SignupPage/JS/SignupForm';
import LinkLogIn from '../components/SignupPage/JS/LinkLogIn';
import StatisticsFrame from '../components/StatisticsPage/JS/pageFrame';
import StatisticGraph from '../components/StatisticsPage/JS/StatisticGraph';
import DataVisualization from '../components/StatisticsPage/JS/DataVisualization';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LogInFrame form={<Form />} link={<LinkSignIn />}/>} />
            <Route path="/signup" element={<SignupFrame form={<SignupForm/>} link={<LinkLogIn/>}/>} />
            <Route path="/statistics" element={<StatisticsFrame statistic={<StatisticGraph dataVisualization={<DataVisualization/>}/>}/>} />
        </Routes>
    );
};

export default AppRoutes;