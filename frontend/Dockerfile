# Etapa 1 - Construir el proyecto React
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Construye la versión de producción de React
RUN npm run build

# Etapa 2 - Servir el proyecto con Nginx
# Nginx es un servidor web muy liviano y rápido
FROM nginx:alpine

# Copia los archivos construidos al servidor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de Nginx para que funcione con React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]