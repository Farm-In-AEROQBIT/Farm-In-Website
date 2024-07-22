import React, { Component } from 'react';
import LogInFrame from './components/LoginPage/LogInFrame';
import Form from './components/LoginPage/Form';
import LinkSignIn from './components/LoginPage/LinkSignIn'; // 파일명 수정
import { BrowserRouter, Route } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppRoutes /> {/* AppRoutes를 사용하여 라우팅을 처리합니다 */}
      </BrowserRouter>
    );
  }
}
 
export default App;