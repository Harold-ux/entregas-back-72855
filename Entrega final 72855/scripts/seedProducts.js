import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateProduct = (category) => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price({ min: 10, max: 5000, dec: 2 }),
    stock: faker.number.int({ min: 0, max: 1000 }),
    photo: faker.image.url(),
    category: category,
  };
};

// Generar productos para cada categoría
const categories = ["ropa", "cellphones", "computers", "accessories"];
let products = [];

categories.forEach(category => {
  for (let i = 0; i < 10; i++) {
    products.push(generateProduct(category));
  }
});

// Guardar los productos en un archivo JSON
fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf-8');
console.log("Archivo products.json creado con éxito.");
