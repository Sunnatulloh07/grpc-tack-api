FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN yarn global add @nestjs/cli
RUN yarn install

RUN yarn build order

CMD ["node", "dist/apps/order/main.js"]
