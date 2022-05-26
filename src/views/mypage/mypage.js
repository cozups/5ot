import * as Api from '/api.js';

// html 엘리먼트
const changeableElement = document.querySelectorAll('.button-menu')[2].children[0]; // 제품판매 or 문의하기로 바뀔 엘리먼트
console.log(changeableElement);

// functions

// 권한이 admin -> 제품 판매 페이지 렌더링, basic-user -> 문의하기 페이지 렌더링
async function checkRole() {
  const email = sessionStorage.getItem('email');

  try {
    const userInfo = await Api.get('/api/email', email);
    const { role } = userInfo;

    if (role === 'admin') {
      changeableElement.href = '/mypage/manage';
      changeableElement.innerHTML = `<i class="fa-solid fa-shirt"></i>
        <span>제품 관리</span>`;
    } else {
      changeableElement.href = '/mypage/qna';
      changeableElement.innerHTML = `<i class="fa-solid fa-question"></i>
      <span>문의 하기</span>`;
    }
  } catch (err) {
    console.error(err);
  }
}

checkRole();
