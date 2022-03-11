
# DOCKER

## 1 - Image MSSQL

Pull l'image officielle
docker pull mcr.microsoft.com/mssql/server:2019-latest

Run le container
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=motdepasse' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest

-> entre dans le container
docker exec mssql_service "bash"

-> dans le conatiner execute le script de création de la base si besoin
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Motdepasseconforme64 -i /var/opt/mssql/data/script_create_database.txt

## 2 - Image API nodejs

build image
docker build ./ -t back_api --no-cache

Test du container (attention le container ne contient pour le moment que les dépendances et pas le code source du projet)
docker run --rm --name back_api -it back_api /bin/bash

## 3 - Docker compose -d pour mode détaché et ne pas afficher les logs

docker-compose up -d
docker-compose down

docker-compose exec api_service bash

# TEST

-> run tout les test dans le dossier test
npm test

-> run un fichier test spécifique (nécessite chemin vers node module)
./node_modules/mocha/bin/mocha test/connexion
