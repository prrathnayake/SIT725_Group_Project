FROM node:latest

WORKDIR /usr/src/projects

RUN apt-get update
RUN apt-get install git
RUN git clone https://github.com/prrathnayake/SIT725_Group_Project.git && cd SIT725_Group_Project && npm install

EXPOSE 3000

WORKDIR /usr/src/projects/SIT725_Group_Project


CMD [ "node", "server.js" ]