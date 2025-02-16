# Proyecto de E-commerce

Este proyecto es una API que permite gestionar productos y carritos de compra. Está desarrollado utilizando Node.js y Express para la parte del backend, y simula una base de datos utilizando archivos JSON para almacenar los productos y los carritos de los usuarios.

## Funcionalidades

### Gestión de Productos
- **Obtener todos los productos**: Permite consultar todos los productos disponibles, con la opción de filtrarlos por categoría.
- **Obtener un producto por ID**: Permite consultar un producto específico por su ID.
- **Crear un producto**: Permite crear un nuevo producto en la base de datos.
- **Actualizar un producto**: Permite modificar los detalles de un producto específico por su ID.
- **Eliminar un producto**: Permite eliminar un producto específico por su ID.

### Gestión de Carritos
- **Crear un carrito**: Permite crear un carrito de compra vacío para un usuario.
- **Obtener todos los carritos**: Permite consultar todos los carritos de compra.
- **Obtener un carrito por ID**: Permite consultar un carrito de compra específico por su ID.
- **Agregar un producto a un carrito**: Permite agregar un producto al carrito de compra de un usuario. Si el producto ya existe, se incrementa la cantidad.
- **Actualizar un carrito**: Permite actualizar los productos dentro de un carrito.

### Gestión de Usuarios
- **Crear un usuario**: Permite crear un nuevo usuario en la base de datos.
  
## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir aplicaciones web y APIs.
- **UUID**: Para generar identificadores únicos para los carritos y productos.
- **Faker**: Para generar datos falsos de productos para probar la API.
- **fs/promises**: Para manejar operaciones de lectura y escritura de archivos JSON.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-repositorio.git](https://github.com/Harold-ux/entregas-back-72855.git
   
2. Navega al directorio del proyecto:

cd Entrega 1

3. Instala las dependencias:

npm install

4. Inicia el servidor

npm start

El servidor se ejecutará en el puerto 8080 por defecto.

## Endpoints

### Productos
- **GET /api/products**: Obtiene todos los productos.
  - **Parámetros opcionales**:
    - `category`: Filtra productos por categoría.

- **GET /api/products/:pid**: Obtiene un producto específico por ID.

- **POST /api/products**: Crea un nuevo producto. Requiere un cuerpo JSON con los campos `title`, `price`, `stock`, `category`.

- **PUT /api/products/:pid**: Actualiza un producto específico por ID. Requiere un cuerpo JSON con los nuevos datos del producto.

- **DELETE /api/products/:pid**: Elimina un producto por ID.

### Carritos
- **GET /api/carts**: Obtiene todos los carritos.

- **GET /api/carts/:cid**: Obtiene un carrito específico por ID.

- **POST /api/carts**: Crea un nuevo carrito vacío.

- **POST /api/carts/:cid/products**: Agrega un producto a un carrito específico.

- **PUT /api/carts/:cid**: Actualiza los productos dentro de un carrito.

### Usuarios
- **POST /api/users**: Crea un nuevo usuario. Requiere un cuerpo JSON con los campos `age`, `name`, `email`, `password`.

## Estructura de Archivos
- `/src/data/fs/files/products.json`: Contiene la lista de productos.
- `/src/data/fs/files/carts.json`: Contiene la lista de carritos.
- `/src/data/fs/files/users.json`: Contiene la lista de usuarios.
- `/src/data/fs/carts.en.js`: Lógica para manejar los carritos.
- `/src/data/fs/products.en.js`: Lógica para manejar los productos.
- `/src/data/fs/users.en.js`: Lógica para manejar los usuarios.
- `/src/server.js`: El archivo principal que configura y ejecuta el servidor Express.

## Contribuciones
Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`).
4. Envía un pull request.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Este README proporciona una descripción completa de las funcionalidades del proyecto, las tecnologías utilizadas, cómo instalarlo, cómo utilizar la API, y la estructura de archivos. Puedes adaptarlo o agregar más detalles según sea necesario.







