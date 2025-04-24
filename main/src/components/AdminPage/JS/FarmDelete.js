// FarmDelete.js

import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';

export const FarmDelete = () => {
  const [farmId, setFarmId] = useState('');

  const handleDelete = async () => {
    if (!farmId) return alert('삭제할 농장을 선택해주세요.');

    if (window.confirm(`정말 삭제하시겠습니까? 농장 ID: ${farmId}`)) {
      try {
        await axiosInstance.delete(`/api/farm-info/${farmId}`);
        alert('농장 삭제 완료');
      } catch (err) {
        alert('삭제 실패: ' + err.response?.data?.body?.result_message);
      }
    }
  };

  return (
    <div className="crud-form">
      <h3>농장 삭제</h3>
      <input
        type="text"
        placeholder="삭제할 Farm ID 입력"
        value={farmId}
        onChange={(e) => setFarmId(e.target.value)}
      />
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
};

export default FarmDelete;
