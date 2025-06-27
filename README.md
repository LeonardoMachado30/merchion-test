# Merchion Teste - Laravel - Vue

## Sumário

-   [Instalação e Configuração de Ambiente com Docker (RECOMENDADO)](#instalação-e-configuração-de-ambiente-com-docker-recomendado)
    -   [Pré-requisitos](#pré-requisitos)
    -   [Configurações recomendadas do Docker](#configurações-recomendadas-do-docker)
    -   [Clone o repositório](#clone-o-repositório)
    -   [Configure o arquivo .env](#configure-o-arquivo-env)
    -   [Suba os containers](#suba-os-containers)
    -   [Acesse a aplicação](#acesse-a-aplicação)
    -   [Rode as migrations](#rode-as-migrations)
-   [Instalação e Configuração de ambiente Manual (PHP, Composer, MySQL, NODE)](#instalação-e-configuração-manual-php-composer-mysql-node)
    -   [Pré-requisitos](#pré-requisitos-1)
    -   [Clone o repositório e instale as dependências](#clone-o-repositório-e-instale-as-dependências)
    -   [Configure o .env](#configure-o-env)
    -   [Crie o banco de dados no MySQL](#crie-o-banco-de-dados-no-mysql)
    -   [Rode as migrations](#rode-as-migrations-1)
    -   [Build do front-end](#build-do-front-end)
    -   [Inicie o servidor back-end](#inicie-o-servidor-back-end)
-   [Postman - Testando as Rotas da API](#postman---testando-as-rotas-da-api)
-   [Arquitetura e Padrões Utilizados](#arquitetura-e-padrões-utilizados)
-   [Front-end (Vue 3 + TypeScript + TailwindCSS)](#front-end-vue-3--typescript--tailwindcss)
    -   [Rodando o front-end localmente (recomendado)](#rodando-o-front-end-localmente-recomendado)
    -   [Build de produção (manual)](#build-de-produção-manual)
-   [Dicas e Possíveis Erros](#dicas-e-possíveis-erros)

Olá! Este é o projeto Merchion API, uma aplicação desenvolvida em Laravel para gerenciamento de usuários e autenticação, pronta para rodar tanto em ambiente Docker quanto manualmente. Aqui vou te guiar em primeira pessoa sobre como instalar, configurar, rodar e testar a aplicação, além de explicar um pouco sobre a arquitetura e te ajudar a resolver possíveis erros.

---

## Instalação e Configuração de Ambiente com Docker

1. **Pré-requisitos:**

    - Docker e Docker Compose instalados no seu sistema ([Download Docker Desktop](https://www.docker.com/products/docker-desktop/))
    - Windows: É recomendado instalar o [WSL 2](https://learn.microsoft.com/pt-br/windows/wsl/install) e configurar o Docker para usar o WSL 2 como backend.

2. **Configurações recomendadas do Docker:**

    - Certifique-se de que o Docker está rodando em modo Linux containers (não Windows containers).
    - Recomendo alocar pelo menos 2 CPUs e 4GB de RAM para o Docker Desktop (Configurações > Resources).
    - Se estiver no Windows, mantenha o WSL 2 atualizado e o Docker configurado para usar o WSL 2.

3. **Clone o repositório:**

    ```sh
    git clone https://github.com/LeonardoMachado30/merchion-test
    cd merchion-test
    ```

4. **Configure o arquivo `.env`:**

    - Copie o arquivo de exemplo:
        ```sh
        cp env.example .env
        ```
    - Ajuste as variáveis de banco de dados, se necessário. Para Docker, use:
        ```env
        DB_CONNECTION=mysql
        DB_HOST=db
        DB_PORT=3306
        DB_DATABASE=merchion_test_db
        DB_USERNAME=root
        DB_PASSWORD=Flavio@85209630
        ```

5. **Suba os containers:**

    ```sh
    docker-compose up --build -d
    ```

6. **Acesse a aplicação:**

    - API: [http://localhost:8080](http://localhost:8080)
    - Front-end (hot reload): [http://localhost:5173](http://localhost:5173)

7. **Rode as migrations (se necessário):**
    ```sh
    docker-compose exec app php artisan migrate --force
    ```

---

## Instalação e Configuração Manual (PHP, Composer, MySQL, NODE)

1. **Pré-requisitos:**

    - PHP >= 8.4 ([Download PHP](https://www.php.net/downloads.php))
    - Composer >= 2.8 ([Download Composer](https://getcomposer.org/download/))
    - MySQL >= 8.0 ([Download MySQL](https://dev.mysql.com/downloads/mysql/))
    - Node.js >= 20 ([Download Node.js](https://nodejs.org/en/download/))
    - npm >= 9 (vem junto com o Node.js)

2. **Clone o repositório e instale as dependências:**

    ```sh
    git clone <url-do-repositorio>
    cd merchion-test
    composer install
    npm install
    ```

3. **Configure o `.env`:**

    - Copie o arquivo de exemplo:
        ```sh
        cp env.example .env
        ```
    - Ajuste as variáveis de banco de dados conforme seu ambiente local:
        ```env
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=merchion_test_db
        DB_USERNAME=root
        DB_PASSWORD=sua_senha
        ```

4. **Crie o banco de dados no MySQL:**

    ```sql
    CREATE DATABASE merchion_test_db;
    ```

5. **Rode as migrations:**

    ```sh
    php artisan migrate --force
    ```

6. **Build do front-end:**

    ```sh
    npm run build
    ```

    - Se quiser rodar o front-end em modo desenvolvimento (hot reload):
        ```sh
        npm run dev
        ```
        Acesse via [http://localhost:5173](http://localhost:5173) (ou porta do Vite).

7. **Inicie o servidor back-end:**
    ```sh
    php artisan serve
    ```
    - Acesse: [http://localhost:8000](http://localhost:8000)

---

## Postman - Testando as Rotas da API

Aqui estão algumas rotas principais para testar no Postman:

-   **Cadastrar usuário:**

    -   Método: `POST`
    -   URL: `/api/usuarios`
    -   Body (JSON):
        ```json
        {
            "nome": "Seu Nome",
            "email": "seu@email.com",
            "senha": "sua_senha"
        }
        ```

-   **Login:**

    -   Método: `POST`
    -   URL: `/api/login`
    -   Body (JSON):
        ```json
        {
            "email": "seu@email.com",
            "senha": "sua_senha"
        }
        ```

-   **Listar usuários (autenticado):**
    -   Método: `GET`
    -   URL: `/api/usuarios`
    -   Header: `Authorization: Bearer <token>`

> Use sempre o endereço base conforme o ambiente: `http://localhost:8080` (Docker/Nginx) ou `http://localhost:8000` (manual).

---

## Arquitetura e Padrões Utilizados

-   **Framework:** Laravel 12
-   **Padrão MVC:** Separação clara entre Models, Views (API Resources) e Controllers.
-   **Services:** Lógica de negócio centralizada em `app/Services`.
-   **Requests:** Validação centralizada em `app/Http/Requests`.
-   **Resources:** Formatação de resposta em `app/Http/Resources`.
-   **Exceptions customizadas:** Para tratamento de erros de autenticação e cadastro.
-   **Autenticação:** JWT ou Sanctum (dependendo da configuração).
-   **Migrations e Seeders:** Para versionamento e popular o banco.

---

## Dicas e Possíveis Erros

-   **Docker não inicia ou containers não sobem:**

    -   Verifique se o Docker Desktop está rodando e atualizado.
    -   No Windows, certifique-se de que o WSL 2 está instalado e funcionando corretamente.
    -   Reinicie o Docker Desktop e/ou o computador se necessário.
    -   Veja os logs do Docker com `docker-compose logs` para detalhes.

-   **Porta 3306 já está em uso:**  
    Altere a porta externa do MySQL no `docker-compose.yml` para `3307:3306` e ajuste o `.env` se for acessar localmente.

-   **502 Bad Gateway (nginx):**  
    O PHP-FPM pode não ter iniciado ainda. Aguarde alguns segundos e tente novamente. Verifique os logs com `docker-compose logs app`.

-   **Erro de conexão com o banco (`getaddrinfo for db failed`):**  
    O banco pode não estar pronto. Rode as migrations manualmente após subir os containers.

-   **Extensões PHP ausentes:**  
    Verifique se todas as extensões PHP necessárias estão instaladas (pdo_mysql, mbstring, etc).

-   **Permissões de pasta storage/bootstrap/cache:**  
    Dê permissão de escrita para o usuário do servidor web.

-   **Erro de chave de aplicação:**  
    Rode `php artisan key:generate` após criar o `.env`.

-   **Composer não encontra o PHP:**  
    Certifique-se de que o PHP está no PATH do sistema.

-   **Problemas no build do front-end:**  
    Certifique-se de que o arquivo `postcss.config.js` está presente e que as dependências do npm estão instaladas corretamente.

---

## Front-end (Vue 3 + TypeScript + TailwindCSS)

### Rodando o front-end localmente (recomendado)

-   O front-end deve ser rodado na sua máquina local, fora do Docker.
-   Para iniciar o modo desenvolvimento com hot reload:
    ```sh
    npm install
    npm run dev
    ```
-   O front-end ficará disponível em [http://localhost:5173](http://localhost:5173) e refletirá qualquer alteração feita nos arquivos em tempo real.
-   O back-end (API) continua acessível normalmente em [http://localhost:8080](http://localhost:8080).

### Build de produção (manual)

Se quiser gerar o build de produção do front-end (arquivos finais em `public/`):

```sh
npm run build
```

---

Se tiver qualquer dúvida ou problema, pode me chamar! Esse projeto foi feito para ser simples de rodar e fácil de entender, tanto para quem usa Docker quanto para quem prefere instalar tudo manualmente.
