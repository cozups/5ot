// HTML 엘리먼트
const cancelButton = document.querySelectorAll('.order-cancel');

// 이벤트 추가

for (let i = 0; i < cancelButton.length; i++) {
  cancelButton[i].addEventListener('click', cancelOrder);
}

// functions
function cancelOrder(e) {
  e.preventDefault();

  console.log('cancel the order');
}
