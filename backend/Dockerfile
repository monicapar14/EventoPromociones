# Usa Node.js versión 22 como base
# Es como decir "necesito una computadora con Node.js instalado"
FROM node:22-alpine

# Crea la carpeta donde vivirá tu app dentro del contenedor
WORKDIR /app

# Copia primero los archivos de dependencias
# Esto es para aprovechar el cache de Docker
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# El puerto donde correrá el servidor
EXPOSE 8080

# Comando que arranca el servidor
CMD ["node", "dist/index.js"]