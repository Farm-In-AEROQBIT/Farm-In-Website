import React, { Component } from 'react';
import LogInFrame from './components/LoginPage/LogInFrame';
import Form from './components/LoginPage/Form';
import LinkSignIn from './components/LoginPage/LinkSignIn'; // 파일명 수정
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';

class App extends Component {
  render() {
    return (
      <LogInFrame form={<Form />} link={<LinkSignIn />} />
    );
  }
}
 
export default App;