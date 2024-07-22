import api from './api';
import Cookies from 'js-cookie'; // 쿠키를 다루기 위해 js-cookie 패키지 필요
import * as Swal from './alert'; // Swal은 './alert' 모듈에서 import

// 로그인 함수
export const login = async (username, password) => {
  try {
    const response = await api.post(`/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    if (response && response.data) {
      const { data } = response;
      if (response.status === 200 && data.token) {
        // JWT 토큰을 쿠키에 저장
        Cookies.set('accessToken', data.token);
        // 로그인 성공 알림
        Swal.alert("로그인 성공", "메인 화면으로 이동합니다", "success", () => {
          window.location.href = '/';
        });
      } else {
        throw new Error('Invalid response format or token not found');
      }
    } else {
      throw new Error('Response or response data is undefined');
    }
  } catch (error) {
    // 로그인 실패 알림
    Swal.alert("로그인 실패", "아이디 또는 비밀번호가 일치하지 않습니다", "error");
    console.error('로그인 실패:', error.message || error);
  }
};

// 사용자 정보 조회 함수
export const info = () => api.get('/users/info');
