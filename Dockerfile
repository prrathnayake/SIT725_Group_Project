FROM node:latest

WORKDIR /usr/src/group_project

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]