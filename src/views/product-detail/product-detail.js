import * as Api from '/api.js';
import * as Util from '/useful-functions.js';
import { renderCategories } from '/category.js';
import { loginRender, checkLogin } from '/loginFunc.js';

// 변수
let sideMenus = await renderCategories();
const pathname = window.location.pathname.split('/');
const type = pathname[3];
const productId = Number(pathname[4]);
let productData = null; // 다른 함수에서도 상품 데이터를 필요로 하기 때문에 let 사용
let reviews = []; // 다른 함수에서도 리뷰 정보가 필요함
const myEmail = localStorage.getItem('email');

// Elements
const image = document.getElementById('product-thumbnail');
const producer = document.getElementById('producer');
const name = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');
let quantityElement = document.getElementById('qty');
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
const purchase = document.getElementById('purchase');
const cart = document.getElementById('cart');

// addEventListener
minus.addEventListener('click', () => count('minus'));
plus.addEventListener('click', () => count('plus'));
purchase.addEventListener('click', goToOrder);
cart.addEventListener('click', addCart);

// 초기화 및 함수 실행
sideMenus.forEach(
  (menu) => menu.innerHTML === type && menu.classList.add('button-active')
);
getProductDetail();
loginRender();

// functions
// 상품 정보 렌더링
async function getProductDetail() {
  try {
    productData = await Api.get('/product', `${productId}`);

    image.src = productData.product_image;
    producer.innerHTML = productData.producer;
    name.innerHTML = productData.product_name;
    price.innerHTML = `${Util.addCommas(productData.price)}원`;
    description.innerHTML = productData.product_info;
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

// 수량 선택하기
function count(type) {
  let number = Number(quantityElement.innerText);
  if (type === 'minus') {
    number--;
    if (number === 1) {
      minus.disabled = true;
    }
    quantityElement.innerText = number;
  }
  if (type === 'plus') {
    number++;
    if (number > 1) {
      minus.disabled = false;
    }
    quantityElement.innerText = number;
  }
}

// 장바구니 추가
function addCart() {
  let isExist = false;
  const cart = JSON.parse(localStorage.getItem('myCart'));
  const quantity = Number(quantityElement.innerText);

  let cartToAdd = {
    product_id: productData.product_id,
    product_image: productData.product_image,
    product_name: productData.product_name,
    quantity,
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

  let confirmResult = confirm(
    '장바구니에 성공적으로 담겼습니다.\n장바구니로 이동하시겠습니까?'
  );
  if (confirmResult) {
    window.location.replace('/cart');
  }
}

//로그인, 로그아웃 상태에따라 구매하기 버튼 기능 달라지는 function
function goToOrder() {
  if (checkLogin()) {
    //구매하기 누르면 주문페이지로 이동
    const data = productData;
    data.quantity = Number(quantityElement.innerText);
    sessionStorage.setItem('productInfo', JSON.stringify(data));
    window.location.href = '/order';
  } else {
    const confirmResult = confirm(
      '로그인 해주시기 바랍니다. 로그인 페이지로 이동하시겠습니까?'
    );
    if (confirmResult) {
      window.location.href = '/login';
    }
  }
}

const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
