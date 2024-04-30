import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

// 변수
let email = '';

// Elements
const listTable = document.querySelector('.order-list');

// addEventListener
listTable.addEventListener('click', cancelOrder);

// 함수 실행
loadData();

// functions
/**
 * 주문 리스트 렌더링
 * 계정따라 로드구현 달라지게 하기
 */
async function loadData() {
  try {
    email = localStorage.getItem('email');
    const result = await Api.get('/order/email', email);

    //정보 가져와서 화면에 구현
    const elements = result.map((data) => {
      const { email: userId } = data;
      const { address1, address2 } = data.address;

      const orderLists = data.OrderList.map((order, index) => {
        const {
          product_name: productName,
          quantity: count,
          price: totalPrice,
        } = order;

        if (index === 0) {
          return `
          <tr>
            <td class="product-name" align='center'>${productName}</td>
            <td class="user" rowspan="${
              data.OrderList.length
            }" align='center'>${userId}</td>
            <td class="count" align='center'>${count}개</td>
            <td class="address1" rowspan="${
              data.OrderList.length
            }">${address1} ${address2}</td>
            <td class="total-price" align='center'>${addCommas(
              totalPrice
            )}원</td>
            <td class="cancel-button" rowspan="${
              data.OrderList.length
            }" align='center'>
              <button type='button' data-order-id="${
                data.order_id
              }">취소</button>
            </td>
          </tr>
        `;
        }

        return `
        <tr>
          <td class="product-name" align='center'>${productName}</td>
          <td class="count" align='center'>${count}개</td>
          <td class="total-price" align='center'>${addCommas(totalPrice)}원</td>
        </tr>
        `;
      });
      return orderLists.join('');
    });

    listTable.innerHTML = elements.join('');
  } catch (err) {
    console.error(err);
  }
}

// 주문 취소
async function cancelOrder(e) {
  const orderId = e.target.dataset.orderId;

  try {
    await Api.delete('/order', '', {
      order_id: orderId,
    });

    alert('주문이 삭제되었습니다.');

    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
