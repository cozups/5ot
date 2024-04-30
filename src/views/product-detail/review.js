import * as Api from '/api.js';

// 변수
const pathname = window.location.pathname.split('/');
const productId = Number(pathname[4]);

// Elements
const reviewButton = document.querySelector('.review-submit');
const reviewList = document.getElementById('reviews');

// addEventListener
reviewButton.addEventListener('click', postReview);
reviewList.addEventListener('click', reviewHandler);

// 함수 실행
reviewRender();

// functions
// 리뷰 렌더링
async function reviewRender() {
  try {
    const reviewData = await Api.get('/review', productId);
    const email = localStorage.getItem('email');
    let totalRate = 0;

    const reviews = reviewData.map((review) => {
      console.log(review);
      totalRate += review.rate;
      let rate = '⭐'.repeat(review.rate);

      let element = `
        <li class="user-review">
          <h3>${review.userName} (${review.email})</h3>`;

      if (review.email === email) {
        element += `
        <button class="modify-review" data-review-id="${review.review_id}">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="delete-review" data-review-id="${review.review_id}">
          <i class="fa-solid fa-xmark"></i>
        </button>`;
      }

      element += `<p class="user-rate">${rate}</p>
          <div class="user-review-content" data-review-id="${review.review_id}">${review.review}</div>
        </li>
      `;

      return element;
    });

    const reviewTitle = document.querySelector('#review h1');
    let averageRate = Math.round((totalRate / reviewData.length) * 100) / 100;

    if (reviewData.length === 0) {
      averageRate = '';
    }

    reviewTitle.innerHTML = `후기 (${reviewData.length}건) ⭐${averageRate}`;
    reviewList.innerHTML = reviews.join('');
  } catch (err) {
    console.error(err);
  }
}

// 리뷰 등록
async function postReview(e) {
  e.preventDefault();

  const rate = Number(document.getElementById('rate').value);
  const review = document.getElementById('review-content').value;
  const userName = localStorage.getItem('userName');
  const email = localStorage.getItem('email');

  const data = {
    product_id: productId,
    email,
    userName,
    rate,
    review,
  };

  try {
    await Api.post('/review', data);
    alert('리뷰가 작성되었습니다.');
    location.reload();
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

// 버튼 타입 체크
function checkTypeButton(targetButton) {
  if (targetButton.classList.contains('modify-review')) {
    return 'modify';
  }
  if (targetButton.classList.contains('delete-review')) {
    return 'delete';
  }
}

// 리뷰 수정
async function modifyReview(review_id) {
  const newRate = Number(document.querySelector('.modify-rate').value);
  const newReview = document.querySelector('.modify-review-content').value;
  const email = localStorage.getItem('email');

  const data = {
    review_id,
    email,
    rate: newRate,
    review: newReview,
  };

  try {
    await Api.patch('/review', '', data);
    alert('리뷰 수정 완료되었습니다.');

    location.reload();
  } catch (err) {
    console.error(err);
  }
}

// 리뷰 이벤트 핸들러
async function reviewHandler(e) {
  e.preventDefault();

  const targetButton = e.target.parentElement;
  const buttonType = checkTypeButton(targetButton);
  const review_id = targetButton.dataset.reviewId;
  const newInput = document.querySelector(
    `.user-review-content[data-review-id="${review_id}"]`
  );

  switch (buttonType) {
    case 'modify':
      // 수정 기능
      newInput.innerHTML = `
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
          >${newInput.innerText}</textarea>
          <button class="review-modify-submit">제출</button>
        </div>
      `;

      const modifySubmit = document.querySelector('.review-modify-submit');
      modifySubmit.addEventListener('click', () => modifyReview(review_id));
      break;

    case 'delete':
      // 삭제 기능
      const email = localStorage.getItem('email');

      const data = {
        review_id,
        email,
      };

      try {
        await Api.delete('/review', '', data);
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
