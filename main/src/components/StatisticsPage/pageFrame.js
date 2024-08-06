import React from "react";
import { useState, useEffect } from 'react';
import './PageFrame.css';
import useScreenSize from "./useScreenSize";
import useMaxScreenSize from "./useMaxScreenSize";


const PageFrame = () => {
    const screenSize = useScreenSize();
    const maxScreenSize = useMaxScreenSize();

    return (
        <main>
            <header className="header" style = {{width: screenSize.width}}>
                <svg className="company-logo"></svg>
            </header>
            <h2 className="profile-bar" style = {{height: (screenSize.height)*0.5}}></h2>
            <h1>Screen Size Detection with React Hook</h1>
            <p>Width: {screenSize.width}</p>
            <p>Height: {screenSize.height}</p>
            <p>maxwidth: {maxScreenSize.width}</p>
            <p>maxheight: {maxScreenSize.height}</p>
        </main>
    );
};

export default PageFrame;