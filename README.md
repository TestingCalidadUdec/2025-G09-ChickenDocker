# 🏋️♂️ Workout Tracker - Aplicación Full Stack

Una aplicación **full-stack** de seguimiento de entrenamientos que ayuda a los usuarios a gestionar su progreso fitness con registro detallado de rutinas, gestión de ejercicios y seguimiento de avances.  

## 🌟 Descripción general

Esta aplicación consiste en un **backend con FastAPI** y un **frontend con React TypeScript**, proporcionando una solución completa para el seguimiento personal de entrenamientos y la gestión de gimnasio.  

### ✨ Funcionalidades principales

**👤 Para usuarios:**
- 🔐 Autenticación segura y gestión de perfil  
- 🏃♂️ Seguimiento interactivo de sesiones de entrenamiento  
- 📊 Registro detallado de ejercicios con series, repeticiones, peso y duración  
- 📈 Historial de entrenamientos  
- 📝 Notas de rutinas y ejercicios  
- 📋 Plantillas de entrenamientos predefinidas  
- 📱 Diseño responsivo para móvil y escritorio  

**👨💼 Para administradores:**
- 👥 Sistema completo de gestión de usuarios  
- 💪 Administración de la base de datos de ejercicios  
- 📋 Creación y gestión de plantillas de entrenamientos  
- 🛡️ Control de acceso basado en roles  

## 🏗️ Arquitectura

### Stack tecnológico

| Componente | Tecnología | Propósito |
|------------|------------|-----------|
| **Backend** | FastAPI + SQLAlchemy | API REST con acceso a BD mediante ORM |
| **Frontend** | React 19 + TypeScript | SPA moderna con tipado seguro |
| **Base de datos** | PostgreSQL | Almacenamiento relacional confiable |
| **Estilos** | Tailwind CSS 4.x | Diseño responsivo basado en utilidades |
| **Autenticación** | Tokens JWT | Autenticación segura sin estado |
| **Herramientas de build** | Vite + ESLint | Desarrollo rápido y aseguramiento de calidad |  

## 🚀 Inicio rápido
Revisa el README en **workouts_udec_backend** y **workouts_udec_frontend** para comenzar.  


# 🐾🐔 TEAM Chicken Docker Project 🐔🐾

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



