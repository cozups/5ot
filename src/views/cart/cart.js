import * as Api from '/api.js';
import * as Util from '/useful-functions.js';

// 변수
let prices = [];

// html 엘리먼트 선택
const cartList = document.getElementById('cart-list');
const cartListElements = document.querySelectorAll('#cart-list li');
const cartCountField = document.querySelector('.is-size-6');

// 이벤트 추가

// functions

//장바구니 리스트 렌더링하기
function cartRendering() {
  const cartLength = localStorage.length - 1; // 1을 빼는 이유는 기본적으로 randid가 이미 스토리지에 존재하기 때문
  cartCountField.innerText = `${cartLength}개 상품`;

  for (let i = 0; i < cartLength; i++) {
    const { product_image, product_name, quantity, price } = JSON.parse(
      localStorage.getItem(`myCart[${i}]`)
    );
    prices.push(price * quantity);
    const total = Util.addCommas(price * quantity);

    const element = `
      <li>
          <img
            src="${product_image}"
            alt=""
          />
          <div class="cart-item-info">
            <h3>${product_name}</h3>
            <div class="item-quantity">
              <button id="minus" disabled>
                <i class="fas fa-minus"></i>
              </button>
              <span id="qty">${quantity}</span>
              <button id="plus"><i class="fas fa-plus"></i></button>
            </div>
            <span class="item-price">${Util.addCommas(price)}</span>
            <span class="item-total-price">총 ${total}원</span>
            <button id="cancel"><i class="fa-solid fa-trash-can"></i></button>
          </div>
          </li>
          `;

    cartList.innerHTML += element;
  }
}

function setOrderInfo() {
  const productCount = document.getElementById('productsCount');
  const productsTotal = document.getElementById('productsTotal');
  const deliveryFee = Number(
    document.getElementById('deliveryFee').innerHTML.replace('원', '')
  );
  const totalPriceToPay = document.getElementById('orderTotal');

  const totalOrderPrice = prices.reduce((acc, cur) => (acc += cur));

  productCount.innerText = prices.length + '개';
  productsTotal.innerText = totalOrderPrice + '원';
  console.log(totalOrderPrice, deliveryFee);
  totalPriceToPay.innerText = totalOrderPrice + deliveryFee + '원';
}

function cancelOrder(e) {
  e.preventDefault();
}

cartRendering();
setOrderInfo();
