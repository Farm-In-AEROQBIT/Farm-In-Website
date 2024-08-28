import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInFrame from '../components/JS/LoginPage/LogInFrame';
import SignupFrame from '../components/JS/SignupPage/SignupFrame';
import LinkSignIn from '../components/JS/LoginPage/LinkSignIn';
import Form from '../components/JS/LoginPage/Form';
import SignupForm from '../components/JS/SignupPage/SignupForm';
import LinkLogIn from '../components/JS/SignupPage/LinkLogIn';
import StatisticsFrame from '../components/JS/StatisticsPage/pageFrame';
import StatisticGraph from '../components/JS/StatisticsPage/StatisticGraph';
import DataVisualization from '../components/JS/StatisticsPage/DataVisualization';

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