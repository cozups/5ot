import * as Api from '/api.js';
import { loginRender } from '/loginFunc.js';

// Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const searchForm = document.querySelector('.search-form');

// addEventListener
searchForm.addEventListener('submit', searchProducts);
submit.addEventListener('click', searchProducts);

// 함수 실행
loginRender();

// functions
//검색기능
async function searchProducts(e) {
  e.preventDefault();

  const input = search.value;
  const result = await Api.get('/product/all');
  const data = result.filter((item) => {
    return item.product_name
      .trim()
      .toLowerCase()
      .includes(input.toLowerCase().trim());
  });

  //세션스토리지에 저장
  sessionStorage.setItem('searchProducts', JSON.stringify(data));
  window.location.href = '/searchlist';
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
