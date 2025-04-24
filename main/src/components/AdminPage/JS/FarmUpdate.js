import React, { useState } from 'react';

export const FarmUpdate = () => {
  const [farmId, setFarmId] = useState('');
  const [newFarmName, setNewFarmName] = useState('');
  const [barnName, setBarnName] = useState('');
  const [snFarmId, setSnFarmId] = useState('');

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.put(`/api/farm-info/${farmId}`, {
        farm_name: newFarmName,
        barn_name: barnName,
        sn_farm_id: snFarmId,
      });
      alert(`농장 업데이트 완료: ${JSON.stringify(res.data.body)}`);
    } catch (err) {
      alert('업데이트 실패: ' + err.response?.data?.body?.result_message);
    }
  };

  return (
    <div className="crud-form">
      <h3>농장 업데이트</h3>
      <input
        placeholder="Farm ID"
        value={farmId}
        onChange={(e) => setFarmId(e.target.value)}
      />
      <input
        placeholder="New Farm Name"
        value={newFarmName}
        onChange={(e) => setNewFarmName(e.target.value)}
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
      <button onClick={handleUpdate}>업데이트하기</button>
    </div>
  );
};

export default FarmUpdate;
