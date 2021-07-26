#!/bin/bash

## On linux First allow execution of this file as a program by running 'chmod a+rx docker.sh'
## Then run this file by running ./docker.sh 

echo "**************************************************"
echo "Building docker image mybrand/api:latest ..."
echo "**************************************************"
docker build -f Dockerfile.dev -t mybrand/api .

echo "**************************************************"
echo "Starting the application in docker ..."
echo "**************************************************"
docker-compose up
