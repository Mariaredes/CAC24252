# GRUPO 20

¡Bienvenido! Este repositorio muestra el progreso, habilidades y comprensión de los principios aprendidos en Desarrollo Web HTML, CSS y JavaScrip. Sirve como un registro del proyecto y tareas que se han completado durante el entrenamiento de CAC comision #24252 NODEJS.


INTEGRANTES:

* Maria Emilse Aredes | earedes80@gmail.com
* Nicolas Cartellone | nicolas.cartellone@gmail.com
* Gian Franco Montero | gianmonteroavalos@gmail.com
* Marcos Pablo Martin | martinmarcospablo@gmail.com

# Backend

## Instrucciones de inicio

Para iniciar el backend, sigue los siguientes pasos:

1. Asegúrate de tener Node.js y npm instalados en tu sistema.
2. Clona este repositorio en tu máquina local.
3. Navega hasta el directorio del proyecto en tu terminal.
4. Ejecuta el siguiente comando para instalar las dependencias:

    ```
    npm install
    ```

5. Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno mencionadas anteriormente. Por ejemplo:

    ```
    PORT=3000
    HOST=localhost
    USER=root
    PASSWORD=contraseña
    DATABASE=nombre_db
    ```
Para que node pueda leer el archivo .env se debe tener la version 20 o superior.

6. Ejecuta el siguiente comando para iniciar el servidor:

    ```
    npm run dev
    ```
Este script por detras corre el siguete comando: nodemon --env-file .env src src/index.js

¡Listo! El backend estará funcionando en el puerto especificado y conectado a la base de datos configurada.

## Acceso al Proyecto Deployado

El proyecto ya está deployado y accesible a través de las siguientes URLs:

- **Backend**: [https://cac-ecommerce.vercel.app/](https://cac-ecommerce.vercel.app/)
- **Frontend**: [https://cac-ecommerce.netlify.app/](https://cac-ecommerce.netlify.app/)

### Iniciar Sesión como Administrador

Para iniciar sesión en el frontend como administrador, utiliza las siguientes credenciales:

- **Email**: admin@admin.com
- **Contraseña**: admin123

