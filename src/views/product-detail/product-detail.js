import * as Api from '/api.js';
import * as Util from '/useful-functions.js';

let productData = null; // 다른 함수에서도 상품 데이터를 필요로 하기 때문에 let 사용
let reviews = []; // 다른 함수에서도 리뷰 정보가 필요함
const myEmail = sessionStorage.getItem('email');

const headerMenu = document.querySelectorAll('#navbar a');
const image = document.getElementById('product-thumbnail');
const producer = document.getElementById('producer');
const name = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');
let quantity = document.getElementById('qty').innerText;
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
const reviewButton = document.querySelector('.review-submit');
const reviewList = document.getElementById('reviews');

const purchase = document.getElementById('purchase');
const cart = document.getElementById('cart');
const productId = Number(window.location.pathname.split('/')[4]);

reviewButton.addEventListener('click', postReview);
reviewList.addEventListener('click', reviewHandler);

async function getProductDetail() {
  try {
    productData = await Api.get('/product', `${productId}`);
    image.src = productData.product_image;
    image.innerHTML = productData.src;
    producer.innerHTML = productData.producer;
    name.innerHTML = productData.product_name;
    price.innerHTML = `${Util.addCommas(productData.price)}원`;
    description.innerHTML = productData.product_info;
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

getProductDetail();
loginRender();
reviewRender();

//수량 선택하기
function count(type) {
  let number = Number(document.getElementById('qty').innerText);
  let result = document.getElementById('qty');
  if (type === 'minus') {
    if (number === 2) {
      minus.disabled = true;
    }
    number -= 1;
    result.innerText = number;
  } else if (type === 'plus') {
    if (number >= 0) {
      minus.disabled = false;
    }
    number += 1;
    result.innerText = number;
  }
}

minus.addEventListener('click', () => {
  count('minus');
});
plus.addEventListener('click', () => {
  count('plus');
});

//장바구니 누르면 장바구니로 이동
cart.addEventListener('click', () => {
  const result = addCart();
  if (!result) {
    return;
  }
  let data = confirm(
    '장바구니에 성공적으로 담겼습니다.\n장바구니로 이동하시겠습니까?'
  );
  if (data) {
    window.location.replace('/cart');
  }
});

// 장바구니 추가
function addCart() {
  let isExist = false;
  const cart = JSON.parse(localStorage.getItem('myCart'));
  const quantity = Number(document.getElementById('qty').innerText);
  if (!quantity) {
    alert('개수는 1개 이상이어야 합니다.');
    return false;
  }
  let cartToAdd = {
    product_id: productData.product_id,
    product_image: productData.product_image,
    product_name: productData.product_name,
    quantity: quantity,
    price: productData.price,
  };

  // 이미 카트에 있는 경우
  cart.forEach((item) => {
    if (item.product_name === cartToAdd.product_name) {
      item.quantity += cartToAdd.quantity;
      isExist = true;
    }
  });

  if (!isExist) {
    cart.push(cartToAdd);
  }

  localStorage.setItem(`myCart`, JSON.stringify(cart));
  return true;
}

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

//로그인,로그아웃상태에따라 구매하기 버튼 달라지는 function
function goToOrder() {
  if (checkLogin()) {
    //구매하기 누르면 주문페이지로 이동
    quantity = Number(document.getElementById('qty').innerText);
    let data = productData;
    data['quantity'] = quantity;
    sessionStorage.setItem('productInfo', JSON.stringify(data));
    window.location.href = '/order';
  } else {
    const alert = confirm(
      '로그인 해주시기 바랍니다. 로그인 페이지로 이동하시겠습니까?'
    );
    if (alert) window.location.href = '/login';
  }
}

purchase.addEventListener('click', goToOrder);

async function postReview(e) {
  e.preventDefault();

  const rate = Number(document.getElementById('rate').value);
  const review = document.getElementById('review-content').value;
  const userName = sessionStorage.getItem('userName');

  const data = {
    product_id: productId,
    email: myEmail,
    userName,
    rate,
    review,
  };

  try {
    const result = await Api.post('/review', data);
    alert('리뷰가 작성되었습니다.');
    location.reload();
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

async function reviewRender() {
  try {
    reviews = await Api.get('/review', productId);
    let totalRate = 0;

    let reviewAll = [];
    let idx = 0;
    reviews.forEach((review) => {
      totalRate += review.rate;
      let rate = '';
      for (let i = 0; i < review.rate; i++) {
        rate += '⭐';
      }
      let element = `
        <li class="user-review">
          <h3>${review.userName} (${review.email})</h3>`;
      if (review.email === myEmail) {
        element += `<button class="modify-review" value="${idx}"><i class="fa-solid fa-pencil"></i></button>
        <button class="delete-review" value="${idx++}"><i class="fa-solid fa-xmark"></i></button>`;
      } else {
        element += `<button class="modify-review disabled" value="${idx}" disabled><i class="fa-solid fa-pencil"></i></button>
        <button class="delete-review disabled" value="${idx++}" disabled><i class="fa-solid fa-xmark"></i></button>`;
      }
      element += `<p class="user-rate">${rate}</p>
          <div class="user-review-content">${review.review}</div>
        </li>
      `;

      reviewAll.push(element);
    });

    const reviewTitle = document.querySelector('#review h1');
    let averageRate = Math.round((totalRate / reviews.length) * 100) / 100;
    if (reviews.length === 0) averageRate = '';
    reviewTitle.innerHTML = `후기 (${reviews.length}건) ⭐${averageRate}`;
    reviewList.innerHTML = reviewAll.join('');
  } catch (err) {
    console.error(err);
  }
}

function whatButton(targetButton) {
  if (targetButton.classList.contains('disabled')) {
    return 'disabled';
  } else if (targetButton.classList.contains('modify-review')) {
    return 'modify';
  } else if (targetButton.classList.contains('delete-review')) {
    return 'delete';
  }
}

async function modifyReview(modifyData) {
  const newRate = Number(document.querySelector('.modify-rate').value);
  const newReview = document.querySelector('.modify-review-content').value;

  const data = {
    review_id: modifyData.review_id,
    email: myEmail,
    rate: newRate,
    review: newReview,
  };

  try {
    const result = await Api.patch('/review', '', data);
    alert('리뷰 수정 완료되었습니다.');

    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function reviewHandler(e) {
  e.preventDefault();

  const targetButton = e.target.parentElement;
  const buttonType = whatButton(targetButton);
  const newInput = document.querySelectorAll('.user-review-content');

  switch (buttonType) {
    case 'modify':
      // 수정 기능
      const idxToModify = targetButton.value;
      console.log(idxToModify);
      console.log(reviews[idxToModify]);
      const dataToModify = reviews[idxToModify];

      if (!targetButton.disabled) {
        newInput[idxToModify].innerHTML = `
        <div class="review-input">
          <select name="modify-rate" class="modify-rate">
            <option value="5" selected>5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <textarea
            class="modify-review-content"
            cols="30"
            rows="5"
          >${dataToModify.review}</textarea>
          <button class="review-modify-submit">제출</button>
        </div>
      `;
      }

      const modifySubmit = document.querySelector('.review-modify-submit');

      modifySubmit.addEventListener('click', function (e) {
        e.preventDefault();
        modifyReview(dataToModify);
      });
      break;

    case 'delete':
      // 삭제 기능
      const idxToDelete = targetButton.value;
      console.log(reviews[idxToDelete]);
      const dataToDelete = reviews[idxToDelete];

      const data = {
        review_id: dataToDelete.review_id,
        email: myEmail,
      };

      try {
        const result = await Api.delete('/review', '', data);
        alert('리뷰가 삭제되었습니다.');
        location.reload();
      } catch (err) {
        console.error(err);
      }
      break;

    default:
      break;
  }
}
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
