import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const path = "./src/data/fs/files/products.json";

class ProductsManager {
  constructor() {
    this.path = path;
    this.init()
      .then(() => console.log("Initialization complete"))
      .catch(console.error);
  }

  async init() {
    try {
      await fs.access(this.path);
      console.log(this.path);
    } catch (error) {
      console.error("File not found... creating a new one.");
      await fs.writeFile(this.path, JSON.stringify([]));
      console.log(`File created at: ${this.path}`);
    }
  }

  // ---> generic method to overwrite formatting with stringify and 3rd parameter
  async write(data) {
    //---> the variable data is provided by the client
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.path, jsonData);
    } catch (error) {
      console.error("Error writing to the file:", error);
    }
  }

  // ---> method to create a product with faker
  /*   async createMock() {
    try {
      const _id = faker.database.mongodbObjectId();
      const title = faker.commerce.productName();
      const price = faker.commerce.price({ min: 10, max: 500, dec: 2 });
      const stock = faker.number.int({ min: 0, max: 1000 });
      const photo = faker.image.url();
      const category = faker.helpers.arrayElement([
        "none",
        "cellphones",
        "computers",
        "accessories",
      ]);

      const newProduct = {
        _id,
        title,
        price,
        stock,
        photo,
        category,
      };
      // once the product is built
      //   read the file
      const dataOfFile = await this.read();
      // then push the created product
      dataOfFile.push(newProduct);
      // overwrite the file with the new data
      await this.write(dataOfFile);
      // return the new product to the client
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
} */

  async create(data) {
    try {
      const _id = faker.database.mongodbObjectId();
      const newProduct = {
        _id,
        ...data,
      };
      // once the product is built with the data provided by the client
      //   read the file
      const dataOfFile = await this.read();
      // then push the created product
      dataOfFile.push(newProduct);
      // overwrite the file with the new data
      await this.write(dataOfFile);
      // return the new product to the client
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  // ---> generic method to read and parse any file
  async read() {
    try {
      let data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading the file:", error);
      return [];
    }
  }

  //---> search by category
  async readAll(category) {
    try {
      let all = await this.read();
      if (category) {
        all = all.filter((each) => each.category === category);
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  //-- > read by id
  async readOne(id) {
    try {
      const all = await this.read();
      const one = all.find((each) => each._id === id);
      return one || { error: "Not found!" };
    } catch (error) {
      throw error;
    }
  }

  //-- > update by id
  async updateOne(id, newdata) {
    try {
      const all = await this.read();
      const index = all.findIndex((product) => product._id === id);
      if (index === -1) {
        const error = new Error(`Product with ID ${id} not found`);
        error.status = 404;
        throw error;
      }
      all[index] = { ...all[index], ...newdata };
      await this.write(all);
      return all[index];
    } catch (error) {
      throw error;
    }
  }

  //-- > delete by id
  async deleteOne(id) {
    try {
      const all = await this.read();
      const index = all.findIndex((each) => each._id === id);
      if (index === -1) {
        return null;
      }
      const [deleted] = all.splice(index, 1);
      await this.write(all);
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;
