import React, { useEffect } from 'react';
import useElementSize from './useElementSize';
import '../CSS/DataVisualization.css';
import LineGraph from './LineGraph';

const DataVisualization = ({ filter, onDataUpdate }) => {
    const [ref, bodySize] = useElementSize();

    // LineGraph에서 데이터를 가져오는 효과를 위한 useEffect
    useEffect(() => {
        // 필터가 변경될 때마다 이 훅이 실행됨
        if (filter && onDataUpdate) {
            // LineGraph에서 사용하는 데이터를 직접 가져올 수 없으므로
            // 실제 구현에서는 여기서 동일한 데이터 패치 로직을 구현하거나
            // LineGraph에 onDataUpdate prop을 전달해야 함
            
            // 임시 예시 데이터 - 실제로는 여기서 API 호출 또는 LineGraph와 데이터를 공유하는 방식으로 구현해야 함
            const fetchData = async () => {
                try {
                    // 실제 API 호출 또는 데이터 로직이 필요함
                    const exampleData = [
                        { date: '2023-01-01', temperature: 24, humidity: 65, dustPM10: 45, dustPM25: 28 },
                        { date: '2023-01-02', temperature: 25, humidity: 62, dustPM10: 42, dustPM25: 25 },
                        { date: '2023-01-03', temperature: 23, humidity: 68, dustPM10: 48, dustPM25: 30 },
                        { date: '2023-01-04', temperature: 26, humidity: 60, dustPM10: 40, dustPM25: 22 },
                        { date: '2023-01-05', temperature: 22, humidity: 70, dustPM10: 50, dustPM25: 32 }
                    ];
                    
                    // 부모 컴포넌트에 데이터 전달
                    onDataUpdate(exampleData);
                } catch (error) {
                    console.error('데이터 가져오기 오류:', error);
                }
            };
            
            fetchData();
        }
    }, [filter, onDataUpdate]);

    return (
        <div>
            <div className='component-chart-grid' ref={ref}>
                <section className='upper-section'>
                    <p className='summing-up-text'>
                        <span style={{ fontSize: bodySize.width * 0.02 }} className='ascii-test'>
                            최근 측정된 온도와 습도 그래프입니다.
                        </span>
                    </p>
                    <hr className='graph-hr' />
                </section>

                <section className='middle-section'>
                    <LineGraph filter={filter} />
                </section>
            </div>
        </div>
    );
};

export default DataVisualization;