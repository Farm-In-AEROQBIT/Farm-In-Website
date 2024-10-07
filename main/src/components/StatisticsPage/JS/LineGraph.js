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

const LineGraph = () => {
    const [ref, size] = useElementSize();
    const [chartData, setChartData] = useState(null);

    // 차트 데이터 설정
    useEffect(() => {
        const data = {
            labels: [
                '1월', '2월', '3월', '4월', '5월', '6월', 
                '7월', '8월', '9월', '10월', '11월', '12월'
            ],
            datasets: [
                {
                    label: '측정값',
                    data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
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
        setChartData(data);
    }, []);

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
                text: '월별 측정 데이터',
                font: {
                    family: 'Nanum Gothic',
                    size: size.width * 0.02, // 반응형 폰트 크기
                    weight: 'bold'
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