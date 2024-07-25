import React from "react";
import './LinkSignIn.css';
import {useNavigate} from 'react-router-dom';

const LinkSingIn = () => {

    const navigate = useNavigate();

    const onClickLink = () => {
        console.log('clariS click!')
        navigate("/signup");
    }


    return(
        <main>
            <div className="question">
                아직 팜인 회원이 아니신가요?
            </div>
            <button className="create-account" onClick={onClickLink}>
                계정 만들기
            </button>
        </main>
    ); 
};

export default LinkSingIn;