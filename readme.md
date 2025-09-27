# 📚 API de Gestão de Salas – Desafio Clicksoft

API desenvolvida em **Node.js com AdonisJS** para gerenciar a alocação de salas em escolas e universidades.  

Este projeto foi feito como parte do **desafio backend (Clicksoft)** e implementa cadastros de **alunos, professores e salas**, além do gerenciamento de alocação de alunos em salas.

---

## ⚙️ Tecnologias utilizadas
- [Node.js](https://nodejs.org/)
- [AdonisJS](https://adonisjs.com)
- [PostgreSQL]
- [Insomnia ou Postman](https://insomnia.rest/) (para testar as rotas)

---

## 📋 Funcionalidades

### 👩‍🎓 Aluno
- Cadastro de aluno  
- Edição de dados  
- Exclusão de conta  
- Consulta de dados  
- Consulta de todas as salas em que deve comparecer  

### 👨‍🏫 Professor
- Cadastro de professor  
- Edição de dados  
- Exclusão de conta  
- Consulta de dados  
- Cadastro de salas  
- Edição de salas  
- Exclusão de salas  
- Consulta de salas  
- Alocação e remoção de alunos em salas  
- Consulta de todos os alunos de uma sala  

---

## 📜 Regras de Negócio
- O mesmo aluno não pode ser alocado duas vezes na mesma sala.  
- A capacidade máxima da sala não pode ser ultrapassada.  
- Um professor só pode alocar alunos em salas criadas por ele.  
- A consulta de salas por aluno retorna: nome do aluno, nome do professor e número da sala.  

---

## 🚀 Como rodar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/GiovanniOrnelas/desafio-clicksoft
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd desafio-clicksoft
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure o banco de dados no arquivo `.env` ou `config/database.ts`.

5. Rode as migrations:
   ```bash
   node ace migration:run
   ```

6. Inicie o servidor:
   ```bash
   node ace serve --watch
   ```

A API estará disponível em:  
👉 `http://127.0.0.1:3333`

---