import React from "react";
import './SignupForm.css';

const InputField = ({ placeholder , icon, style}) => (
    <fieldset className="input-form" style={style}>
        <div className="icon-frame">
            <i className={icon}></i>
        </div>
        <input type='text' className="regist-id" placeholder={placeholder} />
    </fieldset>
);

const SignupForm = () => {
    return (
        <main>
            <InputField placeholder="아이디" icon="icon-id" style={{top: 0, left: 0 }} />
            <InputField placeholder="비밀번호" icon="icon-password" style={{top: 0, right: 0 }} />
        </main>
    );
};

export default SignupForm;