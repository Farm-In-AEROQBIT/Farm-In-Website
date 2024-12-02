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
        const accessToken = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`; // Authorization 헤더에 토큰 추가
        } else {
            console.warn('AccessToken이 로컬 스토리지에 없습니다.');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // 인증 실패 시
        if (error.response?.status === 401) {
            alert('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
            window.location.href = '/'; // 로그인 페이지로 이동
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
