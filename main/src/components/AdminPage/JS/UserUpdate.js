import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance'; // 경로는 실제 프로젝트 구조에 맞게 조정해주세요

export const UserUpdate = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // 컴포넌트 마운트 시 유저 목록 로드
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
      } else {
        console.error('Expected array of users but got:', res.data);
        setUsers([]);
        setError('유저 데이터 형식이 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('유저 목록 로딩 실패:', err);
      
      if (err.response) {
        console.log('오류 응답:', err.response);
      }
      
      setError('유저 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 유저 선택 시 해당 유저의 현재 정보 로드
  useEffect(() => {
    if (selectedUserId) {
      const user = users.find(user => 
        user.id === parseInt(selectedUserId) || 
        user.username === selectedUserId
      );
      
      if (user) {
        setSelectedUser(user);
        setName(user.name || '');
        setEmail(user.email || '');
        setPhonenum(user.phonenum || '');
        setPassword('');
        setConfirmPassword('');
        setShowPasswordFields(false);
        setError(null);
      } else {
        resetForm();
        setError('선택한 유저 정보를 찾을 수 없습니다.');
      }
    } else {
      resetForm();
    }
  }, [selectedUserId, users]);

  const resetForm = () => {
    setSelectedUser(null);
    setName('');
    setEmail('');
    setPhonenum('');
    setPassword('');
    setConfirmPassword('');
    setShowPasswordFields(false);
  };

  // 유저 정보 업데이트 처리
  const handleUpdate = async () => {
    if (!selectedUserId) {
      return alert('유저를 선택해주세요.');
    }

    // 기본 정보 또는 비밀번호 중 하나라도 입력됐는지 확인
    if (!name && !email && !phonenum && !(showPasswordFields && password)) {
      return alert('업데이트할 정보를 입력해주세요.');
    }

    // 비밀번호 필드가 표시되고 입력된 경우 유효성 검증
    if (showPasswordFields) {
      if (password && password.length < 6) {
        return alert('비밀번호는 최소 6자 이상이어야 합니다.');
      }
      
      if (password && password !== confirmPassword) {
        return alert('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      }
    }

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      // 업데이트할 데이터 객체 생성
      const updateData = {};
      
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phonenum) updateData.phonenum = phonenum;
      if (showPasswordFields && password) updateData.password = password;
      
      console.log('업데이트 데이터:', updateData);
      
      // 백엔드 API 호출
      const userId = selectedUser.id;
      const response = await axiosInstance.put(`/admin/users/${userId}`, updateData);
      console.log('유저 업데이트 응답:', response.data);
      
      setSuccessMessage("유저 정보가 성공적으로 업데이트되었습니다.");
      
      // 업데이트 성공 후 유저 목록 새로고침
      fetchUsers();
      
      // 비밀번호 필드 초기화
      if (showPasswordFields) {
        setPassword('');
        setConfirmPassword('');
        setShowPasswordFields(false);
      }
      
    } catch (err) {
      console.error('업데이트 실패:', err);
      
      let errorMessage = '업데이트에 실패했습니다.';
      
      if (err.response) {
        console.log('오류 응답:', err.response);
        
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
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
    if (!showPasswordFields) {
      // 비밀번호 필드를 표시할 때 기존 값 초기화
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="crud-form">
      <h3>유저 업데이트</h3>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>
          {successMessage}
        </div>
      )}
      
      <select 
        value={selectedUserId} 
        onChange={(e) => setSelectedUserId(e.target.value)} 
        disabled={loading || users.length === 0}
      >
        <option value="" disabled>유저 선택</option>
        {users.map((user) => (
          <option key={user.id} value={user.username}>
            {user.username} {user.name ? `(${user.name})` : ''}
          </option>
        ))}
      </select>
      
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading || !selectedUserId}
      />
      
      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading || !selectedUserId}
      />
      
      <input
        placeholder="전화번호"
        value={phonenum}
        onChange={(e) => setPhonenum(e.target.value)}
        disabled={loading || !selectedUserId}
      />
      
      {selectedUserId && (
        <button 
          type="button" 
          onClick={togglePasswordFields} 
          className="password-toggle-btn"
          style={{ marginBottom: '10px' }}
          disabled={loading}
        >
          {showPasswordFields ? '비밀번호 변경 취소' : '비밀번호 변경하기'}
        </button>
      )}
      
      {showPasswordFields && (
        <div className="password-fields">
          <input
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>
      )}
      
      <button 
        onClick={handleUpdate} 
        disabled={loading || !selectedUserId || (!name && !email && !phonenum && !(showPasswordFields && password))}
        style={{ marginTop: '10px' }}
      >
        {loading ? '처리 중...' : '업데이트'}
      </button>
      
      {selectedUser && (
        <div className="current-user-info" style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <h4>현재 정보</h4>
          <p><strong>아이디:</strong> {selectedUser.username}</p>
          <p><strong>이름:</strong> {selectedUser.name || '(없음)'}</p>
          <p><strong>이메일:</strong> {selectedUser.email || '(없음)'}</p>
          <p><strong>전화번호:</strong> {selectedUser.phonenum || '(없음)'}</p>
          <p><strong>역할:</strong> {selectedUser.role || '(없음)'}</p>
          <p><strong>가입일:</strong> {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : '(없음)'}</p>
        </div>
      )}
    </div>
  );
};

export default UserUpdate;