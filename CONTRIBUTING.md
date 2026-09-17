# Guia de Desenvolvimento - MANEJA Lite API

Instruções básicas para o desenvolvimento da API do **MANEJA Lite**.

Cada um da equipe vai ficar responsável pelo desenvolvimento de um ou mais módulos da aplicação. Então vamos tentar manter a mesma estrutura para deixar o projeto bonito e fácil de revisar.

> Antes de adicionar algo que modifique a arquitetura do projeto, converse com o Felipe e alinhe com a equipe :)

---

## Desenvolvimento de um módulo

Para um módulo comum da aplicação, o desenvolvimento deve seguir, preferencialmente, essa ordem:

1. Schema
2. Migration
3. Repository
4. Controller
5. Routes
6. Swagger
7. Testes manuais

---

### 1. Schema

Defina as entidades do módulo em: `prisma/schema.prisma`

Ex:

```prisma
model Terreno {
  id        String   @id @default(uuid())
  nome      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

### 2. Migration

Após alterar o `schema.prisma`, crie a migration:

```bash
npx prisma migrate dev --name create-algo
```

As migrations ficam em: `prisma/migrations/`

---

### 3. Repository

A camada de acesso aos dados: `src/repositories/`

O repository não vai definir a estrutura da tabela, no nosso projeto essa responsabilidade pertence ao `schema.prisma`.

Ex:

```js
// src/repositories/terreno.repository.js

import prisma from "../config/database.js";

const terrenoRepository = {
  findAll() {
    return prisma.terreno.findMany();
  },
};

export default terrenoRepository;
```

O acesso ao Prisma deve ficar concentrado nessa camada, evite usar esse tipo de coisa diretamente nos controllers: `prisma.terreno.findMany()`.

---

### 4. Controller

Os controllers ficam em: `src/controllers/`

Ex:

```js
// src/controllers/terreno.controller.js

import terrenoRepository from "../repositories/terreno.repository.js";

export async function index(req, res) {
  const terrenos = await terrenoRepository.findAll();

  return res.status(200).json(terrenos);
}
```

### 5. Routes

As rotas ficam aqui: `src/routes/`

O padrão REST deve ser utilizado quando aplicável:

```text
GET    /terrenos
GET    /terrenos/:id
POST   /terrenos
PUT    /terrenos/:id
DELETE /terrenos/:id
```

Depois de criar as rotas do módulo, registre em:

```text
src/routes/index.js
```

Ex:

```js
router.use("/terrenos", terrenoRoutes);
```

---

### 6. Swagger

Documente cada endpoint criado, uma funcionalidade não deve ser considerada concluída enquanto seus endpoints não estiverem documentados corretamente.

A documentação deve conter, quando necessário:

- Descrição
- Parâmetros
- Body
- Exemplos
- Códigos HTTP
- Respostas possíveis.

---

### Respostas HTTP

Utilizar códigos HTTP coerentes com o resultado da operação.

- 200: Requisição realizada com sucesso
- 201: Recurso criado
- 204: Operação realizada sem conteúdo de resposta
- 400: Dados da requisição inválidos
- 404: Recurso não encontrado
- 409: Conflito
- 500: Erro interno do servidor

---

## Fluxo Git

O projeto utilizará duas branches principais: `main` e `develop`.

O fluxo deve seguir: `feat/* -> develop -> main `

Antes de iniciar uma funcionalidade:

```bash
git checkout develop
git pull origin develop
```

Depois, crie uma branch específica para a funcionalidade:

```bash
git checkout -b feat/terrenos
```

Ao finalizar a funcionalidade, envie a branch para o repositório:

```bash
git push origin feat/terrenos
```

Depois sobe um Pull Request: `feat/terrenos -> develop`

A `main` só recebe alterações vindas da `develop` quando existir uma versão estável do projeto.

---

### Commits

Tipos principais:

- feat: nova funcionalidade
- fix: correção
- refactor: alteração interna sem mudança de comportamento
- docs: documentação
- chore: configuração ou manutenção

Uma sequência esperada para uma branch `feat/terrenos`:

```text
feat: adiciona schema e migration de terrenos
feat: adiciona repository de terrenos
feat: implementa controller de terrenos
feat: adiciona rotas de terrenos
docs: documenta endpoints de terrenos
```

---
