FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock /app

RUN yarn install

COPY . .

RUN yarn build

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]