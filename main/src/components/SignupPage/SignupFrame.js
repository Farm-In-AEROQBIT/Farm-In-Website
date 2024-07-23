import React from "react";
import './SignupFrame.css';

const SignupFrame = ({form}) => {
    return(
    <main>
        <section className='sign-up-templete'>
            <div className="information-form">
                {form}
            </div>
            <div className="logo-text-box">
                <div className="fram-in-logo"></div>
                <div className="sign-up-text">
                    <strong>팜인 </strong> 회원 가입하기
                    <div className="circle-point"></div>
                </div>
            </div>
        </section>
    </main>
    );
}
export default SignupFrame;