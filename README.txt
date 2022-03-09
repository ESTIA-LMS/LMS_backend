
*************** DOCKER **************

1) Image MSSQL

Pull l'image officielle
docker pull mcr.microsoft.com/mssql/server:2019-latest

Run le container
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=motdepasse' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest

-> entre dans le container
docker exec mssql_service "bash"

->copie du script dans le volume vc/data

-> execute le script de création de la base
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Motdepasseconforme64 -i /var/opt/mssql/data/script_create_database.txt



2) Image API nodejs

build image et test du container api
docker build ./ -t back_api --no-cache       



3) Docker compose -d pout mode détaché et ne pas afficher les logs

docker-compose up -d
docker-compose down


**************** GIT **************

git init

git add .

git commit

git branch <nomdelabranche>

git remote add  <shortname> <url>

git push <remote> <branch>

download ----->    git pull <remote> <branch>

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