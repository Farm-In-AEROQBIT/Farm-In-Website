import React, { useState } from 'react';

const FarmUpdate = () => {
  const [userId, setUserId] = useState('');
  const [farmName, setFarmName] = useState('');
  const [barnName, setBarnName] = useState('');
  const [snFarmId, setSnFarmId] = useState('');
  const [newFarmName, setNewFarmName] = useState('');

  const handleUpdate = () => {
    console.log('농장 업데이트:', { userId, farmName, barnName, snFarmId, newFarmName });
    alert(`농장 업데이트 완료\nUser ID: ${userId}\nFarm Name: ${farmName}\nBarn Name: ${barnName}\nSN Farm ID: ${snFarmId}\nNew Farm Name: ${newFarmName}`);
  };

  return (
    <div className="crud-form">
      <h3>농장 업데이트</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled>사용자 선택</option>
        <option value="user1">user1</option>
        <option value="user2">user2</option>
      </select>
      <select value={farmName} onChange={(e) => setFarmName(e.target.value)}>
        <option value="" disabled>Farm Name 선택</option>
        <option value="farm1">farm1</option>
        <option value="farm2">farm2</option>
      </select>
      <select value={barnName} onChange={(e) => setBarnName(e.target.value)}>
        <option value="" disabled>Barns Name 선택</option>
        <option value="barn1">barn1</option>
        <option value="barn2">barn2</option>
      </select>
      <input
        placeholder="New Farm Name"
        value={newFarmName}
        onChange={(e) => setNewFarmName(e.target.value)}
      />
      <input
        placeholder="SN Farm ID"
        value={snFarmId}
        onChange={(e) => setSnFarmId(e.target.value)}
      />
      <button onClick={handleUpdate}>업데이트하기</button>
    </div>
  );
};

export default FarmUpdate;
