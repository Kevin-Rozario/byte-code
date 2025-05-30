FROM node:23-alpine

WORKDIR /bytecode-frontend

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD [ "node", "index.js" ]