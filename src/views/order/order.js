/**
 * 구매하기 페이지
 */

import * as Api from '/api.js';
import { loginRender } from '/loginFunc.js';

// 변수
const productInfo = JSON.parse(sessionStorage.getItem('productInfo'));
const cart = JSON.parse(localStorage.getItem('myCart'));

// Elements
const receiverName = document.getElementById('receiverName');
const receiverPhoneNumber = document.getElementById('receiverPhoneNumber');
const postalCode = document.getElementById('postalCode');
const address1 = document.getElementById('address1');
const address2 = document.getElementById('address2');
const requestSelectBox = document.getElementById('requestSelectBox');
const customRequestContainer = document.getElementById(
  'customRequestContainer'
);
const productsCount = document.getElementById('productsCount');
const productsTotal = document.getElementById('productsTotal');
const deliveryFee = Number(
  document.getElementById('deliveryFee').innerText.replace('원', '')
);
const orderTotal = document.getElementById('orderTotal');
const purchaseButton = document.getElementById('purchaseButton');

// addEventListener
purchaseButton.addEventListener('click', postOrder);

// 함수 실행
loginRender();
checkStatus();
setPurchaseInfo();

// functions
/**
 * 상품 페이지에서 바로 구매 페이지로 넘어온 경우: purchase
 * 장바구니 페이지에서 구매 페이지로 넘어온 경우: cart
 */
function checkStatus() {
  return productInfo ? 'purchase' : 'cart';
}

// 구매 개수, 총 가격 계산
function setPurchaseInfo() {
  const status = checkStatus();
  if (status === 'purchase') {
    // 바로 주문할 때
    const totalPrice = productInfo.quantity * productInfo.price;
    productsCount.innerText = productInfo.quantity + '개';
    productsTotal.innerText = totalPrice + '원';

    orderTotal.innerText = totalPrice + deliveryFee + '원';
  }

  if (status === 'cart') {
    // 카트에서 주문할 때
    const totalPrice = cart.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    const totalQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    productsCount.innerText = totalQuantity + '개';
    productsTotal.innerText = totalPrice + '원';

    orderTotal.innerText = totalPrice + deliveryFee + '원';
  }
}

// 주문하기
async function postOrder(e) {
  e.preventDefault();

  let orderList = [];
  const status = checkStatus();
  if (status === 'purchase') {
    orderList = [
      {
        product_id: productInfo.product_id,
        product_name: productInfo.product_name,
        quantity: productInfo.quantity,
        price: productInfo.price,
      },
    ];
  }

  if (status === 'cart') {
    orderList = cart.map((itemObj) => {
      return {
        product_id: itemObj.product_id,
        product_name: itemObj.product_name,
        quantity: itemObj.quantity,
        price: itemObj.price,
      };
    });
  }

  const data = {
    OrderList: orderList,

    email: localStorage.getItem('email'),
    fullName: receiverName.value,
    phoneNumber: receiverPhoneNumber.value,

    postalCode: postalCode.value,
    address1: address1.value,
    address2: address2.value,
  };

  if (
    !data.fullName ||
    !data.phoneNumber ||
    !data.postalCode ||
    !data.address1 ||
    !data.address2
  ) {
    alert('정보를 모두 작성하여 주십시오.');
    return;
  }

  try {
    await Api.post('/order', data);
    if (status === 'purchase') {
      sessionStorage.removeItem('productInfo');
    }

    if (status === 'cart') {
      localStorage.setItem('myCart', JSON.stringify([]));
    }

    window.location.href = '/order/complete';
  } catch (err) {
    console.log(err);
  }
}
