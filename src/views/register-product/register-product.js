import * as Api from '/api.js';
// html 엘리먼트
const productNameInput = document.querySelector('#product_name');
const sexInput = document.querySelector('#sex');
const typeInput = document.querySelector('#type');
const producerInput = document.querySelector('#producer');
const productInfoInput = document.querySelector('#product_info');
const productImageInput = document.querySelector('#product_image');
const stockInput = document.querySelector('#stock');
const priceInput = document.querySelector('#price');
const registerButton = document.querySelector('#register-button');

// 이벤트 추가
// registerButton.addEventListener('click', postProduct);

// functions
async function postProduct(e) {
  e.preventDefault();

  const productName = productNameInput.value;
  const sex = sexInput.value;
  const type = typeInput.value;
  const producer = producerInput.value;
  const productInfo = productInfoInput.value;
  const productImage = productImageInput.value;
  const stock = stockInput.value;
  const price = priceInput.value;

  try {
    const data = {
      product_name: productName,
      sex: sex,
      type: type,
      producer: producer,
      product_info: productInfo,
      stock: stock,
      price: price,
    };

    await Api.post('/product/add', data);

    alert('상품이 추가되었습니다.');
    window.location.href = '/mypage';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
