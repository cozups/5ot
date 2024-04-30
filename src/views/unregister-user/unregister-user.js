import * as Api from '/api.js';

// Elements
const button = document.getElementById('submit');
const passwordInput = document.querySelector('#password');

// addEventListener
button.addEventListener('click', unregister);

// functions
// 회원 탈퇴
async function unregister(e) {
  e.preventDefault();

  const password = passwordInput.value;
  const email = localStorage.getItem('email');

  try {
    const userInfo = { email, password };
    await Api.delete('/api/unregister', '', userInfo);
    alert('성공적으로 탈퇴되었습니다!');

    localStorage.removeItem('email');
    localStorage.removeItem('token');

    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}

// 불필요한 데이터 클리어
const purchaseData = sessionStorage.getItem('productInfo');
if (purchaseData) {
  sessionStorage.removeItem('productInfo');
}
