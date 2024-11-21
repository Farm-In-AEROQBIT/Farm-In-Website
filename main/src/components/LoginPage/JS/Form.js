import React, { useState } from 'react';
import '../CSS/Form.css';
import axiosInstance from '../../../axiosInterceptor';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = async () => {
    try {
      const response = await axiosInstance.post('/open-api/user/login', {
        username: inputId,
        password: inputPw,
      });

      console.log('로그인 성공:', response.data);
      
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('accessToken', response.data.result.accessToken);
      localStorage.setItem('refreshToken', response.data.result.refreshToken);

      // 로그인 성공 시 홈 페이지로 이동
      navigate('/statistics');
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onClickLogin();
    }
  };

  return (
    <section>
      <div className='log-in-box'>
        <div className='text-box-frame'>
          <div className='icon-id'></div>
          <input
            type='text'
            className='input-id'
            placeholder='아이디'
            value={inputId}
            onChange={handleInputId}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className='text-box-frame'>
          <div className='icon-lock'></div>
          <input
            type='password'
            className='input-password'
            placeholder='비밀번호'
            value={inputPw}
            onChange={handleInputPw}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className='log-in-btn' onClick={onClickLogin}>
          로그인
        </button>
      </div>
    </section>
  );
};

export default Form;
