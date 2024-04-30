import * as Api from '/api.js';

// 변수
let productToModify = null;
let categories = null;

// Elements
// 등록 관련 html 엘리먼트
const sellForm = document.getElementById('sell-form');
const sexInput = document.getElementById('sex');
// 삭제 관련 html 엘리먼트
const productList = document.getElementById('products');
// 수정 관련 html 엘리먼트
const modal = document.getElementById('modal');
const modalModifyButton = document.getElementById('modal-button');
const modalCloseButton = document.querySelector('.close-button');
const modalForm = document.querySelector('.modal-content form');
const modalSexInput = document.querySelector('.modal-content #sex');
const modalCategory = document.querySelector('.modal-content #type');

// addEventListener
modalCloseButton.addEventListener('click', closeModal);
modalModifyButton.addEventListener('click', patchRequest);
sexInput.addEventListener('change', categoryRendering);
modalSexInput.addEventListener('change', renderModalCategory);

// 함수 실행
getList();
categoryRendering();

// functions
// 카테고리 동적 렌더링
async function categoryRendering() {
  try {
    categories = await Api.get('/category');
    const categoryList = categories.filter(
      (category) => category.sex === sexInput.value
    );

    const categoryField = document.getElementById('type');

    const optionElements = categoryList.map(
      (category) => `<option value='${category.type}'>${category.type}</option>`
    );
    categoryField.innerHTML = optionElements.join('');
  } catch (err) {
    console.error(err);
  }
}

// 상품 리스트 불러오기
async function getList() {
  const products = await Api.get('/product/all');

  const elements = products.map((product) => {
    const { product_id, product_name, stock, price } = product;

    return `
    <tr>
      <td>${product_name}</td>
      <td>${stock}개</td>
      <td>${price}원</td>
      <td>
        <button class="product-modify-button" data-product-id="${product_id}" type="button">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="product-delete-button" data-product-id="${product_id}" type="button">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
  });
  productList.innerHTML = elements.join('');

  productList.addEventListener('click', (e) =>
    productManageHandler(e.target.parentElement)
  );
}

// 버튼 타입 체크
function checkTypeButon(target) {
  if (target.classList.contains('product-modify-button')) {
    return 'modify';
  } else if (target.classList.contains('product-delete-button')) {
    return 'delete';
  }

  return 'wrong';
}

// 버튼 별 기능 수행
function productManageHandler(targetButton) {
  const buttonType = checkTypeButon(targetButton);
  switch (buttonType) {
    case 'modify':
      modifyProduct(targetButton);
      break;
    case 'delete':
      deleteProduct(targetButton);
      break;
    default:
      break;
  }
}

// 상품 삭제
async function deleteProduct(target) {
  const answer = confirm('정말로 삭제하시겠습니까?');

  if (!answer) {
    return;
  }

  const product_id = target.dataset.productId;

  try {
    await Api.delete('/product', '', {
      product_id,
    });
    alert('삭제 되었습니다.');
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
    await fetch('/product/insertion', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    alert('상품이 추가 되었습니다.');

    window.location.href = '/mypage/manage/product';
  } catch (err) {
    console.error(err);
  }
});

// 상품 수정
async function modifyProduct(target) {
  modal.style.display = 'block';

  const product_id = target.dataset.productId;

  // 프로덕트 정보 가져오기
  try {
    productToModify = await Api.get('/product', product_id);

    setDefaultInfo();
  } catch (err) {
    console.error(err);
  }
}

// 상품 기본 정보 세팅
function setDefaultInfo() {
  const { product_name, stock, price, product_info, producer, category } =
    productToModify;

  const { sex, type } = category;

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

  // 카테고리 옵션 값 설정
  const sexOptions = document.querySelectorAll('.modal-content #sex option');
  const modalCategoryOptions = document.querySelector(
    '.modal-content #type'
  ).childNodes;

  renderModalCategory();

  sexOptions.forEach((option) => {
    if (option.value === sex) {
      option.selected = true;
    }
  });

  modalCategoryOptions.forEach((option) => {
    if (option.value === type) {
      option.selected = true;
    }
  });
}

// 상품 성별에 따른 카테고리 리스트 동적 렌더링
function renderModalCategory() {
  const modalSexSelected = modalSexInput.value;
  const categoryBySex = categories.filter(
    (category) => category.sex === modalSexSelected
  );
  const optionElements = categoryBySex.map(
    (category) => `<option value='${category.type}'>${category.type}</option>`
  );
  modalCategory.innerHTML = optionElements.join('');
}

// 수정 리퀘스트
async function patchRequest(e) {
  e.preventDefault();
  const formData = new FormData(modalForm);

  let data = {};
  for (let [name, value] of formData) {
    data[name] = value;
  }
  data['product_id'] = productToModify.product_id;
  try {
    await Api.patch('/product', '', data);
    alert('상품이 수정 되었습니다.');

    closeModal();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// 모달 닫기
function closeModal() {
  modal.style.display = 'none';
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
