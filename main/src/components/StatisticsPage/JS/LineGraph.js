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
} from 'chart.js';
import useElementSize from './useElementSize';
import axios from 'axios';  // axios 설치 필요: npm install axios

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

const LineGraph = () => {
    const [ref, size] = useElementSize();
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('YOUR_API_ENDPOINT');  // API 엔드포인트 변경 필요
                
                // 서버 응답 데이터 포맷 변환
                const formattedData = {
                    labels: response.data.map(item => `${item.month}월`),
                    datasets: [
                        {
                            data: response.data.map(item => item.value),
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
                
                setChartData(formattedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 차트 옵션 설정
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,  // 라벨 제거
            },
            title: {
                display: false,  // 타이틀 제거
            },
            tooltip: {
                enabled: true,  // 툴팁은 유지
                callbacks: {
                    label: function(context) {
                        return `${context.parsed.y}`;  // 툴팁 텍스트 커스텀
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
                    font: {
                        family: 'Nanum Gothic',
                        size: size.width * 0.012
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
                        size: size.width * 0.012
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

    // 로딩 상태 처리
    if (loading) {
        return <div ref={ref} style={containerStyle}>Loading...</div>;
    }

    // 에러 상태 처리
    if (error) {
        return <div ref={ref} style={containerStyle}>Error: {error}</div>;
    }

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