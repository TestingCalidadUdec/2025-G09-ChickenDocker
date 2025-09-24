# Usamos la imagen oficial de Python 3.11 basada en Alpine
# Alpine es una versión ligera de Linux, ideal para contenedores pequeños
FROM python:3.11-alpine

# Establecemos el directorio de trabajo dentro del contenedor
# Todas las acciones siguientes (COPY, RUN, CMD, etc.) se ejecutarán aquí
WORKDIR /workouts_udec_backend

# Copiamos el archivo de dependencias de Python al contenedor
COPY requirements.txt .

# Instalamos las dependencias listadas en requirements.txt
RUN pip install -r requirements.txt

# Instalamos curl (necesario para healthchecks)
# --no-cache evita que apk guarde archivos temporales y reduce el tamaño de la imagen
RUN apk add --no-cache curl

# Copiamos todos los archivos del proyecto al contenedor
COPY . .

# Copiamos el script de entrypoint y le damos permisos de ejecución
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Configuramos el entrypoint del contenedor
# Al iniciar, Docker ejecutará este script en lugar del CMD por defecto
# entrypoint.sh se encargará de migraciones, creación de admin y de arrancar FastAPI
ENTRYPOINT ["./entrypoint.sh"]
