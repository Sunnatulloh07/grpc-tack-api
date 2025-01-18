FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn global add @nestjs/cli

RUN yarn build gateway

CMD ["node", "dist/apps/gateway/main.js"]
