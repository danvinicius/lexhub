FROM node:18-alpine

COPY package.json yarn.lock /app/

WORKDIR /app/

RUN yarn install

COPY ./ /app/

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]