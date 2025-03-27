import React, { useState } from 'react';

const UserDelete = () => {
  const [userId, setUserId] = useState('');

  const handleDelete = () => {
    if (window.confirm(`정말 삭제하시겠습니까? ${userId}`)) {
      alert(`유저 삭제: ${userId}`);
    }
  };

  return (
    <div className="crud-form">
      <h3>유저 삭제</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled>선택하세요</option>
        <option value="user1">User1</option>
        <option value="user2">User2</option>
      </select>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
};

export default UserDelete;
