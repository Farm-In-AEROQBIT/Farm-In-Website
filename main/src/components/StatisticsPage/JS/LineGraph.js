import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// ChartJS의 플러그인 등록
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ ingredient, period }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 서버에서 데이터를 가져오는 함수
    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('/api/graph-data', { // 실제 API 엔드포인트로 변경해야 함
    //             params: {
    //                 ingredient,
    //                 period,
    //             },
    //         });
    //         setData(response.data);
    //         setLoading(false);
    //     } catch (error) {
    //         setError(error);
    //         setLoading(false);
    //     }
    // };

    // 더미 데이터
    const getDummyData = () => {
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            values: [65, 59, 80, 81, 56, 55, 40]
        };
    };

    const fetchData = async () =>{
        try{
            const response =- await getDummyData({
                params: {
                    ingredient,
                    period,
                },
        });
        }
        catch(error){
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (ingredient && period) {
            // 서버에서 데이터 가져오기
            console.log('Fetching data with:', ingredient, period); // 데이터 로그
            fetchData();
        } else {
            // 더미 데이터 사용
            const dummyData = getDummyData();
            console.log('Using dummy data:', dummyData); // 더미 데이터 로그
            setData(dummyData);
            setLoading(false);
        }
    }, [ingredient, period]);

    // 차트의 데이터와 옵션 설정
    const chartData = {
        labels: data.labels || [],
        datasets: [
            {
                label: 'Value',
                data: data.values || [],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderWidth: 1,
                tension: 0.1, // 꺽은선 그래프의 곡선 정도 조절
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `Value: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="graph-container">
            <h2 className="title-box">Graph Title</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineGraph;
