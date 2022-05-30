import * as Api from '/api.js';

// HTML 엘리먼트
const cancelButton = document.querySelectorAll('.order-cancel');
const listTable = document.querySelector('.order-list');

//계정따라 로드구현 달라지게 하기
async function loadData() {
  try {
    const email = sessionStorage.getItem('email');
    const received = await Api.get('/order/email', email);
    console.log(received);

    //정보 가져와서 화면에 구현
    for (let i = 0; i < received.length; i++) {
      for (let j = 0; j < received[i].OrderList.length; j++) {
        const productName = received[i].OrderList[j].product_name;
        const userId = received[i].email;
        const count = received[i].OrderList[j].quantity;
        const address1 = received[i].address.address1;
        const address2 = received[i].address.address2;
        const totalPrice = count * received[i].OrderList[j].price;
        const listElement = `
        <tr>
          <td class="product-name" rowspan='2' align='center'>${productName}</td>
          <td class="user" rowspan='2' align='center'>${userId}</td>
          <td class="count" rowspan='2' align='center'>${count}</td>
          <td class="address1">${address1}</td>
          <td class="total-price" rowspan='2' align='center'>${totalPrice}</td>
          <td class="cancel-button" rowspan='2' align='center'>
          <button type='button'>취소</button>
          </td>
        </tr>
        <tr>
          <td class='address2'>${address2}</td>
        </tr>
        `;

        listTable.innerHTML += listElement;
      }
    }
  } catch (err) {
    console.error(err);
  }
}
loadData();

//주문취소
for (let i = 0; i < cancelButton.length; i++) {
  cancelButton[i].addEventListener('click', () => {
    const data = confirm('주문을 취소하시겠습니까?');
    const orderList = document.getElementsByClassName('order-list');
    if (data) {
      orderList.splice(i, 1);
      console.log('cancel the order');
    }
  });
}
