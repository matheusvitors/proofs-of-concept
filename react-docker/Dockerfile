FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm i --silent
RUN npm i react-scripts@5.0.1 -g --silent

COPY . /app

EXPOSE 3000

CMD [ "npm", "start" ]