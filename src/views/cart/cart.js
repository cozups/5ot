import * as Util from '/useful-functions.js';

// 변수
let prices = [];
let cart = JSON.parse(localStorage.getItem(`myCart`));

// html 엘리먼트 선택
const cartList = document.getElementById('cart-list');
const cartCountField = document.querySelector('.is-size-6');

// 이벤트 추가
cartList.addEventListener('click', clickHandler);

// functions
//장바구니 리스트 렌더링하기
cartRendering();
setOrderInfo();

function cartRendering() {
  cartCountField.innerText = `${cart.length}개 상품`;

  cart.forEach(item => {
    const { product_image, product_name, quantity, price } = item;
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
              <button class="minus" disabled>
                <i class="fas fa-minus"></i>
              </button>
              <span id="qty">${quantity}</span>
              <button class="plus"><i class="fas fa-plus"></i></button>
            </div>
            <span class="item-price">${Util.addCommas(price)}</span>
            <span class="item-total-price">총 ${total}원</span>
            <button class='cancel'><i class="fa-solid fa-trash-can"></i></buttonc>
          </div>
          </li>
          `;

    cartList.innerHTML += element;
  });
}

function setOrderInfo() {
  const productCount = document.getElementById('productsCount');
  const productsTotal = document.getElementById('productsTotal');
  const deliveryFee = Number(
    document.getElementById('deliveryFee').innerHTML.replace('원', '')
  );
  const totalPriceToPay = document.getElementById('orderTotal');
  let totalOrderPrice = 0;
  if (prices.length > 0) {
    totalOrderPrice = prices.reduce((acc, cur) => (acc += cur));
  }

  productCount.innerText = prices.length + '개';
  productsTotal.innerText = totalOrderPrice + '원';
  totalPriceToPay.innerText = totalOrderPrice + deliveryFee + '원';
}

function clickHandler(e) {
  const btn = e.target.parentElement; // e.target이 i 태그이기 때문에 parent를 가리켜야함.. (font-awesome 때문)
  const cancelButtons = document.querySelectorAll('.cancel');
  let idx = 0;

  if (btn.tagName !== 'BUTTON') {
    return;
  }

  for (let i = 0; i < cancelButtons.length; i++) {
    if (cancelButtons[i] === btn) {
      idx = i;
      break;
    }
  }

  if (btn.className === 'cancel') {
    cancelOrder(idx);
  } else {
    changeQuantity(btn.className);
  }
}

function cancelOrder(idxToDelete) {
  let cart = JSON.parse(localStorage.getItem('myCart'));

  cart = cart.filter((item, idx) => idx !== idxToDelete);

  localStorage.setItem('myCart', JSON.stringify(cart));

  location.reload();
}

function changeQuantity(type) {
  if (type === 'minus') {
    console.log('minus');
  } else {
    console.log('plus');
  }
}
