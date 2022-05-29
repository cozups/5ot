import * as Api from '/api.js';
import * as Util from '/useful-functions.js';
const headerMenu = document.querySelectorAll('#navbar a');
const image = document.getElementById('product-thumbnail');
const producer = document.getElementById('producer');
const name = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');

let minus = document.getElementById('minus');
let plus = document.getElementById('plus');

const cart = document.getElementById('cart');
const url = Number(window.location.pathname.split('/')[4]);

async function getProductDetail() {
  try {
    const result = await Api.get('/product', `${url}`);
    image.src = result.product_image;
    image.innerHTML = result.src;
    producer.innerHTML = result.producer;
    name.innerHTML = result.product_name;
    price.innerHTML = `${Util.addCommas(result.price)}원`;
    description.innerHTML = result.product_info;
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

getProductDetail();

//수량

minus.addEventListener('click', () => {
  let number = Number(document.getElementById('qty').innerText);
  let result = document.getElementById('qty');
  if (number === 1) {
    minus.disabled = true;
  }
  number = number - 1;
  result.innerText = number;
});
plus.addEventListener('click', () => {
  let number = Number(document.getElementById('qty').innerText);
  let result = document.getElementById('qty');
  if (number >= 0) {
    minus.disabled = false;
  }
  number = number + 1;
  result.innerText = number;
});

//장바구니 누르면 장바구니로 이동
cart.addEventListener('click', function (e) {
  let data = confirm(
    '장바구니에 성공적으로 담겼습니다.\n장바구니로 이동하시겠습니까?'
  );
  if (data) {
    window.location.replace('/cart');
  }
});

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
