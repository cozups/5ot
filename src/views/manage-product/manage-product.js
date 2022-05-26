import * as Api from '/api.js';

// 등록 관련 html 엘리먼트
const productNameInput = document.querySelector('#product_name');
const sexInput = document.querySelector('#sex');
const typeInput = document.querySelector('#type');
const producerInput = document.querySelector('#producer');
const productInfoInput = document.querySelector('#product_info');
const productImageInput = document.querySelector('#product_image');
const stockInput = document.querySelector('#stock');
const priceInput = document.querySelector('#price');
const registerButton = document.querySelector('#register-button');

// 삭제 관련 html 엘리먼트
const deleteList = document.querySelector('#delete-product-list');
const modifyList = document.querySelector('#modify-product-list');

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

async function getList() {
  const products = await Api.get('/product/all');

  for (let i = 0; i < products.length; i++) {
    const { product_id, product_name, stock, price } = products[i];
    let modifyListElement = `
      <tr>
        <td>${product_name}</td>
        <td>${stock} 개</td>
        <td>${price} 원</td>
        <td>
          <button class="product-modify-button" value='${product_id}'>수정하기</button>
        </td>
      </tr>
    `;

    let deleteListElement = `
    <tr>
      <td>${product_name}</td>
      <td>${stock} 개</td>
      <td>${price} 원</td>
      <td>
        <button class="product-delete-button" value='${product_id}'>삭제하기</button>
      </td>
    </tr>
  `;
    $(modifyList).append(modifyListElement);
    $(deleteList).append(deleteListElement);
  }

  const deleteButton = document.querySelectorAll('.product-delete-button');
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deleteProduct);
  }
}

async function deleteProduct(e) {
  e.preventDefault();

  const product = this.parentElement.parentElement;
  const product_id = Number(this.value);

  try {
    const result = await Api.delete('/product', '', {
      product_id,
    });
    $(product).remove();
  } catch (err) {
    console.error(err);
  }
}

getList();
