import React from "react";
import './SignupForm.css';

const SignupForm = () => {
    return(
    <main>
        <div className="input-form">
            <div className="icon-frame">
                <div className="icon-id"></div>
            </div>
            <input type='text' className="regist-id" placeholder="아이디"></input> 
        </div>
    </main>
 
    );
};

export default SignupForm;