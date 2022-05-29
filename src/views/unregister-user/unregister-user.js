import * as Api from '/api.js';

const button = document.getElementById('submit');
const passwordInput = document.querySelector('#password');

button.addEventListener('click', unregister);

async function unregister(e) {
  e.preventDefault();

  const password = passwordInput.value;
  const email = sessionStorage.getItem('email');

  try {
    const userInfo = { email, password };
    await Api.delete('/api/unregister', '', userInfo);
    alert('성공적으로 탈퇴되었습니다!');

    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');

    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert(`${err.message}`);
  }
}
