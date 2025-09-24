# Chicken Docker Project 🐔🐾

Este proyecto utiliza **Docker** para levantar los servicios necesarios, incluyendo **backend**, **frontend** y **base de datos PostgreSQL**.

---

## 🔧 Requisitos previos

Antes de comenzar asegúrate de tener instalado en tu sistema:

- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)  

Además, asegúrate de que los siguientes puertos estén **libres** en tu máquina:

- **8000** → Backend  
- **5173** → Frontend  

---

## 🚀 Levantar la aplicación con Docker

Sigue estos pasos:

1. Navega al directorio del proyecto:

```bash
cd /2025-G09-ChickenDocker
```
Importante: Asegúrate de que los finales de línea de los archivos estén en modo LF (\n).
Esto es necesario para que los scripts de Docker y Alembic funcionen correctamente.

2. Ejecuta Docker Compose para iniciar la aplicacion web:
```bash
docker compose up
```
3. Una vez iniciado, dirígete a la siguiente página en tu navegador:
```
http://localhost:5173
```

---
## ⚙️ Comandos utiles
Levantar en segundo plano (detached)
```bash
docker compose up -d
```

Detener servicios
```bash
docker compose down
```

Rebuild (cuando cambian dependencias)
```bash
docker compose up --build
```

![ChickenDocker Team](CHICKENDOCKER.gif)



