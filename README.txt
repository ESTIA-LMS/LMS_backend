
*************** DOCKER **************

1) test du container mssql isolé
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=motdepasse' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest

2) création de la bdd dans le docker 

-> entre dans le container
docker exec mssql_service "bash"

->copie du script dans le volume vc/data

-> execute le script de création de la base
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Motdepasseconforme64 -i /var/opt/mssql/data/script_create_database.txt

3) Si OK alors on peut quitter et lancer le docker compose (host / terminal 1)-

build image et test du container api
docker build ./api -t back_api:v1 --no-cache       
docker run --name api -it --rm back_api:v1 /bin/bash

docker-compose up -d
docker-compose down

4)Enter in the API container (host / terminal 2):
docker-compose exec api bash

Then, install packages / dependencies ("API" container / terminal 2):
npm install

Then, start the API server in `development` environment ("API" container / terminal 2):
npm run dev 

5) npm i sequelize-auto 
node_modules/.bin/sequelize-auto -h mssql_service -d BASKOI_LMS -u SA -x Motdepasseconforme64 -p 1433  --dialect mssql -o ./models -t Users

**************** GIT **************

git init

git add .

git commit

git branch <nomdelabranche>

git remote add  <shortname> <url>

git push <remote> <branch>

download ----->    git pull <remote> <branch>

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