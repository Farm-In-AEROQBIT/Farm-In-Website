import useElementSize from './useElementSize';
import '../CSS/DataVisualization.css';
import { useState, useEffect } from 'react';
import LineGraph from './LineGraph';

const DataVisualization = () => {
    const [selectedButton, setSelectedButton] = useState('');
    const [selectedSensor, setSelectedSensor] = useState('이산화탄소'); // 선택된 센서 상태

    const sensors = ['이산화탄소', '암모니아', '온도', '습도', '미세먼지'];
    const [ref, bodySize] = useElementSize();
    const buttons = ['연도 통계', '월별 통계', '주간 통계', '하루 통계'];

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };

    // 센서 클릭 시 센서를 설정하는 함수
    const handleSensorClick = (sensor) => {
        setSelectedSensor(sensor);  // 선택된 센서를 상태로 설정
    };

    return (
        <div>
            <div className='component-chart-grid' ref={ref}>
                <section className='upper-section'>
                    <p className='summing-up-text'>
                        <span style={{fontSize: bodySize.width * 0.02}} className='numeric-text'>10</span>
                        <span style={{fontSize: bodySize.width * 0.02}} className='ascii-test'>월&nbsp;</span>
                        <span style={{fontSize: bodySize.width * 0.02}} className='numeric-text'>3</span>
                        <span style={{fontSize: bodySize.width * 0.02}} className='ascii-test'>주차의&nbsp;</span>
                        <span style={{fontSize: bodySize.width * 0.02}} className='ascii-test'>{selectedSensor}의 측정값입니다.&nbsp;</span>
                    </p>
                    <div className='btn-container'>
                        {buttons.map((button, index) => (
                            <button
                                style={{fontSize: bodySize.width * 0.019}}
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
                    {/* 선택된 센서를 LineGraph로 전달 */}
                    <LineGraph selectedSensor={selectedSensor} />
                    
                    {/* 센서 선택 버튼 */}
                    <div className='button-area'>
                        <div className='sensor-btn-container'>
                            {sensors.map((sensor) => (
                                <button
                                    key={sensor}
                                    className={`sensor-btn ${selectedSensor === sensor ? 'selected' : ''}`} // 선택된 센서 강조
                                    onClick={() => handleSensorClick(sensor)}
                                >
                                    {sensor}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DataVisualization;
