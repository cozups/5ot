import * as Api from '/api.js';
import { renderCategories } from '/category.js';

// html elements
const body = document.querySelector('body');
const slides = document.querySelector('.slides');
const headerMenu = document.querySelectorAll('#navbar a');
let slideButtons = await renderCategories();
let slideRange = slideButtons.length - 1;

slideButtons[0].classList.add('button-active');

// 변수
let currentIdx = 0;
let slidesTop = 0;
let stopScroll = false;

// add events
body.addEventListener('wheel', scrollItems);

// functions
function moveNext() {
  slidesTop = currentIdx * 510;
  slides.style.top = -slidesTop + 'px';
}

function scrollByTime() {
  setInterval(function () {
    if (!stopScroll) {
      slideButtons[currentIdx].classList.remove('button-active');
      currentIdx += 1;
      if (currentIdx > slideRange) currentIdx = 0;
      slideButtons[currentIdx].classList.add('button-active');
      moveNext();
    }
  }, 3000);
}

function scrollItems(e) {
  stopScroll = true;
  slideButtons[currentIdx].classList.remove('button-active');
  if (e.wheelDelta > 0 && currentIdx > 0) {
    // scroll up

    currentIdx -= 1;
  } else if (e.wheelDelta < 0 && currentIdx < slideRange) {
    // scroll down
    currentIdx += 1;
  }
  slideButtons[currentIdx].classList.add('button-active');
  moveNext();
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

// home에 들어갈 때마다 cart 확인
// cart가 비어있지 않다면 myCart = [] 로 초기화 하지 않음
function checkCart() {
  const cart = localStorage.getItem('myCart');
  if (!cart || cart.length === 1) {
    localStorage.setItem('myCart', JSON.stringify([]));
  }
}
scrollByTime();
loginRender();
checkCart();
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
