# Merchion Test - Sistema de Autenticação

Sistema completo de autenticação com Laravel (backend) e Vue 3 (frontend), incluindo cadastro, login e logout de usuários.

## 📑 Sumário

-   [🚀 Tecnologias](#-tecnologias)
    -   [Backend](#backend)
    -   [Frontend](#frontend)
-   [📋 Pré-requisitos](#-pré-requisitos)
-   [🛠️ Instalação e Configuração](#️-instalação-e-configuração)
    -   [1. Clone e Configure o Ambiente](#1-clone-e-configure-o-ambiente)
    -   [2. Backend (Escolha uma das opções)](#2-backend-escolha-uma-das-opções)
    -   [3. Frontend (Local)](#3-frontend-local)
-   [🔐 Funcionalidades Implementadas](#-funcionalidades-implementadas)
    -   [Autenticação](#autenticação)
    -   [Rotas](#rotas)
    -   [Comportamento das Rotas](#comportamento-das-rotas)
-   [📡 API Endpoints](#-api-endpoints)
    -   [Exemplo de uso (Postman)](#exemplo-de-uso-postman)
-   [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
-   [🔧 Desenvolvimento](#-desenvolvimento)
    -   [Backend](#backend-1)
    -   [Frontend](#frontend-1)
-   [🐛 Solução de Problemas](#-solução-de-problemas)
    -   [Docker](#docker)
    -   [Frontend](#frontend-2)
-   [📝 Notas](#-notas)

## 🚀 Tecnologias

### Backend

-   **Laravel 12** - Framework PHP
-   **MySQL** - Banco de dados
-   **Laravel Sanctum** - Autenticação via tokens
-   **Docker** - Containerização

### Frontend

-   **Vue 3** - Framework JavaScript
-   **TypeScript** - Tipagem estática
-   **TailwindCSS** - Estilização
-   **Vite** - Build tool
-   **Vue Router** - Roteamento

## 📋 Pré-requisitos

-   Docker e Docker Compose
-   Node.js 20+ e npm
-   Git

## 🛠️ Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto.

### 1. Clone e Configure o Ambiente

```bash
# Clone o repositório
git clone https://github.com/LeonardoMachado30/merchion-test.git
cd merchion-test

# Copie o arquivo de ambiente para o backend
cp env.example .env
```

> **Importante:** O arquivo `.env` contém as variáveis de ambiente para o **backend**. Você precisará editá-lo dependendo da sua escolha de configuração (Local ou Docker).

### 2. Backend (Escolha uma das opções)

#### Opção A: Rodar com Docker (Recomendado)

Esta é a forma mais simples de subir o ambiente, pois o Docker gerencia o PHP, o servidor web e o banco de dados.

```bash
# 1. Suba os containers
docker-compose up --build -d

# 2. Instale as dependências do PHP com Composer
docker-compose exec app composer install

# 3. Execute as migrations para criar as tabelas do banco
docker-compose exec app php artisan migrate --force
```

**Acesso ao Backend:** A API estará disponível em `http://localhost:8080`.

#### Opção B: Rodar Localmente (Sem Docker)

Use esta opção se você preferir não usar Docker e já tiver um ambiente PHP e MySQL configurado na sua máquina.

**Pré-requisitos:** PHP 8.2+, Composer, MySQL (ou outro SGBD compatível).

```bash
# 1. Instale as dependências do PHP
composer install

# 2. Configure o banco de dados no arquivo .env
#    Edite as seguintes variáveis com os dados do seu banco local:
#    DB_CONNECTION=mysql
#    DB_HOST=127.0.0.1
#    DB_PORT=3306
#    DB_DATABASE=laravel
#    DB_USERNAME=root
#    DB_PASSWORD=

# 3. Gere a chave da aplicação Laravel
php artisan key:generate

# 4. Execute as migrations para criar as tabelas
php artisan migrate

# 5. Inicie o servidor de desenvolvimento do Laravel
php artisan serve
```

**Acesso ao Backend:** A API estará disponível em `http://localhost:8000`.

### 3. Frontend (Local)

Depois de configurar o backend (com Docker ou localmente), configure e rode o frontend.

```bash
# 1. Instale as dependências (usando npm ou yarn)
npm install
# ou
yarn install

# 2. Execute em modo de desenvolvimento (com hot reload)
npm run dev
# ou
yarn dev
```

**Acesso ao Frontend:** http://localhost:5173

> **Nota:** O frontend tentará se conectar à API em `http://localhost:8080` (configuração padrão para Docker). Se você estiver rodando o backend localmente na porta 8000, precisará ajustar a URL da API no código do frontend, que fica no arquivo `resources/api/index.ts`.

## 🔐 Funcionalidades Implementadas

### Autenticação

-   ✅ **Cadastro de usuários** - `/cadastrar`
-   ✅ **Login** - `/login`
-   ✅ **Logout** - Botão na home
-   ✅ **Proteção de rotas** - Guard de navegação

### Rotas

-   **`/`** - Home (requer autenticação)
-   **`/login`** - Página de login (apenas não autenticados)
-   **`/cadastrar`** - Página de cadastro (apenas não autenticados)

### Comportamento das Rotas

-   **Usuários logados**: Podem acessar apenas `/` (home)
-   **Usuários não logados**: Podem acessar `/login` e `/cadastrar`

## 📡 API Endpoints

| Método | Endpoint      | Descrição         | Autenticação |
| ------ | ------------- | ----------------- | ------------ |
| `POST` | `/api/create` | Cadastrar usuário | ❌           |
| `POST` | `/api/login`  | Fazer login       | ❌           |
| `POST` | `/api/logout` | Fazer logout      | ✅           |

### Exemplo de uso (Postman)

**Cadastro:**

```json
POST http://localhost:8080/api/create
{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "123456"
}
```

**Login:**

```json
POST http://localhost:8080/api/login
{
    "email": "joao@email.com",
    "senha": "123456"
}
```

## 🏗️ Estrutura do Projeto

```
merchion-test/
├── app/                    # Backend Laravel
│   ├── Http/Controllers/   # Controllers da API
│   ├── Models/            # Modelos Eloquent
│   ├── Services/          # Lógica de negócio
│   └── Exceptions/        # Exceções customizadas
├── resources/             # Frontend Vue
│   ├── views/            # Páginas (Login, Register, Home)
│   ├── components/       # Componentes reutilizáveis
│   ├── api/              # Serviços de API
│   └── models/           # Interfaces TypeScript
├── routes/api.php        # Rotas da API
└── docker-compose.yml    # Configuração Docker
```

## 🔧 Desenvolvimento

### Backend

```bash
# Acessar container
docker-compose exec app bash

# Ver logs
docker-compose logs app

# Parar containers
docker-compose down
```

### Frontend

```bash
# Modo desenvolvimento (hot reload)
npm run dev

# Build de produção
npm run build

# Verificar tipos TypeScript
npm run type-check
```

## 🐛 Solução de Problemas

### Docker

-   **Containers não iniciam**: Verifique se Docker Desktop está rodando
-   **Porta 8080 ocupada**: Altere no `docker-compose.yml`
-   **Erro de banco**: Execute `docker-compose exec app php artisan migrate --force`

### Frontend

-   **Erro de tipos**: Execute `npm install` e verifique `tsconfig.json`
-   **Hot reload não funciona**: Verifique se porta 5173 está livre
-   **Erro de API**: Confirme se backend está rodando em `localhost:8080`

## 📝 Notas

-   O frontend roda localmente para melhor experiência de desenvolvimento
-   O backend usa Docker para facilitar a configuração
-   Todas as rotas da API retornam JSON padronizado
-   Autenticação via tokens JWT (Laravel Sanctum)
-   Interface responsiva com TailwindCSS
