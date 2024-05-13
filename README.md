# SIT725_Group_Project

## Description
This web-based employee management system mainly automates monthly payrolls and seamlessly distributes playsheets to every employee. With additional functionalities like managing employee leaves and extra work time, this application works as a centralized administration to help the HR team.


## Running server on Local machine

### Pre-requisites
- Nodejs
- git
- RabbitMQ locally setup

### Usage
Clone the project from GitHub using the following command in your terminal.
```
git clone https://github.com/prrathnayake/SIT725_Group_Project.git
```

Download the RabbitMQ from https://www.rabbitmq.com/docs/install-windows and enable management UI

Navigate to the http://localhost:15672/ and use username - guest and password - guest to login

Note - in docker file RabbitMQ url is setup to use the host machine rabbitmq server

Go to the project directory and open the terminal or use the following command in the previously open terminal.
```
cd SIT725_Group_Project
```

Then execute the following commands to run the server.
```
npm install
npm start
```

## Running server on Docker container

### Pre-requisites
- Docker

### Usage
First Download DockerFile from this repository

Open the command line and run the following command to build an image.
```
docker build -t <<image name>> .
```
for example
```
docker build -t group_project .
```

Then execute the following command to create the container in docker and run the server.
```
docker run -p <<port on your host machine which you want to map your container port>>:<<user container expose port which you entered in DOCKERFILE>> group_project
```
for example
```
docker run -p 5000:3000 group_project
```


## Running test cases 

Open another terminal in the project directory while running the server and execute the following command.
```
npm run test
```
