import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance'; // 경로는 실제 프로젝트 구조에 맞게 조정해주세요

export const UserSearch = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 유저 목록 로드
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await axiosInstance.get('/admin/users');
      console.log('API 응답:', res.data); // 응답 구조 확인을 위한 로깅
      
      const userData = res.data.body || res.data;
      
      if (Array.isArray(userData)) {
        setUsers(userData);
      } else {
        console.error('Expected array of users but got:', res.data);
        setUsers([]);
        setError('유저 데이터 형식이 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('유저 목록 로딩 실패:', err);
      
      // 상세 오류 로깅
      if (err.response) {
        console.log('오류 응답:', err.response);
        console.log('오류 데이터:', err.response.data);
      }
      
      setError('유저 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!selectedUserId) {
      return alert('유저 ID를 선택해주세요.');
    }
    
    setLoading(true);
    setError(null);
    setUserInfo(null);
    
    try {
      // 이미 불러온 users 배열에서 검색
      const user = users.find((u) => u.username === selectedUserId);
      
      if (!user) {
        setError('해당 유저를 찾을 수 없습니다.');
        return;
      }
      
      console.log('찾은 유저 정보:', user);
      setUserInfo(user);
    } catch (err) {
      console.error('유저 조회 실패:', err);
      
      let errorMessage = '유저 조회에 실패했습니다.';
      
      // 오류 응답 구조 상세 로깅
      if (err.response) {
        console.log('오류 응답:', err.response);
        
        // 오류 메시지 추출 시도
        if (err.response.data) {
          console.log('오류 데이터:', err.response.data);
          
          // 다양한 가능한 오류 메시지 경로 시도
          const message = 
            err.response.data.message || 
            err.response.data.body?.result_message || 
            err.response.data.body?.message ||
            err.response.data.error;
            
          if (message) {
            errorMessage += ': ' + message;
          }
        }
      } else if (err.message) {
        errorMessage += ': ' + err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crud-form">
      <h3>유저 조회</h3>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <select 
        value={selectedUserId} 
        onChange={(e) => setSelectedUserId(e.target.value)}
        disabled={loading || users.length === 0}
      >
        <option value="" disabled>유저 ID 선택</option>
        {users.map((user) => (
          <option key={user.id || user.username} value={user.username}>
            {user.username} {user.name ? `(${user.name})` : ''}
          </option>
        ))}
      </select>
      
      <button 
        onClick={handleSearch} 
        disabled={loading || !selectedUserId || users.length === 0}
      >
        {loading ? '조회 중...' : '유저 조회'}
      </button>
      
      {loading && <p>데이터를 불러오는 중...</p>}
      
      {userInfo && (
        <div className="user-info">
          <h4>유저 정보</h4>
          <p><strong>아이디:</strong> {userInfo.username}</p>
          <p><strong>이름:</strong> {userInfo.name || '정보 없음'}</p>
          <p><strong>이메일:</strong> {userInfo.email || '정보 없음'}</p>
          <p><strong>역할:</strong> {userInfo.role || '정보 없음'}</p>
          {userInfo.created_at && <p><strong>생성일:</strong> {new Date(userInfo.created_at).toLocaleString()}</p>}
        </div>
      )}
    </div>
  );
};

export default UserSearch;