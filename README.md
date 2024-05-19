# RDR

 Dashboard administrativo simples onde os usuários possam gerenciar uma lista de funcionários, incluindo a criação, leitura, atualização e exclusão de registros de funcionários.

## Pré-requisitos

Para rodar este projeto, você precisa ter as seguintes dependências instaladas:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como rodar a aplicação

1. Clone este repositório para sua máquina local:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-projeto.git
    cd next-moongose-docker
    ```

2. Certifique-se de que o Docker e o Docker Compose estão instalados e rodando em seu sistema.

3. Para iniciar a aplicação, execute o seguinte comando:

    ```bash
    docker compose up -d
    ```

    Este comando irá iniciar todos os serviços definidos no arquivo `docker-compose.yml` em segundo plano (opção `-d`).

4. Acesse a aplicação através do endereço fornecido  `http://localhost:3000`.

## Outros comandos úteis

- Para parar os containers:

    ```bash
    docker compose down
    ```

- Para visualizar os logs dos containers:

    ```bash
    docker compose logs
    ```

- Para reiniciar os containers:

    ```bash
    docker compose restart
    ```