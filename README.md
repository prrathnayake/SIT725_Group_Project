# SIT725_Group_Project

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
