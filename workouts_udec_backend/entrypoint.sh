#!/bin/sh
# set -e hace que el script se detenga inmediatamente si algún comando falla
set -e

# "alembic current --verbose" muestra la revisión actual de la base de datos
# Si grep 'heads' no encuentra nada, significa que no hay revisiones aplicadas
if [ -z "$(alembic current --verbose | grep 'heads')" ]; then
    echo "No hay archivos para migrar, creando archivos para migrar"
    # Genera automáticamente una migración inicial basada en el modelo actual de SQLAlchemy
    alembic revision --autogenerate -m "Initial migration"
else
    echo "Ya existen los archivos para migrar."
fi

echo "Actualizando a la última migración"
# Aplica cualquier migración pendiente para poner la base de datos al día
alembic upgrade head


echo "Creando usuario admin"
# Ejecuta un script Python que verifica si el admin ya existe; si no, lo crea
python3 create_admin.py


# "exec" reemplaza el proceso del script por uvicorn,
# de manera que el contenedor use este proceso principal
exec uvicorn main:app --host 0.0.0.0 --port 8000

