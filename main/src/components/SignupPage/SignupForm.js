import React, { useState } from "react";
import './SignupForm.css';

// const handleKeyDown = (e) => {
//     if(e.key === 'Enter'){

//     }
// }

// const onClickAccount = () => {
//     console.log(inputId)
// }s

const SignupForm = () => {

    const [inputId, setInputId] =useState('');

    const handleInput = (e) =>{
        setInputId(e.target.value);
    }

    const onClickAccount = () => {
        console.log("what is love?");
    }


    const InputField = ({ placeholder , icon, style}) => (

        <fieldset className="input-infotmation" style={style}>
            <div className="icon-frame">
                <i className={icon}></i>
            </div>
            <input type='text' className="regist" placeholder={placeholder}/>
        </fieldset>
    );



    return (
        <main>
            <div className="create-account-form">
                <InputField placeholder="아이디" icon="icon-id" style={{top: 0, left: 0 }} />
                <InputField placeholder="성명" icon="icon-name" style={{top: 0, right: 0 }} />
                <InputField placeholder="비밀번호" icon="icon-password" style={{bottom: 0, left: 0 }} />
                <InputField placeholder="전화번호" icon="icon-phone-number" style={{bottom: 0, right: 0 }} />
            </div>
            <button className="sign-in-btn" onClick={onClickAccount}>계정 생성</button>
        </main>
    );
};



export default SignupForm;