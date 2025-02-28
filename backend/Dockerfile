FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# Instalar dependencias
RUN npm install

COPY . .

# Exponer el puerto
EXPOSE 5000

CMD ["node", "server.js"]
