
// Código con todas las clases genericas para la gestión de datos, sean usuarios o sean productos.


// Clase Genérica para Gestión de Datos

import { faker } from "@faker-js/faker";
import fs from "fs/promises";

class Manager {
  constructor(model, path) {
    this.model = model; // Función que genera un nuevo objeto
    this.path = path;
    this.init()
      .then(() => console.log(`Inicialización completa en ${this.path}`))
      .catch(console.error);
  }

  async init() {
    try {
      await fs.access(this.path);
      console.log(`El archivo ya existe: ${this.path}`);
    } catch {
      console.error(`Archivo no encontrado... creando uno nuevo: ${this.path}`);
      await fs.writeFile(this.path, JSON.stringify([]));
      console.log(`Archivo creado en: ${this.path}`);
    }
  }

  async read() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return json.parse(data);
    } catch (error) {
      console.error(`Error al leer el archivo: ${this.path}`, error);
      return null;
    }
  }

  async write(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.path, jsonData);
    } catch (error) {
      console.error(`Error al escribir en el archivo: ${this.path}`, error);
    }
  }

  async create() {
    try {
      const newItem = this.model(); // Genera un nuevo objeto usando la función pasada
      const data = await this.read();
      data.push(newItem);
      await this.write(data);
      console.log("Nuevo elemento creado:", newItem);
      return newItem;
    } catch (error) {
      console.error("Error al crear el nuevo elemento:", error);
      throw error;
    }
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////

// Implementación de Usuarios



/* const userModel = () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    password: "hola1234",
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(["user", "admin", "premium"]),
  });
  
  const usersManager = new Manager(userModel, "data/fs/files/users.json");
  export default usersManager;
 */
  


  //////////////////////////////////////////////////////////////////////////////////////////////


//   Implementación de Productos

  const productModel = () => ({
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 500, dec: 2 }),
    stock: faker.number.int({ min: 0, max: 1000 }),
    photo: faker.image.url(),
    category: faker.helpers.arrayElement([
      "ninguna",
      "celulares",
      "computadoras",
      "accesorios",
    ]),
  });
  
  const productsManager = new Manager(productModel, "./src/data/fs/files/products.json");
  export default productsManager;

  

  //////////////////////////////////////////////////////////////////////////////////////////////

//   implementación y ejecuciones

  (async () => {
 /*    const newUser = await usersManager.create();
    console.log("Usuario creado:", newUser); */
  
    const newProduct = await productsManager.create();
    console.log("Producto creado:", newProduct);
  
/*     const allUsers = await usersManager.read();
    console.log("Usuarios almacenados:", allUsers); */
  
    const allProducts = await productsManager.read();
    console.log("Productos almacenados:", allProducts);
  })();
  