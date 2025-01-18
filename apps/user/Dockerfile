FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY . .

RUN yarn global add @nestjs/cli
RUN yarn install

RUN yarn build user

CMD ["node", "dist/apps/user/main.js"]
