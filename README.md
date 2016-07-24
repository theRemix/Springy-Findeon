# Springy-Findeon

Instructor reference

## ElasticSearch API

https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html

## ElasticSearch Server

run a container

_using port 9201 so it doesn't conflict with any already ES instances running on your host_

```
docker run --name es -p 9201:9200 -d elasticsearch
```

## Seed the index

```
ES_PORT=9201 npm run seed
```

## Run the project

```
ES_PORT=9201 npm start
```

## Run tests

```
ES_PORT=9201 npm test
```

## BDD

```
ES_PORT=9201 npm run test-watch
```
