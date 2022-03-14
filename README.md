
# DOCKER

docker network create lms_network

## 1 - Image MSSQL

-> Pull de l'image officielle microsft sql server
docker pull mcr.microsoft.com/mssql/server:2019-latest

-> Lancement du container
sh cicd/run_mssql_container.sh

-> Entre dans le container
docker exec -it mssql bash

-> Executer un script dans le container (placer le script dans le dossier volume data au préalable)
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Motdepasseconforme64 -i /var/opt/mssql/data/mon_script.sql

-> Executer une requete dans le terminal (USE BASKOI_LMS GO pour changer de base)
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Motdepasseconforme64

## 2 - Image API nodejs

-> Build image à partir du Dockerfile
docker build . -t back_api --no-cache

-> Test du container (attention le container ne contient pour le moment que les dépendances et pas le code source du projet)
sh cicd/run_node_container.sh

## 3 - Docker compose -d pour mode détaché et ne pas afficher les logs

docker-compose up -d
docker-compose down

docker-compose exec api_service bash

# TEST

-> run tout les test dans le dossier test
npm test

-> run un fichier test spécifique (nécessite chemin vers node module)
./node_modules/mocha/bin/mocha test/connexion
