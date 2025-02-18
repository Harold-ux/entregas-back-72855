# Proyecto Backend de E-Commerce

## Descripción

Este proyecto es una implementación de backend para una plataforma de e-commerce. Proporciona APIs para la gestión de productos, usuarios y carritos, junto con actualizaciones en tiempo real utilizando WebSockets. La aplicación utiliza Express.js para el servidor, Handlebars para la creación de plantillas y almacenamiento basado en archivos para la gestión de datos.

## Tabla de Contenidos

1.  [Instalación](#instalación)
2.  [Estructura del Proyecto](#estructura-del-proyecto)
3.  [Funcionalidades Clave](#funcionalidades-clave)
4.  [Endpoints de la API](#endpoints-de-la-api)
5.  [Middlewares](#middlewares)
6.  [Vistas](#vistas)
7.  [Implementación de WebSocket](#implementación-de-websocket)
8.  [Estructura de Directorios](#estructura-de-directorios)
9.  [Uso](#uso)
10. [Contribución](#contribución)


## Instalación

1.  Clona el repositorio:

    ```
    git clone 
    ```

2.  Navega al directorio del proyecto:

    ```
    cd 
    ```

3.  Instala las dependencias:

    ```
    npm install
    ```

## Estructura del Proyecto

```
├── node_modules/
├── public/
│   ├── assets/
│   │   └── fondo.jpeg
│   ├── index.css
│   ├── realtimeproducts.js
│   └── socket.js
├── src/
│   ├── controllers/
│   │   ├── carts.controller.js
│   │   ├── products.controller.js
│   │   ├── users.controller.js
│   │   └── views.controller.js
│   ├── data/
│   │   ├── fs/
│   │   │   ├── files/
│   │   │   │   └── products.json
│   │   │   ├── carts.en.js
│   │   │   ├── products.en.js
│   │   │   └── users.en.js
│   │   ├── memory/
│   │   │   ├── products.memory.js
│   │   │   └── users.memory.js
│   │   └── manager.en.js
│   ├── middlewares/
│   │   ├── errorHandler.mid.js
│   │   ├── isValidProduct.mid.js
│   │   ├── isValidUser.mid.js
│   │   └── pathHandler.mid.js
│   ├── routers/
│   │   ├── api/
│   │   │   ├── carts.api.js
│   │   │   ├── index.api.js
│   │   │   ├── products.api.js
│   │   │   └── users.api.js
│   │   ├── index.router.js
│   │   └── views.router.js
│   ├── utils/
│   │   └── utils.js
│   └── views/
│       ├── layouts/
│       │   └── main.handlebars
│       ├── cart.handlebars
│       ├── index.handlebars
│       ├── product.handlebars
│       ├── profile.handlebars
│       ├── realTimeProducts.handlebars
│       └── socket.handlebars
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

## Funcionalidades Clave

*   **Gestión de Productos**:
    *   Crear, leer, actualizar y eliminar productos.
    *   Filtrar productos por categoría.
*   **Gestión de Usuarios**:
    *   Crear, leer, actualizar y eliminar usuarios.
    *   Filtrar usuarios por rol.
*   **Gestión de Carritos**:
    *   Crear carritos.
    *   Añadir productos a los carritos.
    *   Ver el contenido de los carritos.
*   **Actualizaciones en Tiempo Real**:
    *   Utilizar WebSockets para proporcionar actualizaciones en tiempo real de los listados de productos.
    *   Implementar una función de chat en tiempo real.
*   **Plantillas**:
    *   Utilizar Handlebars para renderizar vistas dinámicas para productos, carritos y perfiles de usuario.
*   **Middleware**:
    *   Middleware de validación para garantizar la integridad de los datos de productos y usuarios.
    *   Middleware de manejo de errores para respuestas de error consistentes.

## Endpoints de la API

### Productos

*   `GET /api/products`: Obtener todos los productos, opcionalmente filtrar por categoría.
*   `POST /api/products`: Crear un nuevo producto. Requiere el middleware de validación (`isValidProduct`).
*   `GET /api/products/:pid`: Obtener un producto por ID.
*   `PUT /api/products/:pid`: Actualizar un producto por ID. Requiere el middleware de validación (`isValidProduct`).
*   `DELETE /api/products/:pid`: Eliminar un producto por ID.

### Usuarios

*   `POST /api/users`: Crear un nuevo usuario. Requiere el middleware de validación (`isValidUser`).
*   `GET /api/users/:uid`: Obtener un usuario por ID.
*   `GET /api/users`: Obtener todos los usuarios, opcionalmente filtrar por rol.
*   `PUT /api/users/:uid`: Actualizar un usuario por ID. Requiere el middleware de validación (`isValidUser`).
*   `DELETE /api/users/:uid`: Eliminar un usuario por ID.

### Carritos

*   `POST /api/carts`: Crear un nuevo carrito.
*   `GET /api/carts/:cid`: Obtener un carrito por ID.
*   `GET /api/carts`: Obtener todos los carritos.
*   `POST /api/carts/:cid/product/:pid`: Añadir un producto a un carrito.

## Middlewares

*   `errorHandler.mid.js`: Maneja los errores proporcionando una respuesta JSON consistente con el código de estado, el método, la URL y el mensaje de error.
*   `isValidProduct.mid.js`: Valida los datos del producto en el cuerpo de la solicitud al crear o actualizar productos. Asegura que los campos requeridos (`title`, `price`, `stock`, `category`) estén presentes y sean del tipo correcto.
*   `isValidUser.mid.js`: Valida los datos del usuario en el cuerpo de la solicitud al crear o actualizar usuarios. Asegura que los campos requeridos (`age`, `name`, `email`, `password`) estén presentes y sean del tipo correcto.
*   `pathHandler.mid.js`: Maneja las rutas no definidas devolviendo un error 404 con una respuesta JSON.

## Vistas

El proyecto utiliza plantillas Handlebars para renderizar contenido dinámico.

*   `index.handlebars`: Muestra una lista de productos con sus títulos, precios y stock. Incluye enlaces para ver los detalles del producto y eliminar productos.
*   `product.handlebars`: Muestra información detallada sobre un solo producto, incluyendo su imagen, título, descripción, precio y stock.
*   `cart.handlebars`: Marcador de posición para mostrar el contenido del carrito.
*   `profile.handlebars`: Marcador de posición para mostrar la información del perfil del usuario.
*   `realTimeProducts.handlebars`: Muestra una lista de productos en tiempo real, permitiendo a los usuarios añadir nuevos productos y eliminar los existentes a través de WebSockets.
*   `socket.handlebars`: Implementa una interfaz de chat en tiempo real utilizando WebSockets.
*   `layouts/main.handlebars`: Plantilla de diseño principal que proporciona la estructura HTML básica, incluyendo el encabezado, la navegación y el CSS de Bootstrap.

## Implementación de WebSocket

*   El archivo `server.js` configura un servidor WebSocket utilizando Socket.io.
*   Los clientes pueden conectarse al servidor y recibir actualizaciones en tiempo real de los listados de productos.
*   La vista `realTimeProducts.handlebars` incluye JavaScript del lado del cliente para gestionar la adición y eliminación de productos a través de WebSockets.
*   La vista `socket.handlebars` implementa una interfaz de chat simple donde los usuarios pueden enviar y recibir mensajes en tiempo real.

## Estructura de Directorios

*   `controllers`: Contiene los controladores de ruta para la gestión de productos, usuarios, carritos y vistas.
*   `data`: Contiene la lógica de gestión de datos, incluyendo las implementaciones de almacenamiento basadas en archivos.
*   `middlewares`: Contiene funciones de middleware para la validación de solicitudes y el manejo de errores.
*   `routers`: Contiene definiciones de rutas para los endpoints de la API y las vistas.
*   `utils`: Contiene funciones de utilidad.
*   `views`: Contiene plantillas Handlebars para renderizar contenido dinámico.
*   `public`: Contiene activos estáticos como archivos CSS y JavaScript.

## Uso

1.  Inicia el servidor:

    ```
    npm run dev
    ```

2.  Abre tu navegador y navega a `http://localhost:8080` para ver la página de inicio.

3.  Utiliza los endpoints de la API para gestionar productos, usuarios y carritos.

## Contribución

Siéntete libre de contribuir a este proyecto enviando pull requests.
