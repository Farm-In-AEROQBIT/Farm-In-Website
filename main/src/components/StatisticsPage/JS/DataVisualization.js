import useElementSize from './useElementSize';
import '../CSS/DataVisualization.css';
import { useState, useEffect } from 'react';
import LineGraph from './LineGraph';
import { fetchStatisticsByPeriod } from './statisticsAPI'; // API 함수 임포트

const DataVisualization = () => {
    const [selectedButton, setSelectedButton] = useState('');
    const [chartData, setChartData] = useState(null); // 차트 데이터 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가
    const [currentMonth, setCurrentMonth] = useState('');
    const [currentWeek, setCurrentWeek] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // 센서 종류 상태 추가 (이산화탄소, 암모니아, 온도, 습도, 미세먼지)
    const [selectedSensor, setSelectedSensor] = useState('이산화탄소');
    const sensors = ['이산화탄소', '암모니아', '온도', '습도', '미세먼지'];

    const handleSensorClick = (sensor) => {
        setSelectedSensor(sensor); // 선택된 센서로 상태 변경
    };

    const handleButtonClick = (index) => {
        // 클릭된 버튼의 인덱스를 상태에 저장
        setSelectedButton(index);
        fetchChartData(buttons[index]); // 버튼 클릭 시 API 호출
    };

    const [ref, bodySize] = useElementSize();

    const buttons = ['연도 통계', '월별 통계', '주간 통계', '하루 통계'];

    // 현재 시간 기준으로 날짜와 주차 계산
    useEffect(() => {
        const today = new Date();
        
        // 현재 달 계산
        const month = today.getMonth() + 1;
        setCurrentMonth(month);

        // 현재 주차 계산 (수정된 로직)
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 이번 달 1일
        const firstDayOfWeek = startOfMonth.getDay(); // 이번 달 1일의 요일 (0: 일요일, 1: 월요일, ...)
        const dayOfMonth = today.getDate();
        
        // 주차 계산 방법을 개선하여 올바른 주차 계산
        const week = Math.ceil((dayOfMonth + firstDayOfWeek) / 7); // 현재 주차 계산
        setCurrentWeek(week);

        // 조회 가능 기간 계산 (예시: 작년 1월 30일부터 오늘까지)
        const start = new Date(today.getFullYear() - 1, 0, 30); // 작년 1월 30일
        const end = today;

        setStartDate(start.toISOString().split('T')[0]); // YYYY-MM-DD 형식으로 변환
        setEndDate(end.toISOString().split('T')[0]); // YYYY-MM-DD 형식으로 변환
    }, []);

    // 통계 데이터를 API에서 가져오는 함수
    const fetchChartData = async (period) => {
        try {
            setError(null); // 이전 에러 초기화
            const data = await fetchStatisticsByPeriod(period); // 타임아웃 적용된 API 호출
            setChartData({
                labels: data.labels, // 예시: ['1월', '2월', '3월' ...]
                datasets: [
                    {
                        label: '측정 데이터',
                        data: data.values, // 예시: [65, 59, 80, 81 ...]
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        fill: true,
                        tension: 0.4,
                    },
                ],
            });
        } catch (error) {
            setError('기간별 데이터를 불러오는 데 실패했습니다.');
        }
    };

    return (
        <div>
            <div className='component-chart-grid' ref={ref}>
                <section className='upper-section'>
                    <p className='summing-up-text'>
                        <span style={{fontSize: bodySize.width*0.02}} className='numeric-text'>{currentMonth}</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='ascii-test'>월&nbsp;</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='numeric-text'>{currentWeek}</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='ascii-test'>주차의&nbsp;</span>
                        <span style={{fontSize: bodySize.width*0.02}} className='ascii-test'>{selectedSensor} 측정값입니다.&nbsp;</span>
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
                    {/* 차트 영역 */}
                    <div className='chart-area'>
                        {error ? (
                            <p style={{ color: 'red' }}>{error}</p>
                        ) : chartData ? (
                            <LineGraph data={chartData} />
                        ) : (
                            <p>데이터를 불러오는 중입니다...</p>
                        )}
                    </div>

                    {/* 버튼 영역 */}
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
