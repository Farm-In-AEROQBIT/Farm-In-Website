import React from "react";
import { useState, useEffect } from 'react';
import '../CSS/PageFrame.css';
import useScreenSize from "./useScreenSize";
import useMaxScreenSize from "./useMaxScreenSize";
import {useNavigate} from 'react-router-dom';
import useElementSize from './useElementSize';


const PageFrame = ({statistic}) => {
    const screenSize = useScreenSize();
    const maxScreenSize = useMaxScreenSize();
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    }

    const [ref, bodySize] = useElementSize();
    
    return (
        
        <div>
            <header className="header">
                <svg className="company-logo"></svg>
            </header>
            <h2 className="profile-bar">
                <div className="buttons-frame" onClick={onClick} style = {{left: maxScreenSize.width*0.018}}>
                    <button className="my-information-btn"> 내 정보 보기 </button>
                    <button className="log-out-btn"> 로그아웃</button>
                </div>
                <div className="profile-name-frame" style = {{right: maxScreenSize.width*0.018}}>   
                    <div className="image-circle"></div>
                </div>
            </h2>
            <body className="contents-container" ref={ref}>
                <section className="image-container">
                    <img className="header-image"></img>
                    <img className="overlay"></img>
                    <div className="link-slogan-container">
                        <p className="slogan">휴머니즘이 살아있는<br/>환경 기술</p>
                        <div className="icon-link-box">
                        <a href="http://www.farm-in.kr" target="_blank" rel="noopener noreferrer" className="link-homePage">
                                홈페이지 링크
                            </a>
                            <img className="link-icon"></img>
                        </div>
                    </div>
                </section>  
                <hr className="top-hr"/>
                {statistic}
            </body>
            <footer className="footer-box">
                <div className="information-left">
                    <img className="footer-logo"></img>
                    <p class="Nanum-bold company-name" style={{fontSize: (bodySize.width/62)}}>주식회사 팜인</p>
                    <p class="Nanum contact-way" style={{fontSize: (bodySize.width/80)}}>대전광역시 유성구 테크노 9로 35 IT 벤처타운 407호 (우:34027)</p>
                </div>
                <div className="information-right">
                    <p className= "Nanum-bold contact " style={{fontSize: (bodySize.width/61)}}>CONTACT US</p>
                    <p className="information">
                        <span className="Nanum-bold contact-way" style={{fontSize: (bodySize.width/71)}}>TEL</span>
                        <span className="Nanum contact-way" style={{fontSize: (bodySize.width/71)}}>&nbsp;&nbsp;042-880-5905</span>
                    </p>
                    <p className="information">
                        <span className="Nanum-bold contact-way" style={{fontSize: (bodySize.width/71)}}>FAX</span>
                        <span className="Nanum contact-way" style={{fontSize: (bodySize.width/71)}}>&nbsp;&nbsp;0508-958-1530</span>
                    </p>
                    <p className="information">
                        <span className="Nanum-bold contact-way" style={{fontSize: (bodySize.width/71)}}>E-MAIL</span>
                        <span className="Nanum contact-way" style={{fontSize: (bodySize.width/71)}}>&nbsp;&nbsp;farmin0130@farm-in.kr</span>
                    </p>
                </div>
            </footer>

            {/* <h1>Screen Size Detection with React Hook</h1>
            <p>Width: {screenSize.width}</p>
            <p>Height: {screenSize.height}</p>
            <p>maxwidth: {maxScreenSize.width}</p>
            <p>maxheight: {maxScreenSize.height}</p>
            <p>maxheight: {(maxScreenSize.width)*0.65}</p> */}

        </div>
    ); 
};

export default PageFrame;