import React, { useState } from 'react';

export const FarmSearch = () => {
  const [farmId, setFarmId] = useState('');
  const [farmInfo, setFarmInfo] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axiosInstance.get(`/api/farm-info/${farmId}`);
      setFarmInfo(res.data.body);
    } catch (err) {
      alert('조회 실패: ' + err.response?.data?.body?.result_message);
    }
  };

  return (
    <div className="crud-form">
      <h3>농장 조회</h3>
      <input
        placeholder="Farm ID"
        value={farmId}
        onChange={(e) => setFarmId(e.target.value)}
      />
      <button onClick={handleSearch}>농장 조회</button>
      {farmInfo && (
        <div className="farm-info">
          <p>Farm Name: {farmInfo.farm_name}</p>
          <p>Barn Name: {farmInfo.barn_name}</p>
          <p>SN Farm ID: {farmInfo.sn_farm_id}</p>
        </div>
      )}
    </div>
  );
};

export default FarmSearch;
