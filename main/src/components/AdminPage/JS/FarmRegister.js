import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';

const FarmRegister = () => {
  const [userId, setUserId] = useState('');
  const [farmName, setFarmName] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('유저 불러오기 실패:', err));
  }, []);

  const handleRegister = async () => {
    if (!userId || !farmName.trim()) {
      alert('사용자와 농장명을 모두 선택/입력하세요.');
      return;
    }
  
    const requestData = {
      userId: parseInt(userId, 10),
      farmName: farmName.trim()
    };
  
    console.log("요청 데이터:", requestData);
  
    try {
      // 요청 방식 변경
      const response = await axiosInstance({
        method: 'post',
        url: '/api/farm-info/joinfarm',
        data: requestData,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("응답 데이터:", response.data);
      alert('농장 등록 완료');
      setUserId('');
      setFarmName('');
    } catch (err) {
      console.error("농장 등록 실패:", err.response?.data);
      alert('농장 등록 실패');
    }
  };

  return (
    <div className="crud-form">
      <h3>농장 등록</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled>사용자 선택</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.username}</option>
        ))}
      </select>
      <input
        placeholder="농장명"
        value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
      />
      <div className="crud-button-group">
        <button onClick={handleRegister}>등록하기</button>
      </div>
    </div>
  );
};

export default FarmRegister;
