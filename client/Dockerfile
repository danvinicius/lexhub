# Etapa 1: Construção
FROM node:18 AS builder

# Defina o diretório de trabalho
WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", "vite.config.ts", "tsconfig.app.json", "tsconfig.node.json", "src", ".env", "./"]


# Instale as dependências e construa o projeto
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servir com Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos construídos e o servidor
COPY --from=builder /app/dist ./dist
COPY server.js ./server.js

# Instale apenas o express no ambiente final
RUN npm install express

# Exponha a porta 80
EXPOSE 80

# Inicie o servidor na porta 80
CMD ["node", "server.js"]