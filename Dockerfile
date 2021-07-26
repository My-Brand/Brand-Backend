FROM node:14-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.build.json ./

RUN yarn install --production && yarn remove @types/node && yarn add @types/node

COPY . .

RUN yarn global add @nestjs/cli@7.6.0 && yarn run build

ENV NODE_ENV=production

CMD node dist/src/main
