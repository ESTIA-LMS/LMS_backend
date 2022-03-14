#/bin/sh
docker run --rm --name back_api \
--network lms_network \
-v $(pwd)/api:/usr/app/api -v /usr/app/api/node_modules \
-it back_api /bin/bash ./bin/start.sh