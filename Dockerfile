FROM node:16

WORKDIR /app

ADD server.js package.json .env ./

RUN npm install
CMD npm run prod