# SIT725_Group_Project

## Description
This is a web-based employee management system that mainly focus on automation monthly payrolls and seamlessly distributing paysheets to every employee. With additional functionalities like managing employee leaves and extra work time this application work as a centralized administration for help to HR team.

## Pre-requisites
- Docker

## Usage
First Download DockerFile from this repository

Open the command line and run the following command to build an image
```
docker build -t <<image name>> .
```
for example
```
docker build -t group_project .
```

then execute the following command to create the container in docker and run the server
```
docker run -p <<port on your host machine which you want to map your container port>>:<<user container expose port which you entered in DOCKERFILE>> group_project
```
for example
```
docker run -p 5000:3000 group_project
```
