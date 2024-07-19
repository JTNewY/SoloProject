import axios from 'axios'
import Cookies from 'js-cookie';

// axios 객체 생성
// axios 객체 생성
const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 시 Authorization 헤더 설정
const accessToken = Cookies.get("accessToken");
if (accessToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
export default api