# Base image
FROM node:18-alpine

# Diretório de trabalho na imagem
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar o restante do código
COPY . .

# Compilar o TypeScript
RUN npm run build

# Copiar os templates para a pasta dist
RUN mkdir -p dist/src/utils/email/templates && cp -r src/utils/email/templates/*.hbs dist/src/utils/email/templates/

# Porta em que a aplicação escutará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "-r", "tsconfig-paths/register", "dist/src/index.js"]
