import * as Api from '/api.js';

// 변수
let productToModify = null;
let categoryList = null;

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
// 카테고리 동적 렌더링
async function categoryRendering() {
  try {
    const categories = await Api.get('/category');
    categoryList = categories.map(obj => obj.type);
    let categoryUnique = new Set(categoryList);
    categoryList = [...categoryUnique];

    const categoryField = document.querySelector('#type');

    for (let i = 0; i < categoryList.length; i++) {
      let optionElement = `<option value='${categoryList[i]}'>${categoryList[i]}</option>`;
      categoryField.innerHTML += optionElement;
    }
  } catch (err) {
    console.error(err);
  }
}

// 상품 리스트 불러오기
async function getList() {
  const products = await Api.get('/product/all');

  for (let i = 0; i < products.length; i++) {
    const { product_id, product_name, stock, price } = products[i];

    let element = `
    <tr>
      <td>${product_name}</td>
      <td>${stock}개</td>
      <td>${price}원</td>
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

// 상품 삭제
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

// 상품 추가
sellForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(sellForm);

  try {
    let response = await fetch('/product/add', {
      method: 'POST',
      body: formData,
    });
    alert('상품이 추가 되었습니다.');

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

    setDefaultInfo();
  } catch (err) {
    console.error(err);
  }
}

function setDefaultInfo() {
  const { product_name, stock, price, product_info, producer } =
    productToModify;

  const sex = productToModify.category.sex;
  const category = productToModify.category.type;

  // input 필드 선택
  const productNameField = document.querySelector(
    '.modal-content #product_name'
  );
  const producerField = document.querySelector('.modal-content #producer');
  const productInfoField = document.querySelector(
    '.modal-content #product_info'
  );
  const stockField = document.querySelector('.modal-content #stock');
  const priceField = document.querySelector('.modal-content #price');

  // 값 채우기
  productNameField.value = product_name;
  producerField.value = producer;
  productInfoField.value = product_info;
  stockField.value = stock;
  priceField.value = price;

  // select 옵션 값 설정
  const sexOptions = document.querySelectorAll('.modal-content #sex option');
  const modalCategory = document.querySelector('.modal-content #type');
  const modalCategoryOptions = document.querySelector('.modal-content #type');

  for (let i = 0; i < categoryList.length; i++) {
    let optionElement = `<option value='${categoryList[i]}'>${categoryList[i]}</option>`;
    modalCategory.innerHTML += optionElement;
  }

  for (let i = 0; i < sexOptions.length; i++) {
    if (sexOptions[i].value === sex) {
      sexOptions[i].selected = true;
    }
  }

  console.log(modalCategoryOptions);
  for (let i = 0; i < modalCategoryOptions.length; i++) {
    if (modalCategoryOptions[i].value === category) {
      modalCategoryOptions[i].selected = true;
    }
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
    alert('상품이 수정 되었습니다.');

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
categoryRendering();
