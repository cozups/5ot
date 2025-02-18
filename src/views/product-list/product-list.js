import * as Api from '/api.js';
import { renderCategories } from '/category.js';
import { loginRender } from '/loginFunc.js';

// 변수
const pathname = window.location.pathname.split('/');
const sex = pathname[2];
const type = pathname[3];
let sideMenus = [];
async function init() {
  sideMenus = await renderCategories();
}
init();

// Elements
const section = document.getElementsByTagName('section')[0];

// 초기화 및 함수 실행
sideMenus.forEach((menu) => {
  [...menu.parentElement.parentElement.classList].includes(
    sex === 'w' ? 'woman' : 'man'
  ) &&
    menu.innerHTML === type &&
    menu.classList.add('button-active');
});
loginRender();

if (type === 'all') {
  getProductAll();
} else {
  getProductList();
}

// functions
// 카테고리 상관없이 상품 전체 가져오기 -> 성별 필터링 (new 카테고리용)
async function getProductAll() {
  try {
    const result = await Api.get('/product/all');

    const elements = result.map((data) => {
      if (data.category.sex === sex) {
        const { product_name, price, product_info, product_image, product_id } =
          data;

        return `
          <div id="product-list-wrap">
            <a href="/list/${sex}/${data.category.type}/${product_id}"> 
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
      }
    });

    section.innerHTML = elements.join('');
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

// 제품목록 가져오기 (new 카테고리 제외)
async function getProductList() {
  try {
    const result = await Api.get('/product', `${sex}/${type}`);

    const elements = result.map((data) => {
      const { product_name, price, product_info, product_image, product_id } =
        data;

      return `
        <div id="product-list-wrap">
          <a href="/list/${sex}/${data.category.type}/${product_id}"> 
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
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
