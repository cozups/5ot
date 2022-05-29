import * as Util from '/useful-functions.js';

// 변수
let cart = JSON.parse(localStorage.getItem(`myCart`));

// html 엘리먼트 선택
const cartList = document.getElementById('cart-list');
const cartCountField = document.querySelector('.is-size-6');

// 이벤트 추가
cartList.addEventListener('click', clickHandler);

// functions
//장바구니 리스트 렌더링하기
cartRendering();

function cartRendering() {
  let i = 0;
  cartList.innerHTML = '';

  cartCountField.innerText = `${cart.length}개 상품`;

  cart.forEach(item => {
    const { product_image, product_name, quantity, price } = item;
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
              <button class="minus" value=${i}>
                <i class="fas fa-minus"></i>
              </button>
              <span class="qty">${quantity}</span>
              <button class="plus" value=${i}><i class="fas fa-plus"></i></button>
            </div>
            <span class="item-price">${Util.addCommas(price)}</span>
            <span class="item-total-price">총 ${total}원</span>
            <button class='cancel' value=${i}><i class="fa-solid fa-trash-can"></i></buttonc>
          </div>
          </li>
          `;

    cartList.innerHTML += element;
    i++;
  });

  setOrderInfo();
}

function setOrderInfo() {
  const productCount = document.getElementById('productsCount');
  const productsTotal = document.getElementById('productsTotal');
  const deliveryFee = Number(
    document.getElementById('deliveryFee').innerHTML.replace('원', '')
  );
  const totalPriceToPay = document.getElementById('orderTotal');
  let totalOrderPrice = 0;
  if (cart.length > 0) {
    totalOrderPrice = cart.reduce(
      (acc, cur) => (acc += cur.price * cur.quantity),
      0
    );
  }

  productCount.innerText = cart.length + '개';
  productsTotal.innerText = Util.addCommas(totalOrderPrice) + '원';
  totalPriceToPay.innerText =
    Util.addCommas(totalOrderPrice + deliveryFee) + '원';
}

function clickHandler(e) {
  const btn = e.target.parentElement; // e.target이 i 태그이기 때문에 parent를 가리켜야함.. (font-awesome 때문)
  console.log(btn.value);
  const cancelButtons = document.querySelectorAll('.cancel');
  const idx = Number(btn.value);

  if (btn.tagName !== 'BUTTON') {
    return;
  }

  if (btn.className === 'cancel') {
    cancelOrder(idx);
  } else {
    changeQuantity(btn.className, idx);
  }
}

function cancelOrder(idxToDelete) {
  cart = cart.filter((item, idx) => idx !== idxToDelete);

  localStorage.setItem('myCart', JSON.stringify(cart));

  location.reload();
}

function changeQuantity(type, idxToChange) {
  const quantityField = document.querySelectorAll('.qty');
  let quantity = Number(quantityField[idxToChange].innerText);
  if (type === 'minus') {
    if (quantity === 0) {
      return;
    } else {
      quantity--;
    }
  } else {
    quantity++;
  }

  quantityField[idxToChange].innerText = quantity;
  cart[idxToChange].quantity = quantity;
  localStorage.setItem('myCart', JSON.stringify(cart));
  cartRendering();
}
