import * as Api from '/api.js';

// 변수
let user = null;

// html 엘리먼트
const nameField = document.querySelector('#fullNameInput');
const phoneNumberField = document.querySelector('#phoneNumber');
const idField = document.querySelector('#user-id');

const submitButton = document.querySelector('#submitButton');

// 이벤트 추가
submitButton.addEventListener('click', patchUserInfo);

// functions
// 기본적으로 표시되게 할 정보들을 표시한다.
async function setDefaultInfo() {
  const userEmail = sessionStorage.getItem('email');

  user = await Api.get('/api/email', userEmail);
  const { fullName, phoneNumber, email } = user;

  nameField.value = fullName;
  phoneNumberField.value = phoneNumber || '';
  idField.innerHTML = email;
}

// 폼 제출이 되었을 때, 유저 정보를 변경한다.
async function patchUserInfo(e) {
  e.preventDefault();

  const userId = user._id;

  const name = nameField.value;
  const phone = phoneNumberField.value || '';
  const currentPassword = document.querySelector('#currentPassword').value;
  const newPassword = document.querySelector('#newPassword').value;
  const role = user.role;
  const postalCode = document.querySelector('#postalCode').value;
  const address1 = document.querySelector('#address1').value;
  const address2 = document.querySelector('#address2').value;

  const data = {
    fullName: name,
    currentPassword,
    password: newPassword,
    address: {
      postalCode,
      address1,
      address2,
    },
    phoneNumber: phone || '',
    role,
  };

  alert('수정 완료되었습니다.');
  location.reload();
  try {
    const result = await Api.patch('/api/users', userId, data);
  } catch (err) {
    console.error(err);
  }
}

setDefaultInfo();
