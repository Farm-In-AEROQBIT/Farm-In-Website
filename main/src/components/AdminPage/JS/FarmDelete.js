import React, { useState } from 'react';

const FarmDelete = () => {
  const [userId, setUserId] = useState('');

  const handleDelete = () => {
    if (window.confirm(`정말 삭제하시겠습니까? ${userId}`)) {
      alert(`농장 삭제: ${userId}`);
    }
  };

  return (
    <div className="crud-form">
      <h3>농장 삭제</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled>사용자 선택</option>
        <option value="user1">User1</option>
        <option value="user2">User2</option>
      </select>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
};

export default FarmDelete;
