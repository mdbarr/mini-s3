FROM node:carbon-alpine

WORKDIR /mini-s3

COPY package.json yarn.lock ./

RUN yarn install && yarn global add forever

COPY . .

EXPOSE 9090

CMD [ "npm", "start" ]
