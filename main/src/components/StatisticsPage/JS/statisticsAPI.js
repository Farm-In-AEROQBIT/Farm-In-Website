import axios from 'axios';

const BASE_URL = 'API_URL';  // API 기본 URL 설정

export const fetchStatisticsData = async (params) => {
    try {
        const response = await axios.get(`${BASE_URL}/statistics`, { params });
        return response.data;
    } catch (error) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
    }
};

// 필요한 경우 다른 API 함수들 추가
export const fetchStatisticsByPeriod = async (period) => {
    try {
        const response = await axios.get(`${BASE_URL}/statistics/${period}`);
        return response.data;
    } catch (error) {
        throw new Error('기간별 데이터를 불러오는데 실패했습니다.');
    }
};