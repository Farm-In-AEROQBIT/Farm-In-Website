import React from "react";
import '../CSS/SignupFrame.css';

const SignupFrame = ({form, link}) => {
    return(
    <main>
        <section className='sign-up-templete'>
             {/* <div className="prototype"></div>  */}
                <div>
                    {link}
                </div>
                <div className="information-form">
                    {form}
                </div>
                <div className="logo-text-box">
                    <div className="frame-in-logo"></div>
                    <h1 className="sign-up-text">
                        <strong>팜인 </strong> 회원 가입하기
                        <div className="circle-point"></div>
                    </h1>
                </div>
        </section>
    </main>
    );
}
export default SignupFrame;