#!/bin/sh
# start_api.sh
echo " ************************************************************************************
> nodejs is starting..."
docker run --rm --name back_api \
--network lms_network \
-v $(pwd)/api:/usr/app/api -v /usr/app/api/node_modules \
-p 3000:3000 \
back_api /bin/sh -c 'npm run start'

