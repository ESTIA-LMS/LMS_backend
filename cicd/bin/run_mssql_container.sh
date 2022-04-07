#/bin/sh
docker run --rm -d --name mssql \
--user root \
--network lms_network \
-e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Motdepasseconforme64' -e 'MSSQL_PID=Express' \
-p 1433:1433 \
-v $(pwd)/data:/var/opt/mssql/data \
mcr.microsoft.com/mssql/server:2019-latest
