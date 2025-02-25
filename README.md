# Carros Macqueen

Este é o projeto Carros Macqueen, uma simulação de uma loja de carros, onde é possível visualizar, comprar e adicionar carros ao carrinho. A aplicação é composta por um frontend em React e um backend em Node.js com Express. A aplicação também inclui funcionalidades de login e cadastro de usuários.

## Acesso da aplicação

O frontend está hospedado no Vercel. Você pode acessar a aplicação em produção através do seguinte link:

https://carrosmacqueen.vercel.app/

## Funcionalidades

- Visualização de carros
- Adição de carros ao carrinho
- Compra de carros
- Cadastro e login de usuários
- Redefinição de senha

## Tecnologias Utilizadas

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB
- **Deploy**: Vercel (Frontend), Render (Backend)

## Estrutura do Projeto

### Frontend

- **src/components**: Componentes React utilizados na aplicação
- **src/routes**: Definição das rotas da aplicação
- **src/App.jsx**: Componente principal da aplicação

### Backend

- **config/db.js**: Configuração da conexão com o banco de dados MongoDB
- **controller**: Controladores para as rotas da API
- **models**: Modelos Mongoose para o MongoDB
- **routes**: Definição das rotas da API
- **server.js**: Servidor Express principal

---

## Instalação

### Pré-requisitos

- Node.js
- MongoDB

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/LucasTNM/Carros_Macqueen.git
   ```


2. **Configuração do Backend**

```bash
cd Backend_CarrosMacqueen
npm install
```

**Configure as variáveis de ambiente presentes no arquivo .env**

PORT=5000 
MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster_here>
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email
EMAIL_PASS=your_email_pass
JWT_SECRET=your_secret_key

**Para iniciar o servidor backend, execute:**

```bash
node server.js
```

3. **Configuração do Frontend**

**Em outra aba do terminal, vá para a pasta do frontend:**

```bash
cd ../Frontend_CarrosMacqueen
npm install
```

**Se o Vite estiver instalado, inicie o frontend com:**

```bash
npm run dev
```

**Uso**
Após rodar o backend e o frontend, acesse a aplicação nas seguintes URLs:

Backend (caso esteja rodando localmente, a porta pode variar):

http://localhost:5000/

Frontend:

http://localhost:5173/
