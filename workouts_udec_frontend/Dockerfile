# Usamos la imagen oficial de Node.js 20 basada en Alpine (ligera y pequeña)
FROM node:20-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /workouts_udec_frontend

# Copiamos los archivos de dependencias (package.json y package-lock.json) al contenedor
COPY package*.json ./

# Instalamos las dependencias de Node.js
RUN npm install

# Copiamos todo el resto del proyecto al contenedor
COPY . .

# Construimos la aplicación (por ejemplo, Vite/React/Next) para producción
RUN npm run build

# Instalamos curl para usar en healthchecks del contenedor
RUN apk add --no-cache curl

# Exponemos el puerto 5173 (el que usa Vite) para que sea accesible desde el host
EXPOSE 5173

# Comando por defecto al iniciar el contenedor
# Arrancamos el servidor de desarrollo 
CMD ["npm", "run", "dev", "--", "--host"]
