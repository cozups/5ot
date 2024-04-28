import { renderCategories } from '/category.js';

const headerMenu = document.querySelectorAll('#navbar a');
const section = document.getElementsByTagName('section')[0];
const product = JSON.parse(sessionStorage.getItem('searchProducts'));
console.log(product);

let sideMenus = await renderCategories();

// 제품목록 가져오기
function getProductList() {
  if (product == '') {
    section.innerHTML = `<h1 id="alert-font"> 입력하신 제품명과 일치하는 제품이 없습니다.</h1>`;
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
getProductList();

// 로그인 상태 체크 -> 로그인 상태에 따른 렌더링을 하는 함수들
function checkLogin() {
  const token = sessionStorage.getItem('token') || '';
  if (token) {
    return true;
  } else {
    return false;
  }
}

function loginRender() {
  if (checkLogin()) {
    // login 상태 (메뉴 배치 순서를 바꾸었습니다.)
    // 회원가입 -> 로그아웃
    headerMenu[0].href = '';
    headerMenu[0].childNodes[0].textContent = '로그아웃';
    headerMenu[0].addEventListener('click', logout);

    // 로그인 -> 마이페이지
    headerMenu[1].href = '/mypage';
    headerMenu[1].childNodes[0].textContent = '마이페이지';
  }
}

// 로그아웃 function
function logout(e) {
  e.preventDefault();

  alert('로그아웃 되었습니다.');
  sessionStorage.clear();

  window.location.href = '/';
}

loginRender();
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
