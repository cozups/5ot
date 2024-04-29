import * as Api from '/api.js';

const headerMenu = document.querySelectorAll('#navbar a');
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', searchProducts);
submit.addEventListener('click', searchProducts);

//검색기능
async function searchProducts(e) {
  e.preventDefault();

  const input = search.value;
  const result = await Api.get('/product/all');
  const data = result.filter((item) => {
    return item.product_name
      .trim()
      .toLowerCase()
      .includes(input.toLowerCase().trim());
  });

  //세션스토리지에 저장
  sessionStorage.setItem('searchProducts', JSON.stringify(data));
  window.location.href = '/searchlist';
}

// 로그인 상태 체크 -> 로그인 상태에 따른 렌더링을 하는 함수들
function checkLogin() {
  const token = localStorage.getItem('token') || '';
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
      const email = localStorage.getItem('email');
      const user = await Api.get('/api/email', email);
      localStorage.setItem('userName', user.fullName);
    } catch (err) {
      console.error(err);
    }
  }
}

// 로그아웃 function
function logout(e) {
  e.preventDefault();

  alert('로그아웃 되었습니다.');
  localStorage.clear();

  window.location.href = '/';
}

loginRender();
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
