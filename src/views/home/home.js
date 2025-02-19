import { renderCategories } from '/category.js';
import { loginRender } from '/loginFunc.js';

// 변수
let currentIdx = 0;
let slidesTop = 0;
let stopScroll = false;

// html elements
const body = document.querySelector('body');
const slides = document.querySelector('.slides');

let slideButtons = [];

let slideRange = slideButtons.length - 1;

// addEventListner
body.addEventListener('wheel', scrollItems);

// 함수 실행
async function init() {
  slideButtons = await renderCategories();

  loginRender();
  renderSlideImages();
  scrollByTime();
  checkCart();
  slideButtons[0].classList.add('button-active');
}
init();

// functions
// 슬라이드 이미지 동적 렌더링
function renderSlideImages() {
  const womanCategories = JSON.parse(sessionStorage.getItem('womanCategories'));
  const manCategories = JSON.parse(sessionStorage.getItem('manCategories'));
  const categories = [...womanCategories, ...manCategories];

  const categoryItems = categories.map(
    (category) => `
    <li class="item-photo ${category.type}">
      <a href="/list/${category.sex}/${category.type}">
        <img
          src="${category.image}"
          alt=""
        />
      </a>
    </li>
  `
  );

  slides.innerHTML = categoryItems.join('');
}

// 이미지 슬라이드를 다음으로 넘김
function moveNext() {
  slidesTop = currentIdx * 510;
  slides.style.top = -slidesTop + 'px';
}

// 3초마다 이미지 슬라이드
function scrollByTime() {
  setInterval(function () {
    if (!stopScroll) {
      slideButtons[currentIdx].classList.remove('button-active');

      currentIdx = currentIdx + 1 < slideButtons.length ? currentIdx + 1 : 0;

      slideButtons[currentIdx].classList.add('button-active');
      moveNext();
    }
  }, 3000);
}

// 마우스로 이미지 슬라이드
function scrollItems(e) {
  stopScroll = true;

  if (e.wheelDelta > 0) {
    // scroll up
    slideButtons[currentIdx].classList.remove('button-active');
    currentIdx = currentIdx - 1 >= 0 ? currentIdx - 1 : slideButtons.length - 1;
  } else if (e.wheelDelta < 0) {
    // scroll down
    slideButtons[currentIdx].classList.remove('button-active');
    currentIdx = currentIdx + 1 < slideButtons.length ? currentIdx + 1 : 0;
  }

  slideButtons[currentIdx].classList.add('button-active');
  moveNext();
}

// home에 들어갈 때마다 cart 확인
// cart가 없다면 myCart = [] 로 초기화
function checkCart() {
  const cart = JSON.parse(localStorage.getItem('myCart'));
  if (!cart) {
    localStorage.setItem('myCart', JSON.stringify([]));
  }
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
