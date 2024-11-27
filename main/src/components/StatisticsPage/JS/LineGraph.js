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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ selectedSensor }) => {
    const [ref, size] = useElementSize();
    const [chartData, setChartData] = useState(null);

    const sensorUnits = {
        '이산화탄소': 'ppm',
        '암모니아': 'ppm',
        '온도': '°C',
        '습도': '%',
        '미세먼지': 'μg/m³'
    };

    // 센서에 따른 차트 데이터 설정
    useEffect(() => {
        let data = [];
        switch (selectedSensor) {
            case '이산화탄소':
                data = [763, 587, 587, 589, 590, 594, 593, 576, 572, 607, 744];
                break;
            case '암모니아':
                data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                break;
            case '온도':
                data = [0, 5, 10, 18, 26, 35, 34, 36, 30, 22, 24];
                break;
            case '습도':
                data = [20, 26, 27, 38, 50, 60, 67, 36, 28, 28, 28];
                break;
            case '미세먼지':
                data = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                break;
            default:
                data = [];
        }

        // 차트 데이터 설정
        const newData = {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            datasets: [
                {
                    label: `${selectedSensor} 측정값`,
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    pointBackgroundColor: 'rgb(75, 192, 192)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(75, 192, 192)'
                }
            ]
        };

        setChartData(newData);
    }, [selectedSensor]);  // 선택된 센서가 변경될 때마다 차트 데이터 변경

    // 차트 옵션 설정
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

    // 차트 컨테이너 스타일
    const containerStyle = {
        width: '100%',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box'
    };

    return (
        <div ref={ref} style={containerStyle}>
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
