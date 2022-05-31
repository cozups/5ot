import * as Api from '/api.js';

const headerMenu = document.querySelectorAll('#navbar a');
const search = document.getElementById('search');
const submit = document.getElementById('submit');

//검색기능
async function searchProducts() {
  const input = search.value;
  const result = await Api.get('/product/all');
  const data = [];
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    const name = result[i].product_name.trim();
    if (name.indexOf(input.toUpperCase()) !== -1) {
      data.push(result[i]);
    }
  }
  console.log(data);

  //세션스토리지에 저장
  sessionStorage.setItem('searchProducts', JSON.stringify(data));
}

submit.addEventListener('click', () => searchProducts());

// 로그인 상태 체크 -> 로그인 상태에 따른 렌더링을 하는 함수들
function checkLogin() {
  const token = sessionStorage.getItem('token') || '';
  if (token) {
    return true;
  } else {
    return false;
  }
}

async function loginRender() {
  if (checkLogin()) {
    // login 상태 (메뉴 배치 순서를 바꾸었습니다.)
    // 회원가입 -> 로그아웃
    headerMenu[0].href = '';
    headerMenu[0].childNodes[0].textContent = '로그아웃';
    headerMenu[0].addEventListener('click', logout);

    // 로그인 -> 마이페이지
    headerMenu[1].href = '/mypage';
    headerMenu[1].childNodes[0].textContent = '마이페이지';

    try {
      const email = sessionStorage.getItem('email');
      const user = await Api.get('/api/email', email);
      sessionStorage.setItem('userName', user.fullName);
    } catch (err) {
      console.error(err);
    }
  }
}

// 로그아웃 function
function logout(e) {
  e.preventDefault();

  alert('로그아웃 되었습니다.');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('email');

  window.location.href = '/';
}

loginRender();
