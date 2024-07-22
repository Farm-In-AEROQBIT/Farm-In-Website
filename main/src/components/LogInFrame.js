import React from 'react';
import './LogInFrame.css';

const LogInFrame = ({ form, link }) => {
  return (
    <main className='log-in-templete'>
      <section className='farm-in-image'>
        <div className='logo-box'>
          <div className='svg-logo'></div>
          <p className='image-text'>
            무언가 그럴듯 한 소개 슬로건 한줄
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