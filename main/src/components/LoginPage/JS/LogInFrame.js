import React from 'react';
import './LogInFrame.css';

const LogInFrame = ({ form, link }) => {
  return (
    <main className='log-in-templete'>
      <section className='farm-in-image'>
        <div className='logo-box'>
          <div className='svg-logo'></div>
          <p className='image-text'>
            휴머니즘이 살아있는 환경 기술
          </p>
        </div>
      </section>
      <section className='form-wrapper'>
        {link}
        {form}
      </section>
    </main>
  ); 
};

export default LogInFrame; 