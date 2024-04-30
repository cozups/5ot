import * as Api from '/api.js';

export const fetchCategories = async () => {
  try {
    const womanCategories = [{ type: 'new' }];
    const result = await Api.get('/category');
    const manCategories = [{ type: 'new' }];

    // 성별 필터링
    result.forEach((category) => {
      category.sex === 'w'
        ? womanCategories.push(category)
        : manCategories.push(category);
    });

    sessionStorage.setItem('womanCategories', JSON.stringify(womanCategories));
    sessionStorage.setItem('manCategories', JSON.stringify(manCategories));

    return [womanCategories, manCategories];
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
};

export async function renderCategories() {
  const slideButtons = [];

  let womanCategories = [];
  let manCategories = [];

  if (
    !sessionStorage.getItem('womanCategories') ||
    !sessionStorage.getItem('manCategories')
  ) {
    [womanCategories, manCategories] = await fetchCategories();
  } else {
    womanCategories = JSON.parse(sessionStorage.getItem('womanCategories'));
    manCategories = JSON.parse(sessionStorage.getItem('manCategories'));
  }

  // ul에 동적으로 li 생성 후 삽입
  const womanUL = document.querySelector('.slide-button-list.woman');
  const manUL = document.querySelector('.slide-button-list.man');

  const womanCategoriesItem = womanCategories.map((cat, index) => {
    const li = document.createElement('li');
    const item = document.createElement('a');
    item.classList.add('slide-button-element');
    item.value = index;
    item.innerHTML = cat.type;
    item.href = `/list/w/${cat.type}`;

    slideButtons.push(item);

    li.append(item);

    return li;
  });

  const manCategoriesItem = manCategories.map((cat, index) => {
    const li = document.createElement('li');
    const item = document.createElement('a');
    item.classList.add('slide-button-element');
    item.value = womanCategories.length + index;
    item.innerHTML = cat.type;
    item.href = `/list/m/${cat.type}`;

    slideButtons.push(item);

    li.append(item);

    return li;
  });

  womanUL.append(...womanCategoriesItem);
  manUL.append(...manCategoriesItem);

  return slideButtons;
}
