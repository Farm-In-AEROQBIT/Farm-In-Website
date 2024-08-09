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
            <section className="image-container" >
                <img className="header-image"></img>

                <img className="overlay"></img>
                <div className="link-slogan-container">
                    <p className="slogan">회사 슬로건</p>
                    <p className="link-homePage">홈페이지 링크</p>
                    {/* <button className="link-homePage" img src = "">
                        tonight vegas
                    </button> */}
                </div>
            </section>

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