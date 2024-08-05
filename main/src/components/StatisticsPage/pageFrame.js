import React from "react";
import { useState, useEffect } from 'react';
import './PageFrame.css';
import useScreenSize from "./useScreenSize";



const PageFrame = () => {

    const screenSize = useScreenSize;

    return(
        <main className="backgrond" style = {{width: screenSize.width}}>
            <div className="header"></div>
        </main>
    );
}; 

export default PageFrame;
