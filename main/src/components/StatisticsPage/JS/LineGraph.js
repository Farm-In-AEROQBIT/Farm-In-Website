import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 차트 색상 배열
const CHART_COLORS = [
  'rgb(255, 99, 132)',  // 빨강
  'rgb(54, 162, 235)',  // 파랑
  'rgb(75, 192, 192)',  // 청록
  'rgb(255, 159, 64)',  // 주황
  'rgb(153, 102, 255)', // 보라
  'rgb(201, 203, 207)', // 회색
  'rgb(255, 205, 86)'   // 노랑
];

const LineGraph = ({ filter }) => {
  const chartContainer = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("LineGraph filter 변경:", filter);
    
    if (!filter || !filter.showGraph) {
      console.log("필수 필터 정보 없음");
      setChartData(null); // 차트 데이터 초기화
      return; // 필요한 필터 정보가 없으면 그래프를 표시하지 않음
    }

    // 실제로 필요한 모든 데이터가 있는지 확인
    if (!filter.sectionId || !filter.sectionType || !filter.sensors || !Array.isArray(filter.sensors) || filter.sensors.length === 0) {
      console.log("필터 정보가 있지만 필수 데이터가 없음:", filter);
      setError("필요한 센서 데이터가 없습니다.");
      setChartData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 센서 데이터 배열
      const sensorsData = filter.sensors;
      
      if (sensorsData.length === 0) {
        setError("선택한 섹션에 센서 데이터가 없습니다.");
        setLoading(false);
        setChartData(null);
        return;
      }

      console.log("처리할 센서 데이터:", sensorsData.length);

      // 시간 필드 이름 확인 (timestamp 또는 time)
      const timeField = sensorsData[0].timestamp ? 'timestamp' : 'time';
      
      // 모든 센서 데이터 시간별로 정렬
      const sortedData = [...sensorsData]
        .sort((a, b) => new Date(a[timeField]) - new Date(b[timeField]));
      
      // 최근 50개의 데이터만 사용
      const recentData = sortedData.slice(Math.max(0, sortedData.length - 50));

      // 시간 레이블 만들기
      const labels = recentData.map(item => {
        const time = item[timeField];
        return time ? new Date(time).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }) : '';
      });

      // 데이터셋 만들기
      const datasets = [];
      
      // 온도 데이터 추가
      if (recentData.some(item => item.temperature || item.temper)) {
        const tempField = recentData.some(item => item.temperature) ? 'temperature' : 'temper';
        datasets.push({
          label: "온도 (°C)",
          data: recentData.map(item => parseFloat(item[tempField] || 0)),
          borderColor: CHART_COLORS[0],
          backgroundColor: `${CHART_COLORS[0]}33`,
          tension: 0.3,
          pointRadius: 2
        });
      }
      
      // 습도 데이터 추가
      if (recentData.some(item => item.humidity)) {
        datasets.push({
          label: "습도 (%)",
          data: recentData.map(item => parseFloat(item.humidity || 0)),
          borderColor: CHART_COLORS[1],
          backgroundColor: `${CHART_COLORS[1]}33`,
          tension: 0.3,
          pointRadius: 2
        });
      }
      
      // CO2 데이터 추가
      if (recentData.some(item => item.co2)) {
        datasets.push({
          label: "CO2 (ppm)",
          data: recentData.map(item => parseFloat(item.co2 || 0)),
          borderColor: CHART_COLORS[2],
          backgroundColor: `${CHART_COLORS[2]}33`,
          tension: 0.3,
          pointRadius: 2
        });
      }
      
      // 수온 데이터 추가 (water_temperature 필드 추가)
      if (recentData.some(item => item.wtemper || item.waterTemperature || item.water_temperature)) {
        // 세 가지 가능한 필드명 중 존재하는 것 확인
        const waterTempField = recentData.some(item => item.water_temperature) ? 'water_temperature' : 
                              recentData.some(item => item.wtemper) ? 'wtemper' : 'waterTemperature';
        
        console.log("수온 데이터 필드 발견:", waterTempField);
        
        datasets.push({
          label: "수온 (°C)",
          data: recentData.map(item => parseFloat(item[waterTempField] || 0)),
          borderColor: CHART_COLORS[3],
          backgroundColor: `${CHART_COLORS[3]}33`,
          tension: 0.3,
          pointRadius: 2
        });
      }

      console.log("차트 데이터 준비 완료:", labels.length, datasets.length);
      
      if (labels.length === 0 || datasets.length === 0) {
        setError("표시할 데이터가 없습니다.");
        setChartData(null);
      } else {
        // 차트 데이터 설정
        setChartData({
          labels,
          datasets
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error("그래프 데이터 처리 오류:", err);
      setError("데이터를 처리하는 중 오류가 발생했습니다.");
      setChartData(null);
      setLoading(false);
    }
  }, [filter]);

  if (!filter || !filter.showGraph) {
    return <div className="chart-placeholder">돈사를 선택하고 정보 조회 버튼을 눌러주세요.</div>;
  }

  return (
    <div 
      className="chart-container" 
      ref={chartContainer} 
      style={{ 
        width: '100%', 
        height: '400px', 
        maxHeight: '400px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {loading && <div className="loading-overlay">데이터를 불러오는 중입니다...</div>}
      {error && <div className="error-message">{error}</div>}
      {!chartData && !loading && !error && <div className="no-data-message">표시할 데이터가 없습니다.</div>}
      {chartData && (
        <Line 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            resizeDelay: 200,
            animation: {
              duration: 500
            },
            layout: {
              padding: {
                top: 10,
                right: 25,
                bottom: 10,
                left: 10
              }
            },
            plugins: {
              title: {
                display: true,
                text: `${filter.barnType || ''} 센서 데이터 (${filter.snFarmId || ''})`,
                font: {
                  size: 16
                },
                padding: {
                  top: 10,
                  bottom: 20
                }
              },
              legend: {
                position: 'top',
                labels: {
                  boxWidth: 15,
                  padding: 15
                }
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                boxWidth: 0,
                usePointStyle: true
              }
            },
            hover: {
              mode: 'nearest',
              intersect: false
            },
            scales: {
              x: {
                type: 'category',
                grid: {
                  display: false
                },
                ticks: {
                  maxRotation: 45,
                  minRotation: 0
                },
                title: {
                  display: true,
                  text: '측정 시간',
                  padding: {top: 10, bottom: 0}
                }
              },
              y: {
                type: 'linear',
                beginAtZero: false,
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                },
                title: {
                  display: true,
                  text: '측정값',
                  padding: {top: 0, bottom: 10}
                }
              }
            }
          }} 
        />
      )}
    </div>
  );
};

export default LineGraph;