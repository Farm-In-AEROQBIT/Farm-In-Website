import React from 'react';
import './Form.css';

const Form = () => {
    return(
        <section>
            <div className='log-in-box'>

                <div className='text-box-frame'>
                <div className='icon-id'></div>
                    <input type="text" className="input-id" placeholder='아이디'/>
                </div>

                <div className='text-box-frame'>
                    <div className='icon-lock'></div>
                    <input type="text" className='input-password' placeholder='비밀번호'/>
                </div>

                <div className='log-in-btn'>
                    로그인
                </div>
            </div>
        </section>
    );
};
export default Form;