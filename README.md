# Sextou

## Iniciar aplicação

Inicialize um base de dados no postgres que contenha o POSTGIS. Nesse caso
recomendamos o uso do docker. Exemplo:

```
docker run --name sextou_postgres -e POSTGRES_DB=sextou -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgis/postgis
```

Depois configure o arquivo ormconfig.json, com os dados da base de dados que
você acabou de criar.

Depois preencha o arquivo .env conforme desejar.

Por fim, instale as depênciais e inicie o servidor da aplicação.

```
yarn
yarn dev:server
```
