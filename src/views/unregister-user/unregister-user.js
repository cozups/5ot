import { redirect } from 'express/lib/response';

let button = document.getElementById('submit');

button.addEventListener('click', function () {
  let password = document.getElementById('password').value;

  ValidatePassword(password);

  try {
    const data = { email, password }; // email을 넘겨줘야 하나? user에게 입력받는건가?

    const result = await Api.get('/api/unregister', data);
    alert('탈퇴되었습니다.');//비밀번호 같으면
    redirect('/');
  } catch (error) {
    console.log(error);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error}`);
  }
});
