import * as Api from '/api.js';

const productInfo = JSON.parse(sessionStorage.getItem('productInfo'));
let storageStatus = null;
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

const totalPrice = productInfo.quantity * productInfo.price;
productsCount.innerText = productInfo.quantity + '개';
productsTotal.innerText = totalPrice + '원';

orderTotal.innerText = totalPrice + deliveryFee + '원';

function checkStatus() {
  if (productInfo) {
    storageStatus = 'purchase';
  } else {
    storageStatus = 'cart';
  }
}
checkStatus();

async function postOrder(e) {
  e.preventDefault();

  if (storageStatus === 'purchase') {
    const data = {
      OrderList: [
        {
          product_id: productInfo.product_id,
          quantity: productInfo.quantity,
          price: productInfo.price,
        },
      ],

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
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}

purchaseButton.addEventListener('click', postOrder);
