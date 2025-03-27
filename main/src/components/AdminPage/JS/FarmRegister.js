import React, { useState } from 'react';

const FarmRegister = () => {
  const [userId, setUserId] = useState('');
  const [farmName, setFarmName] = useState('');
  const [barnName, setBarnName] = useState('');
  const [snFarmId, setSnFarmId] = useState('');

  const handleRegister = () => {
    alert(`농장 등록: ${userId}, ${farmName}, ${barnName}, ${snFarmId}`);
  };

  return (
    <div className="crud-form">
      <h3>농장 등록</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled>사용자 선택</option>
        <option value="user1">User1</option>
        <option value="user2">User2</option>
      </select>
      <input
        placeholder="Farm Name"
        value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
      />
      <input
        placeholder="Barn Name"
        value={barnName}
        onChange={(e) => setBarnName(e.target.value)}
      />
      <input
        placeholder="SN Farm ID"
        value={snFarmId}
        onChange={(e) => setSnFarmId(e.target.value)}
      />
      <button onClick={handleRegister}>등록하기</button>
    </div>
  );
};

export default FarmRegister;
