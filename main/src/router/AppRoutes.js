import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LogInFrame from '../components/LoginPage/LogInFrame';
import SignupFrame from '../components/SignupPage/SignupFrame';

const AppRoutes = ({isAuthenticated, Login}) => {
    return(
        <Routes>
            <Route path= "/login" element= {<LogInFrame/>}></Route>
            <Route path= "/signup" element= {<SignupFrame/>}></Route>

        </Routes>
    );
};
