import React, { useState } from 'react';

const FarmSearch = () => {
  const [userId, setUserId] = useState('');
  const [farmName, setFarmName] = useState('');
  const [barnName, setBarnName] = useState('');
  const [sensorId, setSensorId] = useState('');

  const handleSearch = () => {
    console.log('농장 조회:', { userId, farmName, barnName });
    // API를 통해 센서 ID를 받아오는 로직이 추가될 예정
    setSensorId('Sensor12345'); // 임시 데이터
  };

  return (
    <div className="crud-form">
      <h3>농장 조회</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled>User ID 선택</option>
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
      <button onClick={handleSearch}>농장 조회</button>
      {sensorId && <p>Sensor ID: {sensorId}</p>}
    </div>
  );
};

export default FarmSearch;
