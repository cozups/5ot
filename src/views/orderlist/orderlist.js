import * as Api from '/api.js';

// HTML 엘리먼트
const cancelButton = document.querySelectorAll('.order-cancel');
const listTable = document.querySelector('#order-list-table');
// 이벤트 추가

for (let i = 0; i < cancelButton.length; i++) {
  cancelButton[i].addEventListener('click', cancelOrder);
}

// functions
async function checkRole() {
  const email = sessionStorage.getItem('email');

  try {
    const userInfo = await Api.get('/api/email', email);
    const { role } = userInfo;

    if (role === 'admin') {
      loadDataAdmin();
    } else {
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadDataAdmin() {
  const received = [
    {
      OrderList: [
        {
          product_id: 64,
          quantity: 3,
          price: 55000,
        },
      ],
      order_id: 1,
      email: 'test@team5.com',
      fullName: '김미소',
      phoneNumber: '010-1111-2222',
      address: {
        postalCode: '01234',
        address1: '서울특별시 강남구 테헤란로 53길 16',
        address2: '예안빌딩 B1층',
      },
    },
  ];

  const product_id = received[0].OrderList[0].product_id;
  try {
    const data = await Api.get('/product', product_id);

    console.log(data);

    for (let i = 0; i < received.length; i++) {
      const userId = received[i].email;
      const count = received[i].OrderList[0].quantity;
      const address1 = received[i].address.address1;
      const address2 = received[i].address.address2;
      const totalPrice = count * received[i].OrderList[0].price;
      const listElement = `
        <tr>
          <td class="product-name" rowspan='2' align='center'>${data.product_name}</td>
          <td class="user" rowspan='2' align='center'>${userId}</td>
          <td class="count" rowspan='2' align='center'>${count}</td>
          <td class="address1">${address1}</td>
          <td class="total-price" rowspan='2' align='center'>${totalPrice}</td>
          <td class="cancel-button" rowspan='2' align='center'>
            <button type='button'>취소하기</button>
          </td>
        </tr>
        <tr>
          <td class='address2' rowspan='2'>${address2}</td>
        </tr>
      `;

      listTable.innerHTML += listElement;
    }
  } catch (err) {
    console.error(err);
  }
}
function cancelOrder(e) {
  e.preventDefault();

  console.log('cancel the order');
}

checkRole();
