import React, { useState } from "react";
import './SignupForm.css';


// const InputField = ({ style, icon, placeholder, value, onChange, onKeyDown }) => (
//     <fieldset className="notice-frame" style={style}>
//         <div className="input-infotmation">
//             <div className="icon-frame">
//                 <i className={icon}></i>
//             </div>
//             <input type='text' className="regist" placeholder={placeholder} 
//                 value={value} onChange={onChange} onKeyDown={onKeyDown}/>
//         </div>
//     </fieldset>
// );




const SignupForm = () => {

    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const handleInputName = (e) =>{
        setInputName(e.target.value);
    }
    const handleInputNumber = (e) =>{
        setInputNumber(e.target.value);
    }


    const onClickAccount = () => {
        console.log(inputId+" "+inputPw+" "+inputName+" "+inputNumber);
    }

    const handleKeyDown =(e) => {
        if(e.key === 'Enter'){
            onClickAccount();
        }
    }

    // return (
    //     <main>
    //         <div className="create-account-form">
    //             <InputField style={{top: 0, left: 0 }} icon="icon-id" placeholder="아이디" value={inputId} onChange={handleInputId} onKeyDown={handleKeyDown}/>
    //             <InputField style={{top: 0, right: 0 }} icon="icon-password" placeholder="비밀번호" value={inputPw} onChange={handleInputPw} onKeyDown={handleKeyDown}/>
    //             <InputField style={{bottom: 0, left: 0 }} icon="icon-name" placeholder="성명" value={inputName} onChange={handleInputName} onKeyDown={handleKeyDown}/>
    //             <InputField style={{bottom: 0, right: 0 }} icon="icon-phone-number" placeholder="전화번호" value={inputNumber} onChange={handleInputNumber} onKeyDown={handleKeyDown}/>
    //         </div>
    //         <button className="sign-in-btn" onClick={onClickAccount}>계정 생성</button>
    //     </main>
    // );

    return (
        <main>
            <div className="create-account-form">
                <fieldset className="notice-frame" style={{top: 0, left:0}}>
                    <div className="input-infotmation">
                        <div className="item icon-frame">
                            <i className="icon-id"></i>
                        </div>
                        <input type='text' className="item regist" placeholder="아이디" 
                            value={inputId} onChange={handleInputId} onKeyDown={handleKeyDown}></input>
                        <button className="item confirm-overlap-btn">중복확인</button>
                    </div>
                    <p className="notice-text"> 숫자와 영문자를 섞어서 8자 이상으로 만들어주세요</p>
                </fieldset>
        
                <fieldset className="notice-frame" style={{bottom: 0, left:0}}>
                    <div className="input-infotmation">
                        <div className="item icon-frame">
                            <i className="icon-password"></i>
                        </div>
                        <input type='text' className="item regist" placeholder="비밀번호"
                            value={inputPw} onChange={handleInputPw} onKeyDown={handleKeyDown}></input>
                    </div>
                </fieldset>

                <fieldset className="notice-frame" style={{top: 0, right:0}}>
                    <div className="input-infotmation">
                        <div className="icon-frame">
                            <i className="icon-name"></i>
                        </div>
                        <input type='text' className="regist" placeholder="성명" 
                            value={inputName} onChange={handleInputName} onKeyDown={handleKeyDown}></input>
                    </div>
                </fieldset>

                <fieldset className="notice-frame" style={{bottom: 0, right: 0}}>
                    <div className="input-infotmation">
                        <div className="icon-frame">
                            <i className="icon-phone-number"></i>
                        </div>
                        <input type='text' className="regist" placeholder="전화 번호"
                            value={inputNumber} onChange={handleInputNumber} onKeyDown={handleKeyDown}></input>
                    </div>
                </fieldset>

            </div>
            <button className="sign-in-btn" onClick={onClickAccount}>계정 생성</button>
        </main>
    );


};





export default SignupForm;