import Swal from 'sweetalert2';

// 기본 알림 메서드
export const alert = (title, text, icon, callback) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: '확인',
  }).then(result => {
    if (result.isConfirmed) {
      if (callback) callback();
    }
  });
};

// 확인 대화 상자 메서드
export const confirm = (title, text, icon, callback) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  }).then(result => {
    if (result.isConfirmed) {
      if (callback) callback(result);
    }
  });
};
