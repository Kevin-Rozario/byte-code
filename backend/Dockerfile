FROM node:23-alpine

WORKDIR /bytecode-backend

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 4000

CMD [ "node", "index.js" ]