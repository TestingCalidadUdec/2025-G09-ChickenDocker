# 🏋️‍♂️ Workouts UdeC - E2E Testing

Este repositorio contiene las pruebas automatizadas **End-to-End (E2E)** para el proyecto **Workouts UdeC**, implementadas con [Playwright](https://playwright.dev/).

Estas pruebas simulan la interacción de un usuario real con la aplicación.
## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

  * **Node.js** (v14 o superior)
  * **NPM** (Incluido con Node.js)
  * **Python** (3.8 o superior)
  
## 🚀 Instalación y Configuración

Pasos para preparar el entorno de ejecucion de pruebas.

### 1\. ⚙️ Preparación del Backend

Para que las pruebas E2E funcionen, el servidor backend debe estar **ejecutándose**.

1.  Dirígete a la carpeta `workouts_udec_backend`.
2.  Sigue las instrucciones de su `README.md` para iniciar el servidor.

### 2\. Instalar dependencias
Despues de haber iniciado el backend abra otra terminal sin cerrar la del backend y dirigase a workouts_udec_frontend y ejecute lo siguente para instalar dependencias:
```bash
npm install
```

### 3\. Instalar navegadores de Playwright
en la misma carpeta ejecute 
```bash
npx playwright install
```
### 5\. Ejecutar todos los tests

Depues de todo eso ejecute el siguente comando:

```bash
npx playwright test
```
Este comando ejecutará los 20 tests de forma iterativa
La ejecución de los tests puede tardar unos segundos.
