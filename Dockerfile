# step 1 빌드를 하기 위한 과정
FROM node:16-alpine AS build

# root 에 app 폴더를 생성 
RUN mkdir /app

# /app폴더로 이동
WORKDIR /app 

# 이동한 app폴더 내에 package* 파일 복사
# COPY package.json package-lock.json ./
COPY ./package* ./

# /app 폴더 내에서 package.json에 포함된 의존성 패키지들을 일괄적으로 설치하는 명령어
# 완료 후 /app 폴더 내에 node_modules 생성
RUN npm install

# 체크
RUN ls -lrt

COPY . ./

# app폴더에서 build 진행되었으므로 build디렉터리 생성
RUN npm run build

# step 2 실행 스테이지를 위한 과정
# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# work dir 이동
WORKDIR /app

# work dir 에 build 폴더 생성 /app/build
# RUN mkdir ./build

# work dir 에 public/img 폴더 생성 /app/public/img
# RUN mkdir ./public/img -> 컨테이너 구동 시 볼륨 옵션추가할 때 생성될 것으로 보임

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
# ADD ./build ./build
COPY --from=build /app/build /app/build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]