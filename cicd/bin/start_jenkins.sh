#/bin/sh

docker run \
  --name jenkins-docker \
  --rm \
  --detach \
  --privileged \
  --network jenkins \
  --network-alias docker \
  --env DOCKER_TLS_CERTDIR=/certs \
  --volume jenkins-docker-certs:/certs/client \
  --volume jenkins-data:/var/jenkins_home \
  --publish 2376:2376 \
  --publish 3000:3000 \
  docker:dind \
  --storage-driver overlay2 

docker run --name jenkins --rm --detach \
--network jenkins --env DOCKER_HOST=tcp://docker:2376 \
--env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
--volume jenkins-data:/var/jenkins_home --volume jenkins-docker-certs:/certs/client:ro \
--publish 8080:8080 --publish 50000:50000 myjenkins:latest

echo '
******************JENKINS*******************

Jenkins is running on http://localhost:8080

use "docker exec -it jenkins bash" to enter jenkins container'


