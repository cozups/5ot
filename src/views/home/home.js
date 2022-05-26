// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다. (원본 따로 백업 저장함)

// html elements
const body = document.querySelector('body');
const slides = document.querySelector('.slides');
const slideButtons = document.querySelectorAll('.slide-button-element');
const headerMenu = document.querySelectorAll('#navbar a');

// 변수
let currentIdx = 0;
let slidesTop = 0;
let stopScroll = false;
const timer = null;
const slideRange = slideButtons.length - 1;

// add events
body.addEventListener('wheel', scrollItems);
for (let i = 0; i < slideButtons.length; i++) {
  slideButtons[i].addEventListener('click', scrollByButton);
}

// functions
function moveNext() {
  setActive(currentIdx);
  slidesTop = currentIdx * 510;
  slides.style.top = -slidesTop + 'px';
}

function setActive(idx) {
  for (let i = 0; i < slideButtons.length; i++) {
    slideButtons[i].classList.remove('button-active');
  }
  slideButtons[idx].classList.add('button-active');
}

function scrollByTime() {
  setInterval(function () {
    if (!stopScroll) {
      currentIdx += 1;
      if (currentIdx > slideRange) currentIdx = 0;
      moveNext();
    }
  }, 3000);
}

function scrollItems(e) {
  stopScroll = true;
  if (e.wheelDelta > 0 && currentIdx > 0) {
    // scroll up
    currentIdx -= 1;
  } else if (e.wheelDelta < 0 && currentIdx < slideRange) {
    // scroll down
    currentIdx += 1;
  }
  moveNext();
}

function scrollByButton(e) {
  currentIdx = Number(this.value);

  stopScroll = true;
  moveNext();
}

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
  sessionStorage.removeItem('email');

  window.location.href = '/';
}

loginRender();
setActive(0);
scrollByTime();
