import * as Api from '/api.js';

export const fetchCategories = async () => {
  try {
    const womanCategories = [
      {
        sex: 'w',
        type: 'all',
        image:
          'https://images.unsplash.com/flagged/photo-1553802922-2eb2f7f2c65b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ];
    const result = await Api.get('/category');
    const manCategories = [
      {
        sex: 'm',
        type: 'all',
        image:
          'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ];

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
