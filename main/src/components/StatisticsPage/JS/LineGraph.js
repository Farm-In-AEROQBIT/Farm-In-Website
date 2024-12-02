// LineGraph.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
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
  Legend,
  TimeScale
);

const LineGraph = ({ selectedSensor, selectedButton }) => {
  const [ref, size] = useElementSize();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastRequest, setLastRequest] = useState({ sensor: null, button: null });

  // 통계 타입을 반환
  const getStatisticsType = (buttonIndex) => {
    switch (buttonIndex) {
      case 0: return 'yearly';
      case 1: return 'monthly';
      case 2: return 'weekly';
      case 3: return 'daily';
      default: return 'yearly';
    }
  };

  // X축 시간 단위를 반환
  const getTimeUnit = (buttonIndex) => {
    switch (buttonIndex) {
      case 0: return 'year';
      case 1: return 'month';
      case 2: return 'week';
      case 3: return 'day';
      default: return 'year';
    }
  };

  // 센서 단위 설정
  const sensorUnits = {
    '이산화탄소': 'ppm',
    '암모니아': 'ppm',
    '온도': '°C',
    '습도': '%',
    '미세먼지': 'μg/m³'
  };

  // 데이터 가져오기
  const fetchChartData = async () => {
    if (loading || 
        (lastRequest.sensor === selectedSensor && lastRequest.button === selectedButton)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('데이터 요청 시작:', { selectedSensor, selectedButton });

      const response = await axiosInstance.get('/api/growingsensors/statistics', {
        params: {
          type: getStatisticsType(selectedButton),
          year: '2024',
          sensorType: selectedSensor,
        },
      });

      console.log('데이터 요청 성공:', response.data);

      const fieldMap = {
        '이산화탄소': 'co2',
        '암모니아': 'nh3',
        '온도': 'temper',
        '습도': 'humidity',
        '미세먼지': 'pm',
      };

      const sortedData = [...response.data].sort((a, b) => new Date(a.time) - new Date(b.time));

      const labels = sortedData.map(item => new Date(item.time));
      const data = sortedData.map(item => {
        const value = parseFloat(item[fieldMap[selectedSensor]]);
        return isNaN(value) ? null : value;
      });

      console.log('Sorted Labels:', labels);
      console.log('Sorted Data:', data);

      const newData = {
        labels: labels,
        datasets: [
          {
            label: `${selectedSensor} 측정값 (${sensorUnits[selectedSensor]})`,
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointBackgroundColor: 'rgb(75, 192, 192)',
            pointHoverRadius: 5,
          },
        ],
      };

      setChartData(newData);
      setLastRequest({ sensor: selectedSensor, button: selectedButton });
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

  // 차트 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false, // 높이 유지 방지
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Nanum Gothic',
            size: size.width * 0.015,
          }
        }
      },
      title: {
        display: true,
        text: `${selectedSensor} 측정 데이터 (${sensorUnits[selectedSensor]})`,
        font: {
          family: 'Nanum Gothic',
          size: size.width * 0.02,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} ${sensorUnits[selectedSensor] || ''}`,
          font: {
            family: 'Nanum Gothic',
            size: size.width * 0.012
          }
        }
      },
      x: {
        type: 'time',
        time: {
          unit: getTimeUnit(selectedButton),
          displayFormats: {
            year: 'yyyy',
            month: 'yyyy-MM',
            week: 'yyyy-MM-dd',
            day: 'yyyy-MM-dd HH:mm'
          }
        },
        ticks: {
          font: {
            family: 'Nanum Gothic',
            size: size.width * 0.012
          }
        }
      }
    }
  };

  const containerStyle = {
    width: '100%',
    height: '410px', // 고정된 높이로 설정
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
          height={450} // 고정된 높이 전달
        />
      )}
    </div>
  );
};

export default LineGraph;
