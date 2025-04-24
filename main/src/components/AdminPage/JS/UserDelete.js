import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';

const UserDelete = () => {
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [relatedData, setRelatedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await axiosInstance.get('/admin/users');
      console.log('유저 목록 응답:', res.data);
      
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (res.data && Array.isArray(res.data.body)) {
        setUsers(res.data.body);
      } else {
        console.error('예상치 못한 데이터 형식:', res.data);
        setUsers([]);
        setError('유저 데이터 형식이 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('유저 목록 로딩 실패:', err);
      handleApiError(err, '유저 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 사용자 관련 데이터 정보 조회
  const fetchUserRelatedData = async (userId) => {
    setLoading(true);
    setError(null);
    setRelatedData(null);
    
    try {
      const res = await axiosInstance.get(`/admin/users/${userId}/related-data`);
      console.log('사용자 관련 데이터:', res.data);
      setRelatedData(res.data);
    } catch (err) {
      console.error('관련 데이터 조회 실패:', err);
      handleApiError(err, '사용자 관련 데이터를 조회하는데 실패했습니다.');
      setRelatedData(null);
    } finally {
      setLoading(false);
    }
  };

  // 사용자 ID 선택 시 관련 데이터 조회
  useEffect(() => {
    if (userId) {
      fetchUserRelatedData(userId);
    } else {
      setRelatedData(null);
    }
  }, [userId]);

  // 일반 삭제 함수 (외래 키 제약 조건으로 실패할 가능성 높음)
  const handleNormalDelete = async () => {
    if (!userId) {
      return alert('삭제할 사용자를 선택해주세요.');
    }
    
    if (window.confirm(`정말 '${getUsernameById(userId)}' 사용자를 삭제하시겠습니까?`)) {
      setLoading(true);
      setError(null);
      
      try {
        await axiosInstance.delete(`/admin/users/${userId}`);
        alert('사용자가 성공적으로 삭제되었습니다.');
        
        // 삭제 후 목록 새로고침
        setUserId('');
        fetchUsers();
      } catch (err) {
        console.error('삭제 실패:', err);
        handleApiError(err, '삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  // 계단식 삭제 함수 (관련 데이터 모두 삭제)
  const handleCascadeDelete = async () => {
    if (!userId) {
      return alert('삭제할 사용자를 선택해주세요.');
    }
    
    const username = getUsernameById(userId);
    let confirmMessage = `주의: '${username}' 사용자를 삭제하면 `;
    
    if (relatedData && relatedData.farmCount > 0) {
      confirmMessage += `${relatedData.farmCount}개의 농장 정보와 관련된 모든 돈사 및 모뎀 데이터도 함께 삭제됩니다. `;
    }
    
    confirmMessage += '이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?';
    
    if (window.confirm(confirmMessage)) {
      setLoading(true);
      setError(null);
      
      try {
        await axiosInstance.delete(`/admin/users/${userId}/cascade`);
        alert('사용자와 관련된 모든 데이터가 성공적으로 삭제되었습니다.');
        
        // 삭제 후 목록 새로고침
        setUserId('');
        fetchUsers();
      } catch (err) {
        console.error('계단식 삭제 실패:', err);
        handleApiError(err, '계단식 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  // 오류 처리 헬퍼 함수
  const handleApiError = (err, defaultMessage) => {
    let errorMessage = defaultMessage;
    
    if (err.response) {
      console.log('오류 응답:', err.response);
      
      if (err.response.status === 403) {
        errorMessage = '권한이 없습니다. 관리자 계정으로 로그인했는지 확인하세요.';
      } else if (err.response.status === 500) {
        if (err.response.data && typeof err.response.data === 'string' && 
            err.response.data.includes('foreign key constraint fails')) {
          errorMessage = '외래 키 제약 조건 위반: 계단식 삭제 옵션을 사용하세요.';
        }
      } else if (err.response.data && err.response.data.message) {
        errorMessage += ': ' + err.response.data.message;
      }
    } else if (err.message) {
      errorMessage += ': ' + err.message;
    }
    
    setError(errorMessage);
  };

  // ID로 사용자 이름 찾기
  const getUsernameById = (id) => {
    const user = users.find(user => String(user.id) === String(id));
    return user ? user.username : '알 수 없음';
  };

  return (
    <div className="crud-form">
      <h3>유저 삭제</h3>
      
      <div className="info-message" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
        <p><strong>안내:</strong> 사용자를 삭제할 때는 연결된 데이터가 있는 경우 계단식 삭제 옵션을 사용하세요.</p>
      </div>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <select 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)}
        disabled={loading || users.length === 0}
      >
        <option value="" disabled>사용자 선택</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username} {user.name ? `(${user.name})` : ''}
          </option>
        ))}
      </select>
      
      {relatedData && (
        <div className="related-data-info" style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e9f5fd', borderRadius: '4px' }}>
          <h4>관련 데이터 정보</h4>
          <p><strong>농장 수:</strong> {relatedData.farmCount}개</p>
          {relatedData.hasDependencies && (
            <p style={{ color: '#d9534f' }}>
              <strong>주의:</strong> 이 사용자는 연결된 데이터가 있습니다. 일반 삭제는 실패할 수 있습니다.
            </p>
          )}
        </div>
      )}
      
      <div className="button-group" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button 
          onClick={handleNormalDelete} 
          disabled={loading || !userId || (relatedData && relatedData.hasDependencies)}
          style={{ 
            backgroundColor: (relatedData && relatedData.hasDependencies) ? '#e9ecef' : '#dc3545',
            color: (relatedData && relatedData.hasDependencies) ? '#6c757d' : 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px'
          }}
        >
          {loading ? '처리 중...' : '일반 삭제'}
        </button>
        
        <button 
          onClick={handleCascadeDelete} 
          disabled={loading || !userId}
          style={{ 
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px'
          }}
        >
          {loading ? '처리 중...' : '계단식 삭제 (모든 관련 데이터 포함)'}
        </button>
      </div>
      
      {relatedData && relatedData.hasDependencies && (
        <div className="warning" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px', color: '#856404' }}>
          <p><strong>경고:</strong> 계단식 삭제를 사용하면 이 사용자의 모든 농장, 돈사, 모뎀 데이터가 함께 삭제됩니다.</p>
        </div>
      )}
      
      {users.length === 0 && !loading && !error && (
        <p>사용자가 없거나 목록을 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default UserDelete;