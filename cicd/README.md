# Jenkins for CICD

## 1 - Build jenkins image from jenkins Dockerfile

docker build -t jenkins ./cicd

## 2 - Start Jenkins using docker

-> You can start jenkins container using the script in the /cicd/bin directory
sh ./cicd/bin/start_jenkins.sh

## 3 - Go to specified url in your terminal

<http://localhost:8080>

## 3 - Set up Jenkins pipeline

todo
