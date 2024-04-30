import { fetchCategories } from '/category.js';
import * as Api from '/api.js';

// 변수
let categoryToModify = null;

// Elements
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

// addEventListener
modalCloseButton.addEventListener('click', closeModal);
modalModifyButton.addEventListener('click', patchRequest);

// 함수 실행
getCategoryList();

// functions
// 카테고리 리스트를 가져와 렌더링 하고 이벤트 리스너 부착
async function getCategoryList() {
  const categories = await Api.get('/category');

  const elements = categories.map((category) => {
    const { category_id, sex, type } = category;

    return `
    <tr>
      <td class="sexValue">${sex}</td>
      <td class="typeValue">${type}</td>
      <td>
        <button class="category-modify-button" data-category-id="${category_id}" data-sex="${sex}" data-type="${type}">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="category-delete-button" data-category-id="${category_id}" data-sex="${sex}" data-type="${type}">
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

// 버튼 타입 체크
function checkButtonType(target) {
  if (target.classList.contains('category-modify-button')) {
    return 'modify';
  } else if (target.classList.contains('category-delete-button')) {
    return 'delete';
  }

  return 'wrong';
}

// 버튼 별 기능 수행
function categoryManageHandler(targetButton) {
  const buttonType = checkButtonType(targetButton);
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

// 카테고리 삭제
async function deleteCategory(target) {
  const answer = confirm('정말로 삭제하시겠습니까?');

  if (!answer) {
    return;
  }

  const category_id = target.dataset.categoryId;
  const sex = target.dataset.sex;
  const type = target.dataset.type;

  try {
    await Api.delete('/category', '', {
      category_id,
      sex,
      type,
    });
    alert('삭제 되었습니다.');
    await fetchCategories();
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
    await fetchCategories();

    window.location.href = '/mypage/manage/category';
  } catch (err) {
    console.error(err);
  }
});

// 카테고리 수정
async function modifyCategory(target) {
  modal.style.display = 'block';
  const categoryId = +target.dataset.categoryId;

  // 카테고리 정보 가져오기
  try {
    const categoryList = await Api.get('/category');
    categoryToModify = categoryList.find(
      ({ category_id }) => category_id === categoryId
    );

    setDefaultInfo();
  } catch (err) {
    console.error(err);
  }
}

// 수정 모달에 기본 정보 넣기
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

// 카테고리 수정 리퀘스트
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
    await Api.patch('/category', '', data);
    alert('카테고리가 수정 되었습니다.');

    closeModal();
    await fetchCategories();
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// 모달 감추기
function closeModal() {
  modal.style.display = 'none';
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
