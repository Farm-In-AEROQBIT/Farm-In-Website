import React, {useState, useEffect} from 'react';
import './Form.css';

const Form = () => {

    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickLogin = () => {
        console.log('click login '+inputId+inputPw)
    }



    return(
        <section>
            <div className='log-in-box'>

                <div className='text-box-frame'>
                <div className='icon-id'></div>
                    <input type="text" className="input-id" placeholder='아이디'
                    value={inputId} onChange={handleInputId}/>
                </div>

                <div className='text-box-frame'>
                    <div className='icon-lock'></div>
                    <input type="text" className='input-password' placeholder='비밀번호'
                    value={inputPw} onChange={handleInputPw}/>
                </div>

                <div className='log-in-btn' onClick={onClickLogin}>
                    로그인
                </div>
            </div>
        </section>
    );
};
export default Form;


