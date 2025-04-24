import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';

export const SNFarmRegister = () => {
  const [users, setUsers] = useState([]);
  const [farms, setFarms] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedFarmId, setSelectedFarmId] = useState('');
  const [snFarmId, setSnFarmId] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBarns, setSelectedBarns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const barnOptions = [
    '비육사',
    '육성사',
    '분만사',
    '임신사',
    '자돈사',
    '웅돈사',
    '후보사',
  ];

  // Fetch users when component mounts
  useEffect(() => {
    axiosInstance.get('/admin/users')
      .then((res) => {
        // Check if data is in body property or directly in data
        const userData = res.data.body || res.data;
        
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else {
          console.error('Expected array of users but got:', res.data);
          setUsers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Fetch farms when user is selected
  useEffect(() => {
    if (selectedUserId) {
      // Option 1: If your API supports filtering by userId in the request
      axiosInstance.get(`/api/farm-info?user_id=${selectedUserId}`)
        .then((res) => {
          // Access the body array from the response
          if (res.data && res.data.body && Array.isArray(res.data.body)) {
            // The farms are in res.data.body
            const farmsData = res.data.body;
            
            // If you need to filter by user_id (though this may already be filtered by the API)
            const filtered = farmsData.filter(farm => 
              farm.user_id === selectedUserId || farm.user_id === parseInt(selectedUserId)
            );
            
            setFarms(filtered);
          } else {
            console.error('Expected array of farms in body but got:', res.data);
            setFarms([]);
          }
        })
        .catch(error => {
          console.error('Error fetching farms:', error);
          setFarms([]);
        });
    } else {
      setFarms([]);
    }
  }, [selectedUserId]);

  const handleBarnToggle = (barn) => {
    setSelectedBarns((prev) =>
      prev.includes(barn)
        ? prev.filter((b) => b !== barn)
        : [...prev, barn]
    );
  };

  const handleSNRegister = async () => {
    if (!snFarmId || !selectedFarmId) {
      return alert('SN Farm ID와 농장을 선택하세요.');
    }

    if (selectedBarns.length === 0) {
      return alert('적어도 하나의 돈사를 선택하세요.');
    }

    setLoading(true);
    setError(null);

    try {
      // API 요청 데이터 구조 로깅
      const snFarmData = {
        sn_farm_id: snFarmId,  // snFarmId -> sn_farm_id로 필드명 변경
        farm_id: parseInt(selectedFarmId),  // farmId -> farm_id로 필드명 변경
        description: description
      };
      
      console.log('Sending to /api/snfarminfo:', snFarmData);
      
      // SN Farm 등록 먼저 수행
      const response = await axiosInstance.post('/api/snfarminfo', snFarmData);
      
      console.log('SNFarm registration response:', response.data);

      // 각 선택된 돈사 등록 - 다중 API 호출 병렬 처리
      const barnPromises = selectedBarns.map(barn => {
        const barnType = getBarnEndpoint(barn);
        const endpoint = `/api/${barnType}`;
        
        const barnData = {
          sn_farm_id: snFarmId  // snFarmId -> sn_farm_id로 필드명 변경
        };
        
        console.log(`Sending to ${endpoint}:`, barnData);
        
        return axiosInstance.post(endpoint, barnData);
      });

      const barnResponses = await Promise.all(barnPromises);
      console.log('Barn registration responses:', barnResponses.map(res => res.data));

      alert('모뎀 및 돈사 등록 완료');
      // 상태 초기화
      setSnFarmId('');
      setDescription('');
      setSelectedBarns([]);
      setSelectedFarmId('');
      setSelectedUserId('');
      setFarms([]);
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      
      // 오류 세부 정보 추출
      let errorMessage = error.message;
      if (error.response) {
        console.log('Error response:', error.response);
        errorMessage = `상태 코드: ${error.response.status}, 메시지: ${error.response?.data?.message || '서버 오류'}`;
        
        // 서버에서 반환하는 오류 데이터 자세히 로깅
        console.log('Error data:', error.response.data);
      }
      
      setError(`등록 실패: ${errorMessage}`);
      alert(`등록 실패: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const getBarnEndpoint = (barnName) => {
    switch (barnName) {
      case '비육사': return 'finishing';
      case '육성사': return 'growing';
      case '분만사': return 'maternity';
      case '임신사': return 'gestation';
      case '자돈사': return 'piglet';
      case '웅돈사': return 'boars';
      case '후보사': return 'reserve';
      default: return '';
    }
  };

  return (
    <div className="crud-form">
      <h3>모뎀(SN Farm ID) 등록</h3>
      
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <select 
        value={selectedUserId} 
        onChange={(e) => {
          setSelectedUserId(e.target.value);
          setSelectedFarmId(''); // Reset farm selection when user changes
        }}
      >
        <option value="" disabled>사용자 선택</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>

      <select 
        value={selectedFarmId} 
        onChange={(e) => setSelectedFarmId(e.target.value)} 
        disabled={!selectedUserId || farms.length === 0}
      >
        <option value="" disabled>농장 선택</option>
        {farms.map((farm) => (
          <option key={farm.farm_id} value={farm.farm_id}>{farm.farm_name}</option>
        ))}
      </select>

      <input
        placeholder="SN Farm ID"
        value={snFarmId}
        onChange={(e) => setSnFarmId(e.target.value)}
      />
      
      <textarea
        placeholder="설명(선택사항)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <h4>연동할 돈사 선택</h4>
      <div className="barn-checkbox-group">
        {barnOptions.map((barn) => (
          <label key={barn}>
            <input
              type="checkbox"
              checked={selectedBarns.includes(barn)}
              onChange={() => handleBarnToggle(barn)}
            />
            {barn}
          </label>
        ))}
      </div>

      <div className="crud-button-group">
        <button 
          onClick={handleSNRegister}
          disabled={loading || !snFarmId || !selectedFarmId || selectedBarns.length === 0}
        >
          {loading ? '처리 중...' : '모뎀 등록'}
        </button>
      </div>
    </div>
  );
};

export default SNFarmRegister;