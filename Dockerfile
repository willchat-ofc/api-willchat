FROM node:alpine

RUN apk add --no-cache python3 make g++

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build


EXPOSE 6060

CMD ["yarn", "start"]