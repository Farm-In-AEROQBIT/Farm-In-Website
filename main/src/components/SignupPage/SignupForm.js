import React from "react";
import './SignupForm.css';

const InputField = ({ placeholder , icon, style}) => (
    <fieldset className="input-form" style={style}>
        <div className="icon-frame">
            <i className={icon}></i>
        </div>
        <input type='text' className="regist" placeholder={placeholder} />
    </fieldset>
);

const SignupForm = () => {
    return (
        <main>
            <fieldset className="information">
                <InputField placeholder="아이디" icon="icon-id" style={{top: 0, left: 0 }} />
                <InputField placeholder="성명" icon="icon-name" style={{top: 0, right: 0 }} />
                <InputField placeholder="비밀번호" icon="icon-password" style={{bottom: 0, left: 0 }} />
                <InputField placeholder="전화번호" icon="icon-phone-number" style={{bottom: 0, right: 0 }} />
            </fieldset>
        </main>
    );
};

export default SignupForm;