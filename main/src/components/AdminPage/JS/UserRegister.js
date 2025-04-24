import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';

const UserRegister = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      await axiosInstance.post('/open-api/user/join', {
        username: userId,
        password: userPw,
        name,
        phoneNumber,
        email,
      });
      alert('유저 등록 완료');
    } catch (err) {
      alert('유저 등록 실패');
      console.error(err);
    }
  };

  return (
    <div className="crud-form">
      <h3>유저 등록</h3>
      <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input placeholder="User PW" value={userPw} onChange={(e) => setUserPw(e.target.value)} />
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <input placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleRegister}>등록하기</button>
    </div>
  );
};

export default UserRegister;