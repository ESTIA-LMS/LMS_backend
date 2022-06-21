#!/bin/bash

docker run \
--rm \
--network=sonar \
-e SONAR_HOST_URL="http://172.18.0.2:9000" \
-v /mnt/d/ESTIA/LMS/back:/usr/src \
sonarsource/sonar-scanner-cli \
-Dsonar.projectKey=LMS \
-Dsonar.sources=./api \
-Dsonar.login=sqp_d869c7546c8cae784e877ccaf504893dd767cc27