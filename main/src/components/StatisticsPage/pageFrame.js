import React from "react";
import { useState, useEffect } from 'react';
import './PageFrame.css';

// const useScreenSize = () => {
//     const []
// }



const PageFrame = () => {

    const [width, setWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
    
        // Resize 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return(
        <main className="backgrond" style = {{width: width}}>
            <div className="header"></div>
        </main>
    );
}; 

export default PageFrame;
