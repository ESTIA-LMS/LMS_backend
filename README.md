
# DOCKER

## 1 - Création d'un network pour nos deux containers

docker network create lms_network

## 2 - Image MSSQL

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

## 3 - Image API nodejs

-> Build image à partir du Dockerfile
docker build . -t back_api --no-cache

-> Test du container (attention le container ne contient pour le moment que les dépendances et pas le code source du projet)
sh cicd/bin/run_node_container.sh

## 4 - En développement on peut utiliser docker compose

-> Lancer le docker
docker-compose up

-> Supprimer les containers
docker-compose down

-> Entrer dans le container de l'API nodejs
docker-compose exec api bash

## 5 - Lancer les tests dans le container de l'API nodejs

-> run tout les test dans le dossier test
npm test

-> run un fichier test spécifique (nécessite chemin vers node module)
./node_modules/mocha/bin/mocha test/connexion
