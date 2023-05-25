# iLearn-API

## Descrição

iLearn é uma API desenvolvida em Typescript como projeto para a disciplina Engenharia de Software 01/2023 com objetivo de aplicar conceitos do Clean Architecture, DDD e SOLID.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em seu ambiente de desenvolvimento:

- Node.js (versão ^16.0.0)
- npm (versão ^8.19.2)
- Postgre OU SQLServer

## Instalação

Siga as etapas abaixo para configurar e executar a API em seu ambiente local:

1. Clone o repositório:
```bash
git clone https://github.com/viniferr33/iLearn-API.git
```
2. Navegue até o diretório do projeto:
```bash
cd iLearn-API
```

3. Instale as dependências:
```bash
npm install
```

## Configuração

Antes de executar a API, é necessário configurar algumas variáveis de ambiente. Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:

```
DB_SERVER="sqlserver_url.database.windows.net"
DB_DATABASE=database_name
DB_PASSWORD=database_password
DB_USER=database_user

NODE_ENV=development

SECRET_KEY=mySecretKeyHash
```

## Uso

A API fornece os seguintes scripts para facilitar o desenvolvimento:

`npm start`: Inicia a API em modo de produção.

`npm run dev`: Inicia a API em modo de desenvolvimento, com suporte a reinicialização automática ao detectar alterações nos arquivos.

`npm test`: Executa os testes automatizados da API.

## Estrutura do projeto
```
.
├── app/http/                  # Código fonte da camada de Aplicação
│   ├── adapters/              # Adaptadores Core => HTTP
│   ├── handlers/              # Handlers (middlewares do servidor)
│   ├── swagger/               # Documentação das extremidades 
│   ├── config.ts              # Arquivo de configuração da aplicação
│   └── index.ts               # Ponto de entrada da aplicação
└── src/                       # Código-fonte da API
    ├── core/                  # Regras de Negocio e Dominio
    ├── dtos/                  # Data transfer objects
    ├── errors/                # Custom Errors e Exceptions
    ├── gateways/              # Repositórios e camada de acesso de dados
    └── infra/                 # Interfaces de Banco de Dados 
```