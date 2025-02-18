import { renderCategories } from '/category.js';
import { loginRender } from '/loginFunc.js';

// Elements
const section = document.getElementsByTagName('section')[0];

// 함수 실행
async function init() {
  await renderCategories();
}
init();
getProductList();
loginRender();

// 제품목록 가져오기
function getProductList() {
  const product = JSON.parse(sessionStorage.getItem('searchProducts'));

  if (!product.length) {
    section.innerHTML = `<h1 id="alert-font"> 입력하신 제품명과 일치하는 제품이 없습니다.</h1>`;
    return;
  }
  const elements = product.map((data) => {
    const {
      sex,
      type,
      product_name,
      price,
      product_info,
      product_image,
      product_id,
    } = data;

    return `
        <div id="product-list-wrap">
          <a href="/list/${sex}/${type}/${product_id}">
            <div class="product-list">
            <img class="product-thumbnail" src="${product_image}"/>
              <div class="product-content">
                <div class="content">
                  <h3 class="name">${product_name}</h3>
                  <h4 class="price">${price.toLocaleString()}원</h4>
                  <p class="description">${product_info}</p>
                </div>
              </div>
            </div>
          </a>

        </div>
        `;
  });
  section.innerHTML = elements.join('');
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
