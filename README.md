# 📖도서관 프로젝트
도서관리 시스템 개발

# 개발 기간
2024.03.01 ~ ?

# ⚙개발 환경
- React

# 주요 기능
## 회원
### 👨내서재
## 대출 현황
 - 현재 대출한 도서 정보 노출
 - 사용자에게 아래 정보 노출
   1. 순번
   2. 도서 제목(클릭 시 해당 도서 상세페이지로 이동)
   3. 대출일
   4. 반납 예정일
   5. 반납 연기 버튼
- 차순 정리는 **대출일**, **반납 예정일** 로 가능

## 대출 이력
 - 과거 대출하였던 도서 정보 노출

  - 사용자에게 아래 정보 노출
    1. 순번
    2. 도서 제목(클릭 시 해당 도서 상세페이지로 이동)
    3. 대출일
    4. 반납일
    5. 상태
    6. 연체(연체일자)
- 차순 정리는 **대출일**, **반납일** 로 가능

## 💜내 책장
- 내가 찜한 책 노출

## 🔍도서 조회
- 도서 조회는 누구나 가능
- 조회 조건은 **도서 제목**, **저자명** 으로 가능
- 차순 정리는 **발행년도**, **도서제목** 으로 가능
- 간단 조회 결과 시 사용자에게 아래 내용 노출
  1. 제목
  2. 저자
  3. 발행년도
  4. 도서 상태
  5. 이미지
 
- 상세 조회 결과 시 사용자에 아래 내용 노출
  1. 제목
  2. 저자
  3. 발행연도
  4. 도서상태
  5. 이미지
  6. 리뷰 내용
  7. 내용 설명

## 📝도서 리뷰
 - 대여했던 도서에 한해 회원은 1회 후기 작성 가능
 - 도서 상세 조회 결과 시 해당 내용 노출
     
## 도서 대출/반납/연장
 - 회원만 가능
 - 반납 기한은 대출일로부터 +7일
 - 반납 연장 1회 가능하며, 연장반납은 반납예정일로부터 +7일
 - 회원 당 최대 2권 대여 가능
   
## 🚫도서 연체
- 도서 연체 판단은 **대출한 도서의 반납예정일 넘기는 조건**
- 도서 연체 시 최초 연체 일자부터 연체된 도서의 마지막 반납일+7일까지  도서 대출 불가

## 🔉알림
- 도서 대출 성공 
- 도서 반납 성공(연체된 도서 포함)
- 도서 연체 시 반납 완료 전까지 연체 알림 발송
- 연체 종료


# 페이지
[라이트모드/다크모드]
- 다크 모드
<p align="center">
 <img width="877" alt="darkMode" src="https://github.com/user-attachments/assets/4053bc57-995f-4147-814c-961717415df6"></p> 

 - 라이트 모드
<p align="center">
 <img width="872" alt="lightMode" src="https://github.com/user-attachments/assets/166d5f12-0ba9-4538-a0e4-a2761838d3ae"> 
</p> 

[메인 페이지]
<p align="center">
  <img width="1180" alt="main" src="https://github.com/user-attachments/assets/7071468f-6931-4676-aa34-442cc43c08f8">
</p>

[로그인]
<p align="center">
 <img width="1147" alt="login" src="https://github.com/user-attachments/assets/3d8de355-4612-4794-ae88-00e602e4adfd">
</p>

[회원가입]
<p align="center">
 <img width="1193" alt="join" src="https://github.com/user-attachments/assets/76ab6ca6-60f0-48cd-be53-00733fc7153a">
</p>

[도서 검색]
 - ListType 
<p align="center">
 <img width="713" alt="booksSearch" src="https://github.com/user-attachments/assets/24d16f8b-b683-4e57-892b-6a1b6faa6007">
</p>

 - GridType
<p align="center">
 <img width="685" alt="booksSearch-gridType" src="https://github.com/user-attachments/assets/8e04354e-a4b1-4a38-ac17-485e6a4b11b8">
</p>

[특정 도서 조회]
<p align="center">
 <img width="701" alt="booInfo" src="https://github.com/user-attachments/assets/ef9d803d-897b-4481-844d-2998b5b5f865">
</p>

[도서 등록]
<p align="center">
 <img width="703" alt="도서등록" src="https://github.com/user-attachments/assets/fc5e0cc1-fd27-441e-84ba-5b96c8054b67">
</p>

[마이 페이지]
<p align="center">
 <img width="704" alt="mypage" src="https://github.com/user-attachments/assets/526705ea-0822-4d88-84d7-502e9a77f8ef">
</p>

[내서재(대출 현황)]
<p align="center">
 <img width="722" alt="내서재(대출현황)" src="https://github.com/user-attachments/assets/8864553f-c210-4e1f-8b84-a31f686defba">
</p>

[내서재(대출 이력)]
<p align="center">
 <img width="692" alt="내서재(대출이력)" src="https://github.com/user-attachments/assets/376c6160-4fb8-4436-b70b-fcd61c573d79">
</p>

[내서재(마이 책장)]
<p align="center">
 <img width="713" alt="내서재(내책장0" src="https://github.com/user-attachments/assets/ca66a105-681a-436b-919a-0989e5538ac8">
</p>

[내서재(마이 리뷰)]
<p align="center">
 <img width="698" alt="내서재(내리뷰)" src="https://github.com/user-attachments/assets/62088f31-7277-42d3-b345-1386378a8996">
</p>


# 프로젝트를 통한 배운 경험

#
