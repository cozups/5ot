import * as Api from '/api.js';

// 변수
let productToModify = null;

// 등록 관련 html 엘리먼트
const sellForm = document.querySelector('#sell-form');

// 삭제 관련 html 엘리먼트
const productList = document.querySelector('#product-list');

// 수정 관련 html 엘리먼트
const modal = document.querySelector('#modal');
const modalModifyButton = document.querySelector('#modal-button');
const modalCloseButton = document.querySelector('.close-button');
const modalForm = document.querySelector('.modal-content form');

// 이벤트 추가
modalCloseButton.addEventListener('click', closeModal);
modalModifyButton.addEventListener('click', patchRequest);
// functions

async function getList() {
  const products = await Api.get('/product/all');

  for (let i = 0; i < products.length; i++) {
    const { product_id, product_name, stock, price } = products[i];

    let element = `
    <tr>
      <td>${product_name}</td>
      <td>${stock} 개</td>
      <td>${price} 원</td>
      <td>
        <button class="product-modify-button" value='${product_id}'>
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="product-delete-button" value='${product_id}'>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
    $(productList).append(element);
  }

  const deleteButton = document.querySelectorAll('.product-delete-button');
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deleteProduct);
  }
  const modifyButton = document.querySelectorAll('.product-modify-button');
  for (let i = 0; i < deleteButton.length; i++) {
    modifyButton[i].addEventListener('click', modifyProduct);
  }
}

async function deleteProduct(e) {
  e.preventDefault();

  const answer = confirm('정말로 삭제하시겠습니까?');

  if (!answer) {
    return;
  }

  const product = this.parentElement.parentElement;
  const product_id = Number(this.value);

  try {
    alert('삭제 되었습니다.');
    const result = await Api.delete('/product', '', {
      product_id,
    });
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

sellForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(sellForm);

  try {
    let response = await fetch('/product/add', {
      method: 'POST',
      body: formData,
    });
    alert('상품 추가 되었습니다.');

    window.location.href = '/mypage/manage/product';
  } catch (err) {
    console.error(err);
  }
});

// 상품 수정
async function modifyProduct(e) {
  e.preventDefault();

  modal.style.display = 'block';

  const product_id = Number(this.value);

  // 프로덕트 정보 가져오기
  try {
    productToModify = await Api.get('/product', product_id);
  } catch (err) {
    console.error(err);
  }
}

async function patchRequest(e) {
  e.preventDefault();
  const formData = new FormData(modalForm);

  let data = {};
  for (let [name, value] of formData) {
    data[name] = value;
  }
  data['product_id'] = productToModify.product_id;

  try {
    let result = await Api.patch('/product', '', data);
    alert('상품 수정 되었습니다.');

    closeModal();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

function closeModal() {
  modal.style.display = 'none';
}
getList();
