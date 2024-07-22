import React from "react";
import './LinkSignIn.css';
import {useNavigate} from 'react-router-dom';

const linkSingIn = () => {

    const onClickLink = () => {

        console.log('clariS click!')
        /*
        const navigate = useNavigate();
        navigate('/about');
        */
    }


    return(
        <main>
            <div className="question">
                아직 팜인 회원이 아니신가요?
            </div>
            <div className="create-account" onClick={onClickLink}>
                계정 만들기
            </div>
        </main>
    ); 
};

export default linkSingIn;