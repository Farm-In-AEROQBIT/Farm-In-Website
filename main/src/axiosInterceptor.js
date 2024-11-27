// axiosInstance.js
import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://118.42.54.88:8080', // 백엔드 API 주소
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // JWT 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // 토큰 만료 또는 인증 실패 시 처리
            alert('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
            window.location.href = '/'; // 로그인 페이지로 이동
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
