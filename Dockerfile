FROM node:latest

WORKDIR /usr/src/projects

# assign a port number to run the server and expose it in main machine
ARG port=5000

RUN apt-get update
RUN apt-get install git
RUN git clone https://github.com/prrathnayake/SIT725_Group_Project.git && cd SIT725_Group_Project && npm install

# define environment variables to use in the system
ENV DATABASE_URL="your_mongoDB_URL"
ENV PORT=port
ENV SECRET_KEY="yoursecretkey"
ENV RABBITMQ_URL="amqp://host.docker.internal:5672"

EXPOSE $port

WORKDIR /usr/src/projects/SIT725_Group_Project


CMD [ "node", "server.js" ]