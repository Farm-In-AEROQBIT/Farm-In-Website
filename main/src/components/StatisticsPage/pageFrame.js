import React from "react";
import { useState, useEffect } from 'react';
import './PageFrame.css';
import useScreenSize from "./useScreenSize";
import useMaxScreenSize from "./useMaxScreenSize";
import {useNavigate} from 'react-router-dom';


const PageFrame = () => {
    const screenSize = useScreenSize();
    const maxScreenSize = useMaxScreenSize();
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
    }

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
            <body className="contents-container">
                <section className="image-container">
                    <img className="header-image"></img>
                    <img className="overlay"></img>
                    <div className="link-slogan-container">
                        <p className="slogan">휴머니즘이 살아있는<br/>환경 기술</p>
                        <div className="icon-link-box">
                            <p className="link-homePage">홈페이지 링크</p>
                            <img className="link-icon"></img>
                        </div>
                    </div>
                </section>
                <hr className="upper-hr"/>
                <div className="test"></div>
            </body>

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