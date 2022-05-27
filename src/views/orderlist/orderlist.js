import * as Api from '/api.js';

// HTML 엘리먼트
const cancelButton = document.querySelectorAll('.order-cancel');

// 이벤트 추가

for (let i = 0; i < cancelButton.length; i++) {
  cancelButton[i].addEventListener('click', cancelOrder);
}

// functions
async function loadData() {
  const received = [
    {
      OrderList: {
        product_id: 64,
        quantity: 3,
        price: 55000,
      },
      order_id: 1,
      email: 'test@team5.com',
      fullName: '김미소',
      phoneNumber: '010-1111-2222',
      address: {
        postalCode: '01234',
        address1: '서울시',
        address2: '마포구',
      },
    },
  ];

  const product_id = received[0].OrderList.product_id;

  try {
    const data = await Api.get('/product', product_id);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
  const listElement = `
    
  `;
}
function cancelOrder(e) {
  e.preventDefault();

  console.log('cancel the order');
}

loadData();
