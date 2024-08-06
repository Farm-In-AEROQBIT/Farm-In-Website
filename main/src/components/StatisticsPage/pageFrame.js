import React from "react";
import { useState, useEffect } from 'react';
import './PageFrame.css';
import useScreenSize from "./useScreenSize";
import useMaxScreenSize from "./useMaxScreenSize";


const PageFrame = () => {
    const screenSize = useScreenSize();
    const maxScreenSize = useMaxScreenSize();

    return (
        <body>
            <header className="header" style = {{width: screenSize.width, height: (maxScreenSize.height)*0.087}}>
                <svg className="company-logo"></svg>
            </header>
            <h2 className="profile-bar" style = {{height: (maxScreenSize.height)*0.059}}>
                <div className="buttons-frame" style = {{left: maxScreenSize.width*0.018, width: maxScreenSize.width*0.15}}>
                    <button className="my-information-btn"> 내 정보 보기 </button>
                    <button className="log-out-btn"> 로그아웃</button>
                </div>
                <div className="profile-name-frame" style = {{right: maxScreenSize.width*0.018}}>
                    <div className="image-circle"></div>
                </div>
            </h2>
            <section>
                <image></image>
            </section>
            <h1>Screen Size Detection with React Hook</h1>
            <p>Width: {screenSize.width}</p>
            <p>Height: {screenSize.height}</p>
            <p>maxwidth: {maxScreenSize.width}</p>
            <p>maxheight: {maxScreenSize.height}</p>

        </body>
    );
};

export default PageFrame;