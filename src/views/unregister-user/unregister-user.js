import * as Api from '/api.js';

let button = document.getElementById('submit');

button.addEventListener('click', async function () {
  let password = document.getElementById('password').value;
  const email = sessionStorage.getItem('email');

  try {
    const userInfo = await Api.get('/api/email', email);
    const result = await Api.delete('/api/unregister', '', {
      email,
      password,
    });
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
    alert('성공적으로 탈퇴되었습니다!');
    window.location.href = '/';
  } catch (err) {
    console.error(err);
  }
});
