// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다. (원본 따로 백업 저장함)

// 변수
let currentIdx = 0;
let slidesTop = 0;
let stopScroll = false;
const timer = null;

// html elements
const body = document.querySelector('body');
const slides = document.querySelector('.slides');
const slideButtons = document.querySelectorAll('.slide-button-element');
const slideIndex = document.querySelectorAll('.slide-index-element');
const slideArrows = document.querySelectorAll('.page-slide-button i');

// add events
body.addEventListener('wheel', scrollItems);
for (let i = 0; i < slideButtons.length; i++) {
  slideButtons[i].addEventListener('click', scrollByButton);
}

for (let i = 0; i < slideArrows.length; i++) {
  slideArrows[i].addEventListener('click', slidePage);
}

// functions
function moveNext() {
  slidesTop = currentIdx * 500;
  slides.style.top = -slidesTop + 'px';
  scrollIndex();
}

function scrollByTime() {
  setInterval(function () {
    if (!stopScroll) {
      currentIdx += 1;
      if (currentIdx > 3) currentIdx = 0;
      moveNext();
    }
  }, 3000);
}

function scrollItems(e) {
  stopScroll = true;
  if (e.wheelDelta > 0 && currentIdx > 0) {
    // scroll up
    currentIdx -= 1;
  } else if (e.wheelDelta < 0 && currentIdx < 3) {
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

function scrollIndex() {
  for (let i = 0; i < slideIndex.length; i++) {
    slideIndex[i].classList.remove('active');
  }
  slideIndex[currentIdx].classList.add('active');
}

function slidePage() {
  for (let i = 0; i < slideArrows.length; i++) {
    slideArrows[i].classList.toggle('shown');
  }
}

scrollByTime();
