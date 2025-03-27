import React, { useState } from 'react';
import UserRegister from './UserRegister';
import UserSearch from './UserSearch';
import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';
import FarmRegister from './FarmRegister';
import FarmSearch from './FarmSearch';
import FarmUpdate from './FarmUpdate';
import FarmDelete from './FarmDelete';
import '../CSS/AdminPage.css';

const AdminPage = () => {
  // 유저 등록을 기본으로 설정
  const [activeComponent, setActiveComponent] = useState('userRegister');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'userRegister':
        return <UserRegister />;
      case 'userSearch':
        return <UserSearch />;
      case 'userUpdate':
        return <UserUpdate />;
      case 'userDelete':
        return <UserDelete />;
      case 'farmRegister':
        return <FarmRegister />;
      case 'farmSearch':
        return <FarmSearch />;
      case 'farmUpdate':
        return <FarmUpdate />;
      case 'farmDelete':
        return <FarmDelete />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <header className="header">
        <svg className="company-logo"></svg>
      </header>

      <section className="admin-content">
        <div className="crud-section">
          <div className="user-crud">
            <h2>유저 관리</h2>
            <div className="crud-button-group">
              <button onClick={() => setActiveComponent('userRegister')}>유저 등록</button>
              <button onClick={() => setActiveComponent('userSearch')}>유저 조회</button>
              <button onClick={() => setActiveComponent('userUpdate')}>유저 업데이트</button>
              <button onClick={() => setActiveComponent('userDelete')}>유저 삭제</button>
            </div>
          </div>
          <div className="farm-crud">
            <h2>농장 관리</h2>
            <div className="crud-button-group">
              <button onClick={() => setActiveComponent('farmRegister')}>농장 등록</button>
              <button onClick={() => setActiveComponent('farmSearch')}>농장 조회</button>
              <button onClick={() => setActiveComponent('farmUpdate')}>농장 업데이트</button>
              <button onClick={() => setActiveComponent('farmDelete')}>농장 삭제</button>
            </div>
          </div>
        </div>

        <div className="crud-content">
          {renderComponent()}
        </div>
      </section>
      <footer className="footer-box">
        <div className="information-left">
          <img className="footer-logo"></img>
          <p className="Nanum-bold company-name">주식회사 팜인</p>
          <p className="Nanum contact-way">대전광역시 유성구 테크노9로 35 IT전용벤처타운 407호 (우:34027)</p>
        </div>
        <div className="information-right">
          <p className="Nanum-bold contact">CONTACT US</p>
          <p className="information">
            <span className="Nanum-bold contact-way">TEL</span>
            <span className="Nanum contact-way"> 042-933-9060</span>
          </p>
          <p className="information">
            <span className="Nanum-bold contact-way">FAX</span>
            <span className="Nanum contact-way"> 042-933-9061</span>
          </p>
          <p className="information">
            <span className="Nanum-bold contact-way">E-MAIL</span>
            <span className="Nanum contact-way"> farmin0130@farm-in.kr</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
