#!/bin/sh
# set -e hace que el script se detenga inmediatamente si algún comando falla
set -e

echo "Actualizando a la última migración"
# Aplica cualquier migración pendiente para poner la base de datos al día
alembic upgrade head

echo "Creando usuario admin"
# Ejecuta un script Python que verifica si el admin ya existe; si no, lo crea
python3 create_admin.py

# "exec" reemplaza el proceso del script por uvicorn,
# de manera que el contenedor use este proceso principal
exec uvicorn main:app --host 0.0.0.0 --port 8000

