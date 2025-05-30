# PR

## 1.1

### Normalização de dados
Comecei por normalizar os dados usando o `script.py`, que neste caso converteu o dataset.json de um objeto gigante para um array de objectos e remover acentos e ç's.


### Importação do dataset
Importou-se o `dataset.json` para um container que existe, no meu caso `mongoEW`, usando os seguintes comandos:

```
docker cp ./dataset.json mongoEW:/dataset.json
```

Depois criou-se a database `eurovisao` e a collection `edicoes` e copiou-se para lá o dataset:

```
docker exec -it mongoEW mongoimport -d eurovisao -c edicoes --file /dataset.json --jsonArray --drop
```

## 1.2
### Queries
Neste exercicio criou-se as queries que se encontram em `queries.txt` na pasta `ex1`.

## 1.3
Realizado na pasta `ex1`.


## 2
Realizado na pasta `ex2`.