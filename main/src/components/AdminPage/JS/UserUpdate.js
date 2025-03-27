import React, { useState } from 'react';

const UserUpdate = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleUpdate = () => {
    alert(`유저 업데이트: ${userId}, ${name}, ${email}, ${phoneNumber}`);
  };

  return (
    <div className="crud-form">
      <h3>유저 업데이트</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled>선택하세요</option>
        <option value="user1">User1</option>
        <option value="user2">User2</option>
      </select>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleUpdate}>업데이트하기</button>
    </div>
  );
};

export default UserUpdate;
