import React from "react";
import './SignupForm.css';

const InputField = ({ placeholder , icon, style}) => (
    <fieldset className="input-infotmation" style={style}>
        <div className="icon-frame">
            <i className={icon}></i>
        </div>
        <input type='text' className="regist" placeholder={placeholder} />
    </fieldset>
);

const SignupForm = () => {
    return (
        <main>
            <div className="create-account-form">
                <InputField placeholder="아이디" icon="icon-id" style={{top: 0, left: 0 }} />
                <InputField placeholder="성명" icon="icon-name" style={{top: 0, right: 0 }} />
                <InputField placeholder="비밀번호" icon="icon-password" style={{bottom: 0, left: 0 }} />
                <InputField placeholder="전화번호" icon="icon-phone-number" style={{bottom: 0, right: 0 }} />
            </div>
            <div className="sign-in-btn">계정 생성</div>
        </main>
    );
};



export default SignupForm;