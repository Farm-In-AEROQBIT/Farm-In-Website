import React, { Component } from 'react';
import LogInFrame from './components/LogInFrame';
import Form from './components/Form';
import LinkSignIn from './components/LinkSignIn'; // 파일명 수정

class App extends Component {
  render() {
    return (
      <LogInFrame form={<Form />} link={<LinkSignIn />} />
    );
  }
}
 
export default App;