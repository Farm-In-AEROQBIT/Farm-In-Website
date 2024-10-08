import React from 'react';
import '../CSS/Dropdown.css';  // DropDown.css 파일 임포트

const Dropdown = () => {
    return (
        <div className="dropdown-container">
            <select className="farm-dropdown">
                <option>낙양 농장</option>
                <option>성도 농장</option>
                <option>가릉강 농장</option>
                <option>농장 추가하기</option>
            </select>
            <select className="year-dropdown">
                <option>2024년</option>
                <option>2023년</option>
            </select>
            <select className="month-dropdown">
                <option>7월</option>
                <option>6월</option>
            </select>
            <select className="week-dropdown">
                <option>첫째 주</option>
                <option>둘째 주</option>
            </select>
            <select className="day-dropdown">
                <option>1일</option>
                <option>2일</option>
            </select>
        </div>
    );
};

export default Dropdown;
