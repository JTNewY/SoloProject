import api from './api';
import Cookies from 'js-cookie'; // 쿠키를 다루기 위해 js-cookie 패키지 필요
import * as Swal from './alert'; 

// 로그인
export const login = async (username, password) => {
    try {
      // 쿼리 파라미터를 사용하여 로그인 요청
      const response = await api.post(`/login?username=${username}&password=${password}`);
  
      const { data } = response;
  
      // 성공적으로 응답을 받았을 때
      if (response.status === 200) {
        // JWT 토큰을 쿠키에 저장
        Cookies.set('accessToken', data.token);
  
        // 로그인 성공 알림
        Swal.alert("로그인 성공", "메인 화면으로 이동합니다", "success", () => {
          window.location.href = '/';
        });
      }
    } catch (error) {
      // 로그인 실패 알림
      Swal.alert("로그인 실패", "아이디 또는 비밀번호가 일치하지 않습니다", "error");
    }
  };
// 사용자 정보
export const info = () => api.get(`/users/info`)

// 회원 가입 
export const join = (data) => api.post(`/users`, data)

// 회원 정보 수정
export const update = (data) => api.put(`/users`, data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`)