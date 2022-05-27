import * as Api from '/api.js';
console.log(window.location.pathname);
// 요소(element), input 혹은 상수
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const postalCodeInput = document.querySelector('#postalCode');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBoxInput = document.querySelector('#requestSelectBox');
const purchaseButton = document.querySelector('#purchaseButton');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  purchaseButton.addEventListener('click', handleSubmit);
}

// 주문 진행
async function handleSubmit(e) {
  e.preventDefault();

  const receiverName = receiverNameInput.value;
  const receiverPhoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const requestSelectBox = requestSelectBoxInput.value;

  // const isFullNameValid = receiverName.length >= 2;

  // if (!isFullNameValid) {
  //   return alert('이름은 2글자 이상이어야 합니다.');
  // }
  // if (!receiverName || !receiverPhoneNumber || !postalCode || !address1) {
  //   return alert('모든 정보를 입력해주세요.');
  // }

  // 주문 api 요청
  try {
    const address = { postalCode, address1, address2 };
    const data = {
      receiverName,
      receiverPhoneNumber,
      address,
      requestSelectBox,
    };

    await Api.post('/api/order', data);

    alert(`정상적으로 주문이 완료되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/order/complete';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
