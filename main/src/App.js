import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
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