import * as Api from '/api.js';
import * as Util from '/useful-functions.js';

let productData = null; // 다른 함수에서도 상품 데이터를 필요로 하기 때문에 let 사용

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
    productData = await Api.get('/product', `${url}`);
    image.src = productData.product_image;
    image.innerHTML = productData.src;
    producer.innerHTML = productData.producer;
    name.innerHTML = productData.product_name;
    price.innerHTML = `${Util.addCommas(productData.price)}원`;
    description.innerHTML = productData.product_info;
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

getProductDetail();

//수량

function count(type) {
  let number = Number(document.getElementById('qty').innerText);
  let result = document.getElementById('qty');
  if (type === 'minus') {
    if (number === 2) {
      minus.disabled = true;
    }
    number -= 1;
    result.innerText = number;
  } else if (type === 'plus') {
    if (number >= 0) {
      minus.disabled = false;
    }
    number += 1;
    result.innerText = number;
  }
}

minus.addEventListener('click', () => {
  count('minus');
});
plus.addEventListener('click', () => {
  count('plus');
});

//장바구니 누르면 장바구니로 이동
cart.addEventListener('click', function (e) {
  const result = addCart();
  if (!result) {
    return;
  }
  let data = confirm(
    '장바구니에 성공적으로 담겼습니다.\n장바구니로 이동하시겠습니까?'
  );
  if (data) {
    window.location.replace('/cart');
  }
});

// 장바구니 추가
function addCart() {
  let isExist = false;
  const cart = JSON.parse(localStorage.getItem('myCart'));
  const quantity = Number(document.getElementById('qty').innerText);
  if (!quantity) {
    alert('개수는 1개 이상이어야 합니다.');
    return false;
  }
  let cartToAdd = {
    product_image: productData.product_image,
    product_name: productData.product_name,
    quantity: quantity,
    price: productData.price,
  };

  // 이미 카트에 있는 경우
  cart.forEach((item) => {
    if (item.product_name === cartToAdd.product_name) {
      item.quantity += cartToAdd.quantity;
      isExist = true;
    }
  });

  if (!isExist) {
    cart.push(cartToAdd);
  }

  localStorage.setItem(`myCart`, JSON.stringify(cart));
  return true;
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

  window.location.href = '/';
}

loginRender();
