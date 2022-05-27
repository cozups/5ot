import * as Api from '/api.js';
const headerMenu = document.querySelectorAll('#navbar a');
const section = document.getElementsByTagName('section')[0];
// 제품목록 가져오기
async function getProductList() {
  try {
    const result = await Api.get('/product', 'w/new');
    console.log(result);
    console.log(result[0].product_name);
    for (let i = 0; i < result.length; i++) {
      let name = result[i].product_name;
      let price = result[i].price.toLocaleString();
      let info = result[i].product_info;
      let image = result[i].product_image;
      let productId = result[i].product_id;
      console.log(image);
      // 상세페이지 구현 후 a태그 경로 바꿔야함!!!!!
      let HTMLtemplate = `
        <div id="product-list-wrap">
          <a href="/w/new/${productId}"> 
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
  sessionStorage.removeItem('token');

  window.location.href = '/';
}

loginRender();
