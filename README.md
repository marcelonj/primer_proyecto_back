# 🍽️ Proyecto final backend "Sabor Urbano"

Este proyecto es una aplicación backend desarrollada con **Node.js**, **Express** y **MongoDB**, orientada a la gestión de un sistema de restaurante.  
Incluye autenticación de usuarios, manejo de inventario, gestión de platos y pedidos, con seguridad basada en **JWT** y middleware personalizado.

---

## 🚀 Características principales
- **Autenticación de usuarios** con passport (login, logout, sesiones).
- **Middleware de seguridad** para restringir la creación de usuarios.
- **Gestión de inventario**: control de stock y disponibilidad.
- **Gestión de pedidos**: creación y visualización de órdenes.
- **Arquitectura modular** con controladores, modelos y rutas.
- **Motor de vistas Pug** para renderizado dinámico.

---

## 📂 Estructura del proyecto

Hoy
Crea un README para este repositorio
Perfecto, Marcelo 🚀. Te armo un README.md inicial para tu repositorio primer_proyecto_back en GitHub, teniendo en cuenta lo que ya implementaste (JWT, login, gestión de platos, inventario y pedidos con MongoDB, middleware de seguridad, etc.). Aquí tienes una propuesta clara y profesional:

markdown
# 🍽️ Primer Proyecto Back

Este proyecto es una aplicación backend desarrollada con **Node.js**, **Express** y **MongoDB**, orientada a la gestión de un sistema de restaurante.  
Incluye autenticación de usuarios, manejo de inventario, gestión de platos y pedidos, con seguridad basada en **JWT** y middleware personalizado.

---

## 🚀 Características principales
- **Autenticación de usuarios** con JWT (login, logout, sesiones).
- **Middleware de seguridad** para restringir la creación de usuarios.
- **Gestión de platos**: creación, actualización y eliminación.
- **Gestión de inventario**: control de stock y disponibilidad.
- **Gestión de pedidos**: creación y visualización de órdenes.
- **Arquitectura modular** con controladores, modelos y rutas.
- **Motor de vistas Pug** para renderizado dinámico.

---

## 📂 Estructura del proyecto
primer_proyecto_back/ ├── config/ # Configuración general (JWT, DB, etc.) ├── controllers/ # Lógica de negocio (platos, inventario, pedidos, usuarios) ├── data/ # Datos iniciales o seeds ├── middleware/ # Middlewares de seguridad y validación ├── models/ # Modelos de MongoDB (Mongoose) ├── passport/ # Estrategias de autenticación ├── public/ # Archivos estáticos ├── routes/ # Definición de rutas de la API ├── scripts/ # Scripts auxiliares ├── views/ # Plantillas Pug └── server.js # Punto de entrada principal

Código

---

## ⚙️ Instalación y uso
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/marcelonj/primer_proyecto_back.git
   cd primer_proyecto_back
Instalar dependencias:

bash
npm install
Configurar variables de entorno en un archivo .env:

Código
PORT=3000
MONGO_URI=mongodb://localhost:27017/primer_proyecto
JWT_SECRET=tu_clave_secreta
Ejecutar el servidor:

bash
npm start
📡 Endpoints principales
Auth

POST /login → Iniciar sesión

POST /logout → Cerrar sesión

Usuarios

POST /users → Crear usuario (restringido por middleware)

Platos

GET /dishes → Listar platos

POST /dishes → Crear plato

Inventario

GET /inventory → Ver inventario

PUT /inventory/:id → Actualizar stock

Pedidos

POST /orders → Crear pedido

GET /orders → Listar pedidos

👨‍💻 Tecnologías utilizadas
Node.js + Express

MongoDB + Mongoose

JWT para autenticación

Pug para vistas

Passport.js para login

📌 Próximas mejoras
Validaciones más robustas en formularios.

Documentación de API con Swagger.

Tests automatizados con Jest/Supertest.

Manejo avanzado de roles y permisos.

🧑‍🤝‍🧑 Contribuidores
marcelonj

volpo (Alejandro Volponi)

chules777

📄 Licencia
Este proyecto se distribuye bajo la licencia MIT.

Código

---

👉 Te lo dejé bien estructurado y listo para que lo copies en tu `README.md`.  
¿Querés que además te prepare un **diagrama visual de la arquitectura** (usuarios → auth → controladores → DB) para complementar el README?

README para Proyecto Backend de Restaurante

Abrir página

He comenzado la página, README para Proyecto Backend de Restaurante. Puedes editarla ahora o volver a ella más tarde.

Crea un README para este repositorio
Perfecto, Marcelo 🚀. Te armo un README.md inicial para tu repositorio primer_proyecto_back en GitHub, teniendo en cuenta lo que ya implementaste (JWT, login, gestión de platos, inventario y pedidos con MongoDB, middleware de seguridad, etc.). Aquí tienes una propuesta clara y profesional:

markdown
# 🍽️ Primer Proyecto Back

Este proyecto es una aplicación backend desarrollada con **Node.js**, **Express** y **MongoDB**, orientada a la gestión de un sistema de restaurante.  
Incluye autenticación de usuarios, manejo de inventario, gestión de platos y pedidos, con seguridad basada en **JWT** y middleware personalizado.

---

## 🚀 Características principales
- **Autenticación de usuarios** con JWT (login, logout, sesiones).
- **Middleware de seguridad** para restringir la creación de usuarios.
- **Gestión de platos**: creación, actualización y eliminación.
- **Gestión de inventario**: control de stock y disponibilidad.
- **Gestión de pedidos**: creación y visualización de órdenes.
- **Arquitectura modular** con controladores, modelos y rutas.
- **Motor de vistas Pug** para renderizado dinámico.

---

## 📂 Estructura del proyecto
primer_proyecto_back/

├── config/ # Configuración general

├── controllers/ # Lógica de negocio (platos, inventario, pedidos, usuarios) 

├── data/ # Datos en json usados en la primera parte de proyecto

├── middleware/ # Middlewares de seguridad y validación 

├── models/ # Modelos de MongoDB (Mongoose) 

├── passport/ # Estrategias de autenticación 

├── public/ # Archivos estáticos 

├── routes/ # Definición de rutas de la API 

├── scripts/ # Scripts auxiliares 

├── views/ # Plantillas Pug 

└── app.js # Punto de entrada principal


---

## ⚙️ Instalación y uso
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/marcelonj/primer_proyecto_back.git
   cd primer_proyecto_back

Instalar dependencias:

npm install

Configurar variables de entorno en un archivo .env:

PORT=3000
MONGO_URI=url_base_datos_mongo
SECRET=tu_clave_secreta

Ejecutar el servidor:

npm start

📡 Endpoints principales

Auth

POST /login → Iniciar sesión

POST /logout → Cerrar sesión

Usuarios

POST /users → Crear usuario (restringido por middleware)

Inventario

GET /inventario → Ver inventario

POST /inventario/nueco → Agregar producto al inventario

DELETE /eliminar/:id → Eliminar producto del inventario

Pedidos

POST /pedidos/nuevo → Crear pedido

GET /pedidos → Listar pedidos

👨‍💻 Tecnologías utilizadas

Node.js + Express

MongoDB + Mongoose

Pug para vistas

Passport.js para login

📌 Próximas mejoras

Validaciones más robustas en formularios.

Documentación de API con Swagger.

Tests automatizados con Jest/Supertest.

Manejo avanzado de roles y permisos.

🧑‍🤝‍🧑 Contribuidores

marcelonj

volpo (Alejandro Volponi)

chules777