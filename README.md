# Magalu Cloud - API Project

Este repositório contém o projeto referente ao desafio Magalu Cloud, ele inclui um banco de dados PostgreSQL, uma API desenvolvida em JavaScript/TypeScript e um Worker escrito em Python.
Este README fornece uma visão geral da estrutura do projeto e instruções para execução.

## Estrutura do Projeto

O projeto é composto pelos seguintes serviços:

- **database-svc**: Serviço de banco de dados utilizando PostgreSQL.
- **api-svc**: Serviço da API responsável pela implementação do Ingestor.
- **worker-svc**: Serviço worker que interage com a API.

## Pré-requisitos

- Docker
- Docker Compose

## Configuração dos Serviços

### 1. Database Service

O serviço de banco de dados é configurado com as seguintes variáveis de ambiente:

```yaml
environment:
  POSTGRES_DATABASES: postgres
  POSTGRES_DB: postgres
  POSTGRES_PASSWORD: postgres
  POSTGRES_USER: postgres
```

O banco de dados usa o modo de rede `host` e reinicia automaticamente, exceto se parado manualmente.

### 2. API Service

O serviço da API é basicamente configurado com as seguintes variáveis de ambiente:

```yaml
environment:
  DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/magalu_cloud_ingestor?schema=public
  PORT: 4000
```

Este serviço depende do serviço de banco de dados e também usa o modo de rede `host` para que possamos acessar e debugar o database.

### 3. Worker Service

O serviço worker é configurado com as seguintes variáveis de ambiente:

```yaml
environment:
  HOST: http://localhost:4000
  MAX_TENANT: "2"
  MAX_SKU: "3"
  MIN_AMOUNT: "1"
  MAX_AMOUNT: "999"
  SLEEP: "0.2"
```

Este serviço depende do serviço da API e também utiliza o modo de rede `host` para que possa interagir com a API.

## Rede

A configuração de rede é definida como `magalu-cloud` para permitir a comunicação entre os serviços.

## Execução

Para executar os serviços, utilize o comando:

```sh
docker-compose up --build
```

Isso irá construir e iniciar todos os serviços definidos no arquivo `docker-compose.yml`.

## Licença

Este projeto está licenciado sob a [MIT License](../LICENSE).
