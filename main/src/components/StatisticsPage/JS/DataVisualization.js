import useElementSize from './useElementSize';
import '../CSS/DataVisualization.css';
import { useState, useEffect } from 'react';

const DataVisualization = () => {

    const [selectedButton, setSelectedButton] = useState('');

    const handleButtonClick = (index) => {
        // 클릭된 버튼의 인덱스를 상태에 저장
        setSelectedButton(index);
    };

    const [ref, bodySize] = useElementSize();

    const buttons = ['연도 통계', '월별 통계', '주간 통계', '하루 통계'];
    const [month, setMonth] = useState(7);
    const [week, setWeek] = useState(2);
    const [ingredient, setIngredient] = useState('이산화탄소');

    return(
        <div>
            <div className='component-chart-grid' ref={ref}>
                <section className='upper-section'>
                    <p className='summing-up-text'>
                        <span style={{fontSize: bodySize.width*0.02}} className='numeric-text'>{month}</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='ascii-test'>월&nbsp;</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='numeric-text'>{week}</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='ascii-test'>주차의&nbsp;</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='ascii-test'>{ingredient}</span>
                    </p>
                    <div className='btn-container'>
                        {buttons.map((button, index) => (
                            <button
                                style={{fontSize: bodySize.width*0.019}}
                                className={`period-btn ${selectedButton === index ? 'selected' : ''}`} // 선택된 버튼에 클래스 추가
                                key={index}
                                onClick={() => handleButtonClick(index)}
                            >
                                {button}
                        </button>
                        ))} 
                    </div>
                    <hr className='graph-hr'/>
                </section>


                <section className='middle-section'>
                </section>
            </div>
        </div>
    );
};

export default DataVisualization;