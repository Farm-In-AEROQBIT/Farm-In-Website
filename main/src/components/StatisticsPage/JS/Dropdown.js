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
                <option>1월</option>
                <option>2월</option>
                <option>3월</option>
                <option>4월</option>
                <option>5월</option>
                <option>6월</option>
                <option>7월</option>
                <option>8월</option>
                <option>9월</option>
                <option>10월</option>
                <option>11월</option>
                <option>12월</option>
            </select>
            <select className="week-dropdown">
                <option>첫째 주</option>
                <option>둘째 주</option>
                <option>셋째 주</option>
                <option>넷째 주</option>
                <option>다섯째 주</option>
            </select>
            <select className="day-dropdown">
                <option>1일</option>
                <option>2일</option>
                <option>3일</option>
                <option>4일</option>
                <option>5일</option>
                <option>6일</option>
                <option>7일</option>
                <option>8일</option>
                <option>9일</option>
                <option>10일</option>
                <option>11일</option>
                <option>12일</option>
                <option>13일</option>
                <option>14일</option>
                <option>15일</option>
                <option>16일</option>
                <option>17일</option>
                <option>18일</option>
                <option>19일</option>
                <option>20일</option>
                <option>21일</option>
                <option>22일</option>
                <option>23일</option>
                <option>24일</option>
                <option>25일</option>
                <option>26일</option>
                <option>27일</option>
                <option>28일</option>
                <option>29일</option>
                <option>30일</option>
                <option>31일</option>
            </select>
        </div>
    );
};

export default Dropdown;
