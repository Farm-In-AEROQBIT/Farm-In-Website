import React, { useState } from 'react';

const UserSearch = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleSearch = () => {
    console.log('유저 조회:', selectedUserId);
    // API를 통해 유저 정보를 받아오는 로직이 추가될 예정
    setUserInfo({
      name: '홍길동',
      phoneNumber: '010-1234-5678',
      email: 'hong@example.com',
      farmInfo: 'Farm A',
      barnName: 'Barn 1',
    });
  };

  return (
    <div className="crud-form">
      <h3>유저 조회</h3>
      <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
        <option value="" disabled>유저 ID 선택</option>
        <option value="user1">user1</option>
        <option value="user2">user2</option>
      </select>
      <button onClick={handleSearch}>유저 조회</button>
      {userInfo && (
        <div className="user-info">
          <p>이름: {userInfo.name}</p>
          <p>전화번호: {userInfo.phoneNumber}</p>
          <p>이메일: {userInfo.email}</p>
          <p>농장 정보: {userInfo.farmInfo}</p>
          <p>돈사 이름: {userInfo.barnName}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
