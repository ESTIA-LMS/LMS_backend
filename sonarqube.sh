#!/bin/bash
docker run -d --network=sonar --rm -it --name sonarqube -p 9000:9000 sonarqube