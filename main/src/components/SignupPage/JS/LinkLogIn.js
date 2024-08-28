import React from "react";
import './LinkLogIn.css';
import {useNavigate} from 'react-router-dom';

const LinkLigIn = () => {

    const navigate = useNavigate();

    const onClickLink = () => {
        navigate("/");
    }

    return(
        <main>
            <p className="have-account">이미 팜인 계정을 가지고 있으신가요?</p>
            <button className="turn-back-log-in" onClick={onClickLink}>로그인 화면 돌아가기</button>
        </main>

    );
};

export default LinkLigIn;

