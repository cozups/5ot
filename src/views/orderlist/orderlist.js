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

  const product_id = received.OrderList.product_id;

  const data = await Api.get('/product', product_id);

  const listElement = `
  <li class="order-list-item">
  <div class="left-side">
    <img
      src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"
      alt=""
      class="item-thumbnail"
    />
    <button class="order-cancel">취소하기</button>
  </div>
  <div class="order-info right-side">
    <h2 class="item-name">제품명</h2>
    <p class="brand">제조사</p>
    <p class="order-count">수량</p>
    <p class="address">주소</p>
    <p class="total-price">가격</p>
    <p class="state">배송상태</p>
  </div>
</li>
  `;
}
function cancelOrder(e) {
  e.preventDefault();

  console.log('cancel the order');
}
