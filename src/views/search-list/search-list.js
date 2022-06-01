const headerMenu = document.querySelectorAll('#navbar a');
const section = document.getElementsByTagName('section')[0];
const product = JSON.parse(sessionStorage.getItem('searchProducts'));
console.log(product);
// 제품목록 가져오기
async function getProductList() {
  try {
    for (let i = 0; i < product.length; i++) {
      const sex = product[i].category.sex;
      const type = product[i].category.type;
      const name = product[i].product_name;
      const price = product[i].price.toLocaleString();
      const info = product[i].product_info;
      const image = product[i].product_image;
      const product_id = product[i].product_id;
      let HTMLtemplate = `
        <div id="product-list-wrap">
          <a href="/list/${sex}/${type}/${product_id}">
            <div class="product-list">
            <img class="product-thumbnail" src="${image}"/>
              <div class="product-content">
                <div class="content">
                  <h3 class="name">${name}</h3>
                  <h4 class="price">${price}원</h4>
                  <p class="description">${info}</p>
                </div>
              </div>
            </div>
          </a>

        </div>
        `;
      section.innerHTML += HTMLtemplate;
    }
  } catch (error) {
    console.log(`error : ${error}`);
  }
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
