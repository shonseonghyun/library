FROM node:16.20.2

WORKDIR /home/ec2-user/front

COPY pacakage.sjon package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm","start"]