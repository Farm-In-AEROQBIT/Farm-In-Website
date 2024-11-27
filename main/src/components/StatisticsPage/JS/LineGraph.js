import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import useElementSize from './useElementSize';
import axiosInstance from '../../../axiosInstance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ selectedSensor, selectedButton }) => {
    const [ref, size] = useElementSize();
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sensorUnits = {
        '이산화탄소': 'ppm',
        '암모니아': 'ppm',
        '온도': '°C',
        '습도': '%',
        '미세먼지': 'μg/m³'
    };

    const labelsMap = {
        0: '연도 통계',
        1: '월별 통계',
        2: '주간 통계',
        3: '하루 통계',
    };

    const fetchChartData = async () => {
        setLoading(true);
        setError(null);
    
        try {
            console.log('데이터 요청 시작:', { selectedSensor, selectedButton });
    
            const response = await axiosInstance.get('/api/growingsensors/statistics', {
                params: {
                    type: 'yearly', // 기본값 설정
                    year: '2024',
                    sensorType: selectedSensor,
                },
            });
    
            console.log('데이터 요청 성공:', response.data);
    
            const { labels, averages } = response.data;
    
            const newData = {
                labels,
                datasets: [
                    {
                        label: `${selectedSensor} 측정값 (${sensorUnits[selectedSensor]})`,
                        data: averages,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        pointBackgroundColor: 'rgb(75, 192, 192)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(75, 192, 192)',
                    },
                ],
            };
    
            setChartData(newData);
        } catch (err) {
            console.error('데이터 요청 실패:', err);
            setError('데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };        

    useEffect(() => {
        fetchChartData();
    }, [selectedSensor, selectedButton]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: 'Nanum Gothic',
                        size: size.width * 0.015 // 반응형 폰트 크기
                    }
                }
            },
            title: {
                display: true,
                text: `${selectedSensor} 측정 데이터 (${sensorUnits[selectedSensor]})`,
                font: {
                    family: 'Nanum Gothic',
                    size: size.width * 0.02, // 반응형 폰트 크기
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw; // 데이터 값
                        const unit = sensorUnits[selectedSensor] || ''; // 센서 단위
                        return `${value} ${unit}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    callback: (value) => `${value} ${sensorUnits[selectedSensor] || ''}`, // Y축에 단위 추가
                    font: {
                        family: 'Nanum Gothic',
                        size: size.width * 0.012 // 반응형 폰트 크기
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    font: {
                        family: 'Nanum Gothic',
                        size: size.width * 0.012 // 반응형 폰트 크기
                    }
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 4,
                hoverRadius: 6
            }
        }
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box'
    };

    return (
        <div ref={ref} style={containerStyle}>
            {loading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}
            {chartData && (
                <Line 
                    data={chartData} 
                    options={options}
                    width={size.width}
                    height={size.height}
                />
            )}
        </div>
    );
};

export default LineGraph;
