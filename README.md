# 📖도서관 프로젝트
도서관리 시스템 개발
- 많은 사람들이 아는 대여,반납,연장,연체 관련 토이프로젝트 
- 도서관이라는 평범한 컨텐츠이지만 개발부터 배포까지 모두 진행해보는 것에 의의를 둠
- 배포 URL : http://44.213.131.145

# 개발 기간
2024.03.01 ~ 2024.07.01

# ⚙개발 환경 및 사용 기술
- IDE: Visual Studio Code
- AWS EC2
- React
  * React Query

  * Axios Interceptor
    - accessToken, refreshToken을 통한 요청/응답 전 필요한 작업 수행 (ex. 헤더 세팅, 토큰 만료 시 재발급 진행 등)
      
  * styled-Components
    - props를 이용하여 조건부 스타일링, 다크/라이트모드 구현
     
  * Recoil
    - 로그인 시 사용자정보, 라이트모드/다크모드 설정값을 atom에 저장하여 필요한 컴포넌트에서 구독

  * React-hook-form
    - 필요한 데이터들을 모두 useState 로 관리하자니 불필요한 랜더링이 많이 발생
    - 사용하면서 느낀 장점은 불필요한 랜더링 방지,데이터 추적 및 유효성 검사, 코드 양이 현저히 감소 등  
  
- Docker
  * 하나의 AWS EC2 서버에서 nginx 컨테이너를 띄워 리액트 배포, Jenkins컨테이너를 띄워 자동배포 구현
  
- Jenkins
  * master 브랜치 푸쉬 시 자동배포 구현
    
# 주요 기능
<a href="https://github.com/shonseonghyun/library-front/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5">
 주요 기능
</a>


# 구현 페이지
__[라이트모드/다크모드]__
- 다크 모드
<p align="center">
 <img width="877" alt="darkMode" src="https://github.com/user-attachments/assets/4053bc57-995f-4147-814c-961717415df6"></p> 

 - 라이트 모드
<p align="center">
 <img width="872" alt="lightMode" src="https://github.com/user-attachments/assets/166d5f12-0ba9-4538-a0e4-a2761838d3ae"> 
</p> 

__[로그인]__
<p align="center">
 <img width="1147" alt="login" src="https://github.com/user-attachments/assets/3d8de355-4612-4794-ae88-00e602e4adfd">
</p>

__[회원가입]__
<p align="center">
 <img width="1193" alt="join" src="https://github.com/user-attachments/assets/76ab6ca6-60f0-48cd-be53-00733fc7153a">
</p>

__[도서 검색]__
 - ListType 
<p align="center">
 <img width="713" alt="booksSearch" src="https://github.com/user-attachments/assets/24d16f8b-b683-4e57-892b-6a1b6faa6007">
</p>

 - GridType
<p align="center">
 <img width="685" alt="booksSearch-gridType" src="https://github.com/user-attachments/assets/8e04354e-a4b1-4a38-ac17-485e6a4b11b8">
</p>

__[특정 도서 조회]__
<p align="center">
 <img width="701" alt="booInfo" src="https://github.com/user-attachments/assets/ef9d803d-897b-4481-844d-2998b5b5f865">
</p>

__[도서 등록]__
<p align="center">
 <img width="703" alt="도서등록" src="https://github.com/user-attachments/assets/fc5e0cc1-fd27-441e-84ba-5b96c8054b67">
</p>

__[마이 페이지]__
<p align="center">
 <img width="704" alt="mypage" src="https://github.com/user-attachments/assets/526705ea-0822-4d88-84d7-502e9a77f8ef">
</p>

__[내서재(대출 현황)]__
<p align="center">
 <img width="722" alt="내서재(대출현황)" src="https://github.com/user-attachments/assets/8864553f-c210-4e1f-8b84-a31f686defba">
</p>

__[내서재(대출 이력)]__
<p align="center">
 <img width="692" alt="내서재(대출이력)" src="https://github.com/user-attachments/assets/376c6160-4fb8-4436-b70b-fcd61c573d79">
</p>

__[내서재(마이 책장)]__
<p align="center">
 <img width="713" alt="내서재(내책장0" src="https://github.com/user-attachments/assets/ca66a105-681a-436b-919a-0989e5538ac8">
</p>

__[내서재(마이 리뷰)]__
 - 작성 전
<p align="center">
 <img width="698" alt="내서재(내리뷰)" src="https://github.com/user-attachments/assets/62088f31-7277-42d3-b345-1386378a8996">
</p>

- 작성 후
<p align="center">
 <img width="688" alt="내서재(내리뷰-작성완료)" src="https://github.com/user-attachments/assets/cd215c43-fb27-413b-81d9-92dbfbe39fd2">
</p>

# 개선 사항
 - 도서 업로드 시 이미지 파일 압축
 - 첫 리액트를 통한 개발이기에 패키지에 대한 명확한 가이드라인 없이 진행하였기에 패키지 구조에 대한 개선이 필요
 - 개발, 운영 파일 분리
 - 브랜치 전략 사용
 - 리랜더링 범위 최소 (<a herf="https://se0nghyun2.tistory.com/66">해결</a>)

# 프로젝트를 통한 배운 경험 및 소감
제가 처음부터 끝까지(프론트,백,서버 자동 배포,깃허브 등) 구현을 한 번도 해본 적이 없었고 심지어 프론트와 배포는 아예 처음이였기에 이번 프로젝트는 굉장히 오래 걸리고 힘들었다. 그러나 배울 점은 정말 많았다. 리액트가 무엇이며 어떤 식으로 리랜더링 최적화를 진행하여야 하는지, 제가 프로젝트 내에서 사용 라이브러리의 장점 등을 알게 되었다. 물론 모든 걸 직접 구현하다보니 코드의 퀄리티, 리액트의 장점 등을 완전히 활용하지 못한 것을 느낀다. 이를 바탕으로 지금 구현한 코드들, 이 이후 진행하게 될 수도 있는 프로젝트에서 내가 부족했던 내용들을 인지하고 보충하여 개발할 수 있게 되어 정말 뿌듯하다.
