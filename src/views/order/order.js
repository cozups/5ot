import * as Api from '/api.js';

const productInfo = JSON.parse(sessionStorage.getItem('productInfo'));
const cart = JSON.parse(localStorage.getItem('myCart'));
let storageStatus = null; // purchase: 바로 구매할 때, cart: 장바구니에서 주문할 때
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

function checkStatus() {
  if (productInfo) {
    storageStatus = 'purchase';
  } else {
    storageStatus = 'cart';
  }
}
checkStatus();
setPurchaseInfo();

function setPurchaseInfo() {
  if (storageStatus === 'purchase') {
    // 바로 주문할 때
    const totalPrice = productInfo.quantity * productInfo.price;
    productsCount.innerText = productInfo.quantity + '개';
    productsTotal.innerText = totalPrice + '원';

    orderTotal.innerText = totalPrice + deliveryFee + '원';
  } else {
    // 카트에서 주문할 때
    const totalPrice = cart.reduce(
      (acc, cur) => (acc += cur.price * cur.quantity),
      0
    );
    const totalQuantity = cart.reduce((acc, cur) => (acc += cur.quantity), 0);
    productsCount.innerText = totalQuantity + '개';
    productsTotal.innerText = totalPrice + '원';

    orderTotal.innerText = totalPrice + deliveryFee + '원';
  }
}

async function postOrder(e) {
  e.preventDefault();
  let orderList = [];
  console.log(storageStatus);
  if (storageStatus === 'purchase') {
    orderList = [
      {
        product_id: productInfo.product_id,
        product_name: productInfo.product_name,
        quantity: productInfo.quantity,
        price: productInfo.price,
      },
    ];
  } else {
    orderList = cart.map((itemObj) => {
      console.log(itemObj);
      return {
        product_id: itemObj.product_id,
        product_name: itemObj.product_name,
        quantity: itemObj.quantity,
        price: itemObj.price,
      };
    });
  }
  console.log(orderList);
  const data = {
    OrderList: orderList,

    email: sessionStorage.getItem('email'),
    fullName: receiverName.value,
    phoneNumber: receiverPhoneNumber.value,

    postalCode: postalCode.value,
    address1: address1.value,
    address2: address2.value,
  };
  console.log(data);
  try {
    const result = await Api.post('/order', data);
    if (storageStatus === 'purchase') {
      sessionStorage.removeItem('productInfo');
    } else {
      localStorage.setItem('myCart', JSON.stringify([]));
    }

    window.location.href = '/order/complete';
  } catch (err) {
    console.log(err);
  }
}

purchaseButton.addEventListener('click', postOrder);
