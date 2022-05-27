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
const categoryList = document.querySelector('#category-list');

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

  for (let i = 0; i < categories.length; i++) {
    const { category_id, sex, type } = categories[i];
    category_ids.push(category_id);

    let element = `
    <tr>
      <td class="sexValue">${sex}</td>
      <td class="typeValue">${type}</td>
      <td>
        <button class="category-modify-button" value='${i}'>
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="category-delete-button" value='${i}'>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `;
    $(categoryList).append(element);
  }
  const deleteButton = document.querySelectorAll('.category-delete-button');
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deleteCategory);
  }
  const modifyButton = document.querySelectorAll('.category-modify-button');
  for (let i = 0; i < deleteButton.length; i++) {
    modifyButton[i].addEventListener('click', modifyCategory);
  }
}

// 카테고리 삭제
async function deleteCategory(e) {
  e.preventDefault();

  const answer = confirm('정말로 삭제하시겠습니까?');

  sexValue = document.querySelectorAll('.sexValue');
  typeValue = document.querySelectorAll('.typeValue');

  if (!answer) {
    return;
  }

  const value = Number(this.value);
  console.log(value);

  //const category = this.parentElement.parentElement;
  const category_id = category_ids[value];
  const sex = sexValue[value].innerText;
  const type = typeValue[value].innerText;

  console.log(sex, type);
  try {
    alert('삭제 되었습니다.');
    const result = await Api.delete('/category', '', {
      category_id,
      sex,
      type,
    });
  } catch (err) {
    console.error(err);
  }
  location.reload();
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
async function modifyCategory(e) {
  e.preventDefault();

  modal.style.display = 'block';
  const value = Number(this.value);

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
