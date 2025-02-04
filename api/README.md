# API NestJS - Documentação

Bem-vindo à documentação da API desenvolvida com NestJS!

Esta API utiliza o Prisma como ORM e se conecta a um banco de dados PostgreSQL.

A seguir, você encontrará informações sobre o modelo de dados e como interagir com a API.

## Estrutura do Projeto

O projeto é estruturado para facilitar a manutenção e escalabilidade. Os principais componentes incluem:

- **Models**: Definições de entidades e relacionamento entre elas.
- **Controllers**: Manipulação das requisições e respostas.
- **Services**: Lógica de negócios e interações com o banco de dados.
- **Modules**: Agrupamento de funcionalidades relacionadas.


## Modelo Prisma e Relações entre Dados

A seguir podemos ver o modelo de dados definido com Prisma, detalhando as entidades `Tenant`, `Product` e `Pulse`, bem como suas relações e características.

## Estrutura do Modelo

### 1. Tenant

O modelo `Tenant` representa uma entidade que pode ser considerada como "dono" ou um cliente que vai pagar a o consumo.

Os atributos do modelo são:

- **id**: Identificador único do `Tenant`, gerado automaticamente como um UUID.
- **name**: Nome do `Tenant`, que deve ser único.
- **createdAt**: Data e hora em que o `Tenant` foi criado.
- **updatedAt**: Data e hora da última atualização do `Tenant`.
- **pulses**: Relação com o modelo `Pulse`, representando todos os pulsos associados a este `Tenant`.

#### Restrições e Índices:
- O campo `name` é único.
- Um índice é criado no campo `name` para melhorar a performance em buscas.

### 2. Product

O modelo `Product` representa um produto que pode ser associado a um ou mais `Tenant`. Os atributos do modelo são:

- **id**: Identificador único do `Product`, gerado automaticamente como um UUID.
- **sku**: Código de identificação do produto, que deve ser único.
- **description**: Descrição opcional do produto.
- **createdAt**: Data e hora em que o `Product` foi criado.
- **updatedAt**: Data e hora da última atualização do `Product`.
- **pulses**: Relação com o modelo `Pulse`, representando todos os pulsos associados a este produto.

#### Restrições e Índices:
- O campo `sku` é único.
- Um índice é criado no campo `sku` para melhorar a performance em buscas.

### 3. Pulse

O modelo `Pulse` representa a utilização de um produto por um `Tenant` em um determinado momento.

Os atributos do modelo são:

- **id**: Identificador único do `Pulse`, gerado automaticamente como um UUID.
- **tenantId**: Referência ao `Tenant` associado a este `Pulse`.
- **productId**: Referência ao `Product` utilizado.
- **usedAmount**: Quantidade de recurso utilizada do produto.
- **useUnity**: Unidade de medida da quantidade utilizada, podendo ser apenas: KB, MB, GB, TB, KBps, MBps, GBps, TBps.
- **createdAt**: Data e hora em que o `Pulse` foi criado.
- **updatedAt**: Data e hora da última atualização do `Pulse`.

#### Relações:
- Cada `Pulse` está associado a um `Tenant` através do campo `tenantId`.
- Cada `Pulse` também está associado a um `Product` através do campo `productId`.

#### Restrições e Índices:
- A combinação de `tenantId` e `productId` é única, garantindo que um `Tenant` não possa registrar múltiplos pulsos para o mesmo `Product`.
- Um índice é criado na combinação de `tenantId` e `productId` para melhorar a performance em buscas.

## Relações entre os Modelos

A relação entre os modelos é estabelecida da seguinte forma:

- Um `Tenant` pode ter múltiplos `Pulse` (relação um-para-muitos).
- Um `Product` também pode ser utilizado em múltiplos `Pulse` (relação um-para-muitos).
- Cada `Pulse` refere-se a um único `Tenant` e um único `Product` (relação muitos-para-um).


## Considerações sobre os dados

Este modelo de dados foi projetado para gerenciar a utilização de produtos por diferentes `Tenants`, facilitando a análise e o gerenciamento de pulsos. A utilização de UUIDs garante a unicidade e a segurança dos identificadores, enquanto as restrições e índices otimizam as operações de busca e integridade dos dados.

Para mais informações sobre como utilizar o Prisma com esse modelo, consulte a [documentação oficial do Prisma](https://www.prisma.io/docs/).


## Execução e Testes

Para iniciar a API sem a utilização do docker-compose e Dockerfile, utilize os seguintes comandos:

```bash
# Instale as dependências
yarn install

# Inicie a aplicação em modo desenvolvimento
yarn start:dev
```

A API estará disponível em `http://localhost:4000`.


## Endpoints

Após a execução da API, consulte a documentação Swagger da API, estará disponível em `http://localhost:4000/api/doc`.
