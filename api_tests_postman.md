# Pruebas API con Postman

Sigue los siguentes pasos para poder ejecutar los tests de la api en postman

---

## 1. Importar la colección
1. Abre **Postman** (versión de escritorio o web).  
2. Haz clic en **Import** y selecciona la carpeta **`Colección Postman`** incluida en el proyecto.  
3. Una vez importada, verás varias carpetas organizadas alfabéticamente (por ejemplo: `[A]`, `[B]`, `[C]`…).

---

## 2. Configurar el entorno (Environment)
1. Dirígete a la pestaña **Environments** o **Entornos**.  
2. Selecciona y **activa** el entorno llamado:  
   >  **variables de entorno**

<p align="center">
  <img src="postmantick.jpg" alt="Postman Tick" width="400" style="border-radius:10px;"/>
</p>

3. Este entorno contiene variables de gran importancia:

   + **`base_url`** → URL base del servidor donde se ejecutan las API.
   - **`admin_token`** → Token Bearer necesario para ejecutar varios tests.


---

## 3. Ejecutar las pruebas
1. En el panel izquierdo, **haz clic derecho** sobre una colección.  
2. Selecciona la opción **Run**.  
3. Se abrirá el **Runner** con los request listos para ser ejecutados.  
4. Dentro del runner, haz clic en:  
   > ▶️ **Run [nombre de la colección]**  

---

## 4. Orden recomendado
Ejecuta las carpetas en el **orden alfabético** indicado, ya que algunas pruebas dependen de las anteriores:  
> `[A]` → `[B]` → `[C]` → `[D]` …

---

## Nota Adicional

El endpoint  
> **`/api/workouts/{workout_id}/progression/{exercise_id}`**  
fue **omitido de las pruebas**, ya que **no se utiliza actualmente en ningún flujo funcional** de la API.

Además, presentaba **inconsistencias lógicas** en su implementación, tales como:

- Permitir solicitudes con un **`workout_id` inexistente**, devolviendo un **status 200 OK**.  
- Permitir solicitudes con un **`exercise_id` inexistente**, devolviendo igualmente un **status 200 OK**.  

Estas situaciones **dificultaron la elaboración de test** para este endpoint, ya que **no existía documentación ni un propósito claro** respecto a su funcionalidad.  
Por estos motivos, y considerando los errores mencionados, **se decidió no incluirlo** dentro de la colección de tests en Postman.

