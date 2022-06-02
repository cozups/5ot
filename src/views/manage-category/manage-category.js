import * as Api from '/api.js';

let sexValue = null;
let typeValue = null;
let category_ids = [];
let categoryToModify = null;

// 등록 관련 html 엘리먼트
const registerButton = document.querySelector('#register-button');
const sexInput = document.querySelector('#sex');
const categorynameInput = document.querySelector('#category_name');

// 삭제 관련 html 엘리먼트
const categoryList = document.querySelector('#category-list tbody');

// 수정 관련 html 엘리먼트
const modal = document.querySelector('#modal');
const modalModifyButton = document.querySelector('#modal-button');
const modalCloseButton = document.querySelector('.close-button');
const modalForm = document.querySelector('.modal-content form');

// 이벤트 추가
modalCloseButton.addEventListener('click', closeModal);
modalModifyButton.addEventListener('click', patchRequest);

// functions
async function getCategoryList() {
  const categories = await Api.get('/category');
  let i = 0;
  const elements = categories.map((category) => {
    const { category_id, sex, type } = category;
    category_ids.push(category_id);

    return `
    <tr>
      <td class="sexValue">${sex}</td>
      <td class="typeValue">${type}</td>
      <td>
        <button class="category-modify-button" value='${i}'>
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="category-delete-button" value='${i++}'>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
  });

  categoryList.innerHTML = elements.join('');

  categoryList.addEventListener('click', (e) =>
    categoryManageHandler(e.target.parentElement)
  );
}

function categoryManageHandler(targetButton) {
  const buttonType = whatButton(targetButton);
  console.log(buttonType);
  switch (buttonType) {
    case 'modify':
      modifyCategory(targetButton);
      break;
    case 'delete':
      deleteCategory(targetButton);
      break;
    default:
      break;
  }
}

function whatButton(target) {
  if (target.classList.contains('category-modify-button')) {
    return 'modify';
  } else if (target.classList.contains('category-delete-button')) {
    return 'delete';
  }

  return 'wrong';
}

// 카테고리 삭제
async function deleteCategory(target) {
  const answer = confirm('정말로 삭제하시겠습니까?');

  if (!answer) {
    return;
  }

  sexValue = document.querySelectorAll('.sexValue');
  typeValue = document.querySelectorAll('.typeValue');

  const value = Number(target.value);

  const category_id = category_ids[value];
  const sex = sexValue[value].innerText;
  const type = typeValue[value].innerText;

  try {
    const result = await Api.delete('/category', '', {
      category_id,
      sex,
      type,
    });
    alert('삭제 되었습니다.');
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// 카테고리 추가
registerButton.addEventListener('click', async function (e) {
  e.preventDefault();

  const sex = sexInput.value;
  const type = categorynameInput.value;

  try {
    await Api.post('/category', { sex, type });

    alert('카테고리가 추가 되었습니다.');

    window.location.href = '/mypage/manage/category';
  } catch (err) {
    console.error(err);
  }
});

// 카테고리 수정
async function modifyCategory(target) {
  modal.style.display = 'block';
  const value = Number(target.value);

  // 카테고리 정보 가져오기
  try {
    categoryToModify = await Api.get('/category');
    categoryToModify = categoryToModify[value];

    setDefaultInfo();
  } catch (err) {
    console.error(err);
  }
}

function setDefaultInfo() {
  const { sex, type } = categoryToModify;

  // input 필드 선택
  const categoryNameField = document.querySelector(
    '.modal-content #category_name'
  );

  // 값 채우기
  categoryNameField.value = type;

  // select 옵션 값 설정
  const sexOptions = document.querySelectorAll('.modal-content #sex option');

  for (let i = 0; i < sexOptions.length; i++) {
    if (sexOptions[i].value === sex) {
      sexOptions[i].selected = true;
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
  data['sex'] = categoryToModify.sex;
  data['type'] = categoryToModify.type;

  try {
    let result = await Api.patch('/category', '', data);
    alert('카테고리가 수정 되었습니다.');

    closeModal();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

function closeModal() {
  modal.style.display = 'none';
}

getCategoryList();
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
