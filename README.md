# MANEJA Lite API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%23003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Requisitos

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

### Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DATABASE_URL="file:../database/database.sqlite"
```

### Prisma

Gere o Prisma Client:

```bash
npx prisma generate
```

Aplique as migrations do banco de dados:

```bash
npx prisma migrate dev
```

Para visualizar os dados do banco:

```bash
npx prisma studio
```

### Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

### Swagger

A documentação da API pode ser acessada em:

```text
http://localhost:3000/api-docs
```
