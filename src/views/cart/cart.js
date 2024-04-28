import * as Api from '/api.js';
const headerMenu = document.querySelectorAll('#navbar a');
// 변수
let cart = JSON.parse(localStorage.getItem(`myCart`));
let deleteList = [];

// html 엘리먼트 선택
const cartList = document.getElementById('cart-list');
const cartCountField = document.querySelector('.is-size-6');
const purchaseButton = document.getElementById('purchaseButton');

// functions
//장바구니 리스트 렌더링하기
cartRendering();

function cartRendering() {
  let i = 0;
  cartList.innerHTML = '';

  cartCountField.innerText = `${cart.length}개 상품`;

  const elements = cart.map((item) => {
    const { product_image, product_name, quantity, price } = item;
    const total = price * quantity;
    return `
      <li>
          <input type="checkbox" class="list-checkbox" value="${i}"/>
          <img
            src="${product_image}"
            alt=""
          />
          <div class="cart-item-info">
            <h3>${product_name}</h3>
            <div class="item-quantity">
              <button class="minus" value="${i}">
                <i class="fas fa-minus"></i>
              </button>
              <span class="qty">${quantity}</span>
              <button class="plus" value="${i}"><i class="fas fa-plus"></i></button>
            </div>
            <span class="item-price">${price}</span>
            <span class="item-total-price">총 ${total}원</span>
            <button class='cancel' value="${i++}"><i class="fa-solid fa-trash-can"></i></buttonc>
          </div>
      </li>`;
  });
  cartList.innerHTML = elements.join('');

  setOrderInfo();
  cartList.addEventListener('click', clickHandler);
}

function setOrderInfo() {
  const productCount = document.getElementById('productsCount');
  const productsTotal = document.getElementById('productsTotal');
  const deliveryFee = Number(
    document.getElementById('deliveryFee').innerHTML.replace('원', '')
  );
  const totalPriceToPay = document.getElementById('orderTotal');
  let totalOrderPrice = 0;
  let totalCount = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalCount += item.quantity;
      totalOrderPrice += item.price * item.quantity;
    });
  }

  productCount.innerText = totalCount + '개';
  productsTotal.innerText = totalOrderPrice + '원';
  totalPriceToPay.innerText = totalOrderPrice + deliveryFee + '원';
}

function whatButton(targetClass) {
  if (targetClass.contains('list-checkbox')) {
    return 'checkbox';
  } else if (targetClass.contains('fa-trash-can')) {
    return 'cancel';
  } else if (targetClass.contains('fa-plus')) {
    return 'plus';
  } else if (targetClass.contains('fa-minus')) {
    return 'minus';
  }
}

function clickHandler(e) {
  const target = e.target;
  const targetClass = e.target.classList;
  const buttonType = whatButton(targetClass);

  let btn = null;
  let idx = 0;

  switch (buttonType) {
    case 'checkbox':
      const value = Number(target.value);

      if (target.checked) {
        deleteList.push(value);
      } else {
        deleteList = deleteList.filter((idx) => idx !== value);
      }

      if (deleteList.length === cart.length) {
        allSelectCheckbox.checked = true;
      } else {
        allSelectCheckbox.checked = false;
      }
      break;

    case 'cancel':
      btn = target.parentElement; // e.target이 i 태그이기 때문에 parent를 가리켜야함.. (font-awesome 때문)
      idx = Number(btn.value);

      deleteList.push(idx);
      cancelOrder();

      location.reload();
      break;

    case 'plus':
    case 'minus':
      btn = target.parentElement; // e.target이 i 태그이기 때문에 parent를 가리켜야함.. (font-awesome 때문)
      idx = Number(btn.value);
      changeQuantity(buttonType, idx);
  }
}

function cancelOrder() {
  cart = cart.filter((item, idx) => deleteList.indexOf(idx) < 0);
  localStorage.setItem('myCart', JSON.stringify(cart));
}

function changeQuantity(type, idxToChange) {
  const quantityField = document.querySelectorAll('.qty');
  const totalPriceField = document.querySelectorAll('.item-total-price');
  let quantity = Number(quantityField[idxToChange].innerText);
  if (type === 'minus') {
    if (quantity === 1) {
      return;
    } else {
      quantity--;
    }
  } else {
    quantity++;
  }

  quantityField[idxToChange].innerText = quantity;
  totalPriceField[idxToChange].innerText = `총 ${
    quantity * cart[idxToChange].price
  }원`;
  cart[idxToChange].quantity = quantity;
  localStorage.setItem('myCart', JSON.stringify(cart));
  setOrderInfo();
}

// 전체, 선택 삭제
const allSelectCheckbox = document.getElementById('allSelectCheckbox');
const checkList = document.querySelectorAll('.list-checkbox');
const partialDeleteLabel = document.getElementById('partialDeleteLabel');

allSelectCheckbox.addEventListener('click', selectAllHandler);
partialDeleteLabel.addEventListener('click', deleteSelected);

function selectAllHandler() {
  let i = 0;
  checkList.forEach((checkbox) => {
    checkbox.checked = allSelectCheckbox.checked;
    deleteList.push(i++);
  });
}

function deleteSelected() {
  cancelOrder();

  location.reload();
}

// 로그인 상태 체크 -> 로그인 상태에 따른 렌더링을 하는 함수들
function checkLogin() {
  const token = localStorage.getItem('token') || '';
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
  } else if (!checkLogin()) {
    headerMenu[0].href = '/register';
    headerMenu[0].childNodes[0].textContent = '회원가입';

    headerMenu[1].href = '/login';
    headerMenu[1].childNodes[0].textContent = '로그인';
  }
}

loginRender();

// 로그아웃 function
function logout(e) {
  e.preventDefault();

  alert('로그아웃 되었습니다.');
  localStorage.clear();

  window.location.href = '/';
}

//로그인,로그아웃상태에따라 구매하기 버튼 달라지는 function
function goToOrder() {
  if (checkLogin()) {
    window.location.href = '/order';
  } else {
    const alert = confirm(
      '로그인 해주시기 바랍니다. 로그인 페이지로 이동하시겠습니까?'
    );
    if (alert) window.location.href = '/login';
  }
}

purchaseButton.addEventListener('click', goToOrder);

const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
