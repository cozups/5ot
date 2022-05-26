import * as Api from '/api.js';
const headerMenu = document.querySelectorAll('#navbar a');

// 로그인 상태 체크 -> 로그인 상태에 따른 렌더링을 하는 함수들
function checkLogin() {
  const token = sessionStorage.getItem('token') || '';
  if (token) {
    return true;
  } else {
    return false;
  }
}

function loginRender() {
  if (checkLogin()) {
    // login 상태 (메뉴 배치 순서를 바꾸었습니다.)
    // 회원가입 -> 로그아웃
    headerMenu[0].href = '';
    headerMenu[0].childNodes[0].textContent = '로그아웃';
    headerMenu[0].addEventListener('click', logout);

    // 로그인 -> 마이페이지
    headerMenu[1].href = '/mypage';
    headerMenu[1].childNodes[0].textContent = '마이페이지';
  }
}

// 로그아웃 function
function logout(e) {
  e.preventDefault();

  alert('로그아웃 되었습니다.');
  sessionStorage.removeItem('token');

  window.location.href = '/';
}

loginRender();

// 제품목록 가져오기

async function getProductList() {
  try {
    const result = await Api.get('/product', 'w/new/');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
getProductList();
