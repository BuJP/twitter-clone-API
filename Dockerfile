FROM node:17-alpine3.14

WORKDIR /application

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npm run dev