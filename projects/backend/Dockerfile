FROM node:16-alpine As development

LABEL "server"="api-express"
LABEL maintainer="joseagraz29@gmail.com"
LABEL version="1.0"

RUN apk add nano

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 3900
CMD ["yarn", "run", "start", "dev"]

