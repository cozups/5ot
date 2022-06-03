import * as Api from '/api.js';
// 변수
let received = null;
let email = '';
// HTML 엘리먼트
const cancelButton = document.querySelectorAll('.order-cancel');
const listTable = document.querySelector('.order-list');

//계정따라 로드구현 달라지게 하기
async function loadData() {
  let rowIdx = 0;

  try {
    email = sessionStorage.getItem('email');
    received = await Api.get('/order/email', email);
    let i = 0;

    //정보 가져와서 화면에 구현
    const elements = received.map((data) => {
      const { email: userId } = data;
      const { address1, address2 } = data.address;
      const orderLists = data.OrderList.map((order) => {
        const {
          product_name: productName,
          quantity: count,
          price: totalPrice,
        } = order;

        return `
        <tr>
          <td class="product-name" rowspan='2' align='center'>${productName}</td>
          <td class="user" rowspan='2' align='center'>${userId}</td>
          <td class="count" rowspan='2' align='center'>${count}</td>
          <td class="address1">${address1}</td>
          <td class="total-price" rowspan='2' align='center'>${totalPrice}</td>
          <td class="cancel-button" rowspan='2' align='center'>
          <button type='button' value='${i}'>취소</button>
          </td>
        </tr>
        <tr>
          <td class='address2'>${address2}</td>
        </tr>
        `;
      });
      i++;
      return orderLists.join('');
    });

    listTable.innerHTML = elements.join('');
  } catch (err) {
    console.error(err);
  }
}
loadData();

// 주문 취소
listTable.addEventListener('click', cancelOrder);

async function cancelOrder(e) {
  const idxToDelete = Number(e.target.value);
  console.log(idxToDelete);
  const selectedOrderId = received[idxToDelete].order_id;
  console.log(typeof selectedOrderId);

  try {
    const result = await Api.delete('/order', '', {
      order_id: selectedOrderId,
    });
    console.log(`${result}: 주문이 삭제되었습니다.`);
    alert('주문이 삭제되었습니다.');

    location.reload();
  } catch (err) {
    console.error(err);
  }
}
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
