import * as Api from '/api.js';

// 등록 관련 html 엘리먼트
const sellForm = document.querySelector('#sell-form');
const registerButton = document.querySelector('#register-button');
const sexInput = document.querySelector('#sex');
const categorynameInput = document.querySelector('#category_name');

// 삭제 관련 html 엘리먼트
const categoryList = document.querySelector('#category-list');

// 이벤트 추가

// functions

async function getCategoryList() {
  const categories = await Api.get('/category');

  for (let i = 0; i < categories.length; i++) {
    const { sex, category_name } = categories[i];

    let element = `
    <tr>
      <td>${sex}</td>
      <td>${category_name} 개</td>
      <td>
        <button class="category-modify-button" value='${new_category}'>
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="category-delete-button" value='${new_category}'>
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
}

async function deleteCategory(e) {
  e.preventDefault();

  const answer = confirm('정말로 삭제하시겠습니까?');

  if (!answer) {
    return;
  }

  const category = this.parentElement.parentElement;
  const new_category = this.value;

  try {
    alert('삭제 되었습니다.');
    const result = await Api.delete('/category', '', {
      new_category,
    });
    $(category).remove();
  } catch (err) {
    console.error(err);
  }
  location.reload();
}

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

getCategoryList();
