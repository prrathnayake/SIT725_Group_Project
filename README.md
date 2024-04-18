# SIT725_Group_Project

## Usage
First Download DockerFile from this repository

Open commandline and run followin command to build image
```
docker build -t group_project .
```

then executr following command to create container in docker and run the server
```
docker run -p 3000:3000 group_project
```