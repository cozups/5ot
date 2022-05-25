import { redirect } from 'express/lib/response';

let button = document.getElementById('submit');

button.addEventListener('click', function () {
  let password = document.getElementById('password').value;

  ValidatePassword(password);

  try {
    const data = { email, password }; // email을 넘겨줘야 하나? user에게 입력받는건가?

    const result = await Api.get('/api/unregister', data);
    //후에 탈퇴 여부 확인 필요(비밀번호 다르면 fail)


    alert('탈퇴되었습니다.');//비밀번호 같으면
    redirect('/');
  } catch (error) {
    console.log(error);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error}`);
  }
});

//패스워드 유효성체크
function ValidatePassword(password) {
  const isPasswordValid = password.length >= 4;//비밀번호 조건 추가해야 할 것 같음
  
  if (!isPasswordValid) {
    alert("비밀번호를 정확히 입력해주세요.")
    document.getElementById('password').focus();
  }
}