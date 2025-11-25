# 🍽️ Proyecto final backend "Sabor Urbano"

Este proyecto es una aplicación backend desarrollada con **Node.js**, **Express** y **MongoDB**, orientada a la gestión de un sistema de restaurante.  
Incluye autenticación de usuarios, manejo de inventario, gestión de platos y pedidos, con seguridad basada en **Passport** y middleware personalizado.

---

## 🚀 Características principales
- **Autenticación de usuarios** con JWT (login, logout, sesiones).
- **Middleware de seguridad** para restringir la creación de usuarios.
- **Gestión de inventario**: control de stock y disponibilidad.
- **Gestión de pedidos**: creación y visualización de órdenes.
- **Arquitectura modular** con controladores, modelos y rutas.
- **Motor de vistas Pug** para renderizado dinámico.


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

POST /inventario/nuevo → Agregar producto al inventario

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
