# 쇼핑몰 웹 서비스 프로젝트

제품들을 조회하고, 장바구니에 추가하고, 또 주문을 할 수 있는 쇼핑몰 웹 서비스 제작 프로젝트입니다. <br />

## Team

| 포지션   | 담당자                 |
| -------- | ---------------------- |
| FrontEnd | 김미소, 박세령, 한수정 |
| BackEnd  | 최두웅, 박세웅         |

<br>

## View

| 메인 화면   | 제품 리스트 화면   |
| -------- | ---------------------- |
| ![image](https://user-images.githubusercontent.com/58796245/199911498-84cacfcc-4cc2-496f-a6d8-5ec5478616a1.png) | ![image](https://user-images.githubusercontent.com/58796245/199911880-5dbf2415-1f4c-42cd-b77f-b4e5afa9154a.png) |

| 제품 상세 정보 화면   | 장바구니 화면   |
| -------- | ---------------------- |
|![image](https://user-images.githubusercontent.com/58796245/199912689-b4c7ef49-c9cc-4cb1-a400-507eac48cbc4.png) | ![image](https://user-images.githubusercontent.com/58796245/199913001-fbda97ec-1fce-4796-9ed4-3fa586f1df80.png) |

| 주문하기 화면   | 마이페이지 화면   |
| -------- | ---------------------- |
| ![image](https://user-images.githubusercontent.com/58796245/199914144-b13daeac-443e-4f11-91eb-7d1a7e0a7f8f.png) | ![image](https://user-images.githubusercontent.com/58796245/199913846-fdc5c85c-6567-4514-8ea5-affccbf81e90.png) |

| 주문 조회 화면   | 회원 정보 수정 화면   |
| -------- | ---------------------- |
|![image](https://user-images.githubusercontent.com/58796245/227207043-5fb91e16-2952-4814-86f4-a3dccbc9c959.png)| ![image](https://user-images.githubusercontent.com/58796245/199914614-66ec3a36-ef8f-4859-8e39-291f1a4e7d19.png)|


## 핵심 기능

### 회원 기능

1. 사용자는 회원가입, 로그인, 회원탈퇴를 할 수 있다.
2. 로그인 시, 회원 정보 및 JWT 토큰은 Session Storage에 저장한다.
3. 사용자는 개인 페이지에서 개인정보를 수정하고 회원 탈퇴를 할 수 있다.
4. 관리자 계정이 존재하며, 일반 사용자 계정과 구분된다.

### 제품 및 주문 기능

1. 제품 목록 조회 및 제품 상세 정보를 조회 가능하다.
2. 장바구니에 제품을 추가할 수 있으며, 장바구니에서 수정 및 삭제가 가능하다.
3. 장바구니는 서버 DB가 아닌 프론트 단에서 저장 및 관리된다. (localStorage 사용)
4. 장바구니에서 주문을 진행하며, 주문 완료 후 조회 및 삭제가 가능함.
5. 관리자는 전체 사용자의 주문을 조회할 수 있고, 일반 사용자는 자신의 주문만 조회할 수 있다.
6. 사용자는 제품을 검색할 수 있다.
7. 사용자는 제품 상세 페이지에서 제품에 대한 후기를 작성할 수 있다.

### UI

1. 헤더를 통해 사용자가 회원가입, 로그인, 로그아웃, 제품 검색, 마이페이지 접근을 할 수 있도록 한다.
2. 메인 페이지는 애니메이션을 이용한 시각적 효과를 주며, 이미지 클릭을 통해 카테고리 내부 제품 목록을 조회할 수 있도록 한다.
3. 제품 목록 페이지에서 제품을 클릭할 경우 제품 상세 정보를 조회할 수 있는 페이지로 연결한다.

## 주요 사용 기술

### 1. 프론트엔드

- **Vanilla javascript**, html, css (Bulma css)
- Font-awesome
- Daum 도로명 주소 api

### 2. 백엔드

- **Express** (nodemon, babel-node)
- Mongodb, Mongoose
- cors

## 폴더 구조

- 프론트: `src/views` 폴더
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**
