# README.md

## Descrição do Projeto

Este projeto é um script Python que simula o envio de dados para uma API, criando ou atualizando "pulses" (ou pulsos) de uso de recursos. O código utiliza a biblioteca `requests` para fazer requisições HTTP POST e gera dados aleatórios para simular diferentes "tenants" (ou inquilinos) e unidades de uso.

## Funcionalidades

- Geração aleatória de `tenants` (inquilinos) e `skus` (unidades de manutenção).
- Envio de informações sobre o uso de recursos para uma API especificada.
- Tratamento de diferentes códigos de resposta HTTP da API.
- Possibilidade de configurar parâmetros através de variáveis de ambiente.

## Estrutura do Código

### Função `send`

A função `send` é responsável por enviar uma requisição POST para a API com os seguintes parâmetros:

- `url`: URL da API onde o pulse deve ser enviado.
- `sku`: SKU do produto.
- `tenant`: Nome do inquilino.
- `used_amount`: Quantidade de recurso utilizada.
- `unit`: Unidade de medida (KB, MB, GB, TB).
- `timeout`: Tempo limite para a requisição (padrão de 5000 milissegundos).

A função trata diferentes respostas da API e captura exceções de requisições.

### Função `main`

A função `main` é o ponto de entrada do script. Suas principais responsabilidades incluem:

- Configuração inicial de parâmetros através de variáveis de ambiente.
- Geração de listas de `tenants` e `skus`.
- Loop contínuo que seleciona aleatoriamente um `tenant`, um `sku`, uma `unit` e uma quantidade de uso aleatória, e chama a função `send` para enviar os dados à API.

### Parâmetros Configuráveis

Os seguintes parâmetros podem ser configurados através de variáveis de ambiente:

- `HOST`: URL base da API (padrão: `http://localhost:4000`).
- `MAX_TENANT`: Número máximo de inquilinos a serem gerados (padrão: `15000`).
- `MAX_SKU`: Número máximo de SKUs a serem gerados (padrão: `300`).
- `MIN_AMOUNT`: Quantidade mínima de recurso utilizada (padrão: `100`).
- `MAX_AMOUNT`: Quantidade máxima de recurso utilizada (padrão: `9999`).
- `SLEEP`: Tempo de espera entre os envios (padrão: `0.5` segundos).

## Requisitos

Para executar este script, você precisará das seguintes dependências:

- Python 3.x
- Biblioteca `requests`: pode ser instalada via pip:

```bash
pip install requests
```

## Execução (manual)

Caso queira executar manualmente o script, basta rodá-lo no terminal:

```bash
python main.py
# ou
python3 main.py
```

Certifique-se de que as variáveis de ambiente estão configuradas corretamente se você deseja utilizar configurações diferentes das padrão.

## Tratamento de Erros

A função `send` possui tratamento de erros para diferentes exceções que podem ocorrer durante a requisição HTTP, incluindo:

- Erros de conexão
- Timeouts
- Erros HTTP

## Licença

Este projeto está licenciado sob a [MIT License](../LICENSE).
