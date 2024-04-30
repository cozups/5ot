import { loginRender, checkLogin } from '/loginFunc.js';

// 변수
let cart = JSON.parse(localStorage.getItem(`myCart`));
let checkedList = [];

// html 엘리먼트 선택
const cartList = document.getElementById('cart-list');
const cartCountField = document.querySelector('.is-size-6');
const purchaseButton = document.getElementById('purchaseButton');
const allSelectCheckbox = document.getElementById('allSelectCheckbox');
const selectedOrderDeleteLabel = document.getElementById(
  'selectedOrderDeleteLabel'
);

// addEventListener
allSelectCheckbox.addEventListener('click', selectAllHandler);
selectedOrderDeleteLabel.addEventListener('click', cancelSelectedOrder);
purchaseButton.addEventListener('click', goToOrder);

// 함수 실행
cartRendering();
loginRender();

// functions
// 장바구니 아이템 리스트 렌더링
function cartRendering() {
  let i = 0;
  cartList.innerHTML = '';

  cartCountField.innerText = `${cart.length}개 상품`;

  const elements = cart.map((item) => {
    const { product_image, product_name, quantity, price, product_id } = item;
    const total = price * quantity;
    return `
      <li>
          <input type="checkbox" class="list-checkbox" data-product-id="${product_id}"/>
          <img
            src="${product_image}"
          />
          <div class="cart-item-info">
            <h3>${product_name}</h3>
            <div class="item-quantity">
              <button class="minus" value="${i}">
                <i class="fas fa-minus"></i>
              </button>
              <span class="qty">${quantity}</span>
              <button class="plus" data-product-id="${product_id}"><i class="fas fa-plus"></i></button>
            </div>
            <span class="item-price">${price}</span>
            <span class="item-total-price">총 ${total}원</span>
            <button class='cancel' data-product-id="${product_id}"><i class="fa-solid fa-trash-can"></i></buttonc>
          </div>
      </li>`;
  });
  cartList.innerHTML = elements.join('');

  setOrderInfo();
  cartList.addEventListener('click', clickHandler);
}

// 상품 개수, 총 가격 계산
function setOrderInfo() {
  const productCount = document.getElementById('productsCount');
  const productsTotal = document.getElementById('productsTotal');
  const deliveryFee = Number(
    document.getElementById('deliveryFee').innerHTML.replace('원', '')
  );
  const totalPriceToPay = document.getElementById('orderTotal');
  let totalOrderPrice = 0;
  let totalCount = 0;
  if (cart.length) {
    cart.forEach((item) => {
      totalCount += item.quantity;
      totalOrderPrice += item.price * item.quantity;
    });
  }

  productCount.innerText = totalCount + '개';
  productsTotal.innerText = totalOrderPrice + '원';
  totalPriceToPay.innerText = totalOrderPrice + deliveryFee + '원';
}

// 클릭된 버튼의 타입 판별
function checkButtonType(targetClass) {
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

// 이벤트 위임 - 클릭 이벤트 핸들러
function clickHandler(e) {
  const target = e.target;
  const targetClass = e.target.classList;
  const buttonType = checkButtonType(targetClass);

  // e.target이 i 태그이기 때문에 parent를 가리켜야함 (font-awesome 때문)
  let btn = target.parentElement;
  let idx = 0;
  let product_id = Number(btn.dataset.productId);

  switch (buttonType) {
    case 'checkbox':
      product_id = Number(target.dataset.productId);
      target.checked
        ? checkedList.push(product_id)
        : (checkedList = checkedList.filter((id) => id !== product_id));

      allSelectCheckbox.checked = checkedList.length === cart.length;
      break;

    case 'cancel':
      cart = cancelOrder(product_id);
      localStorage.setItem('myCart', JSON.stringify(cart));
      location.reload();
      break;

    case 'plus':
    case 'minus':
      idx = Number(btn.value);
      changeQuantity(buttonType, idx);
  }
}

// 장바구니 주문 취소
function cancelOrder(id) {
  return cart.filter((item) => item.product_id !== id);
}

// 선택된 장바구니 주문 취소
function cancelSelectedOrder() {
  checkedList.forEach((projectId) => {
    cart = cancelOrder(projectId);
  });

  localStorage.setItem('myCart', JSON.stringify(cart));
  location.reload();
}

// 주문 개수 변경
function changeQuantity(type, idxToChange) {
  const quantityField = document.querySelectorAll('.qty');
  const totalPriceField = document.querySelectorAll('.item-total-price');
  let quantity = Number(quantityField[idxToChange].innerText);
  if (type === 'minus') {
    if (quantity > 1) {
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

// 전체 선택 - 한번 더 누르면 전체 취소
function selectAllHandler() {
  const checkList = document.querySelectorAll('.list-checkbox');
  checkList.forEach((checkbox) => {
    checkbox.checked = allSelectCheckbox.checked;
    if (allSelectCheckbox.checked) {
      checkedList.push(+checkbox.dataset.productId);
    } else {
      checkedList = [];
    }
  });
}

//로그인, 로그아웃 상태에따라 구매하기 버튼 달라지는 function
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

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
