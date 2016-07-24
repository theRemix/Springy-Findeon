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

_note: it may take a minute for the server to initialize. just wait, or check `docker logs es` and look for "bound address: 9200 started"_

## Seed the index

```
ES_PORT=9201 npm run seed
```

_note: after seeding the index, it may take a minute for the index to refresh, tests may fail_

`docker logs es` _may show this while refreshing_

```
[pokedex] creating index
...
[pokedex] create_mapping
```

_after some time, tests will pass_

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
