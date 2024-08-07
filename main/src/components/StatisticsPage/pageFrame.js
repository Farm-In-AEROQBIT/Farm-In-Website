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
            {/* <section className="image-container" style ={{width: (maxScreenSize.width)*0.65, height: (maxScreenSize.height)*0.55}}>
                <image className="header-image"></image>

                <image className="overlay"></image>
            </section> */}

            {/* <h1>Screen Size Detection with React Hook</h1>
            <p>Width: {screenSize.width}</p>
            <p>Height: {screenSize.height}</p>
            <p>maxwidth: {maxScreenSize.width}</p>
            <p>maxheight: {maxScreenSize.height}</p> */}

        </div>
    );
};

export default PageFrame;