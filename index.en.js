import express from "express";
import cartManager from "./src/data/fs/carts.en.js";
import productsManager from "./src/data/fs/products.en.js";
import usersManager from "./src/data/fs/users.en.js";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

// executing the express module creates a server

/* server settings */
const server = express();
const port = 8080;
const ready = () => console.log(`Server running on port ${port}`);
server.listen(port, ready);

/* functionalities applied to the server */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// first route to return products
/* router */

const apiPoint = "/";
const listProducts = async (req, res) => {
  try {
    const allProducts = await productsManager.readAll();
    if (allProducts.length > 0) {
      return res.status(200).json({ response: allProducts });
    }
    return res.status(404).json({ error: "No products found" });
  } catch (error) {
    return res.status(500).json({ error: "Error getting products" });
  }
};

server.get(apiPoint, listProducts);

//---> Now, routes that serve us with the products

const readOne = async (req, res) => {
  const { pid } = req.params;
  try {
    const one = await productsManager.readOne(pid);
    if (one.error) {
      return res.status(404).json(one);
    }
    return res.status(200).json({ response: one });
  } catch (error) {
    return res.status(500).json({ error: "Error getting the product" });
  }
};
server.get("/api/products/:pid", readOne);

//---> (GET method) to read all products
// Route to get all products or filter by category

const readProducts = async (req, res) => {
  const { category } = req.query;
  try {
    const all = await productsManager.readAll(category);
    if (all.length > 0) {
      return res.status(200).json({ response: all });
    }
    return res.status(404).json({ error: "No products found" });
  } catch (error) {
    return res.status(500).json({ error: "Error getting the products" });
  }
};
server.get("/api/products", readProducts);

//---> now, we create a route to post (POST method) a new product

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    // Validate that all necessary data is present
    if (!data.title || !data.price || !data.stock || !data.category) {
      return res.status(400).json({
        error: "Missing necessary data (title, price, stock, category)",
      });
    }
    const one = await productsManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error creating the product";
    return res.status(status).json({ error: message });
  }
};

server.post("/api/products", createProduct);

//---> now, we create a route to update (PUT method) a product

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const updatedProduct = await productsManager.updateOne(pid, data);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({ response: updatedProduct });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error updating the product";
    return res.status(status).json({ error: message });
  }
};

server.put("/api/products/:pid", updateProduct);

//---> now, we create a route to delete (DELETE method) a product

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsManager.deleteOne(pid);
    // Check if the product was not found
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res
      .status(200)
      .json({ response: "Product successfully deleted: ", product });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error deleting the product";
    return res.status(status).json({ error: message });
  }
};
server.delete("/api/products/:pid", deleteProduct);

/////////////////////////////////////////////////////////////////////////////

// ----> Now, routes that serve us with the users

const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.age || !data.name || !data.email || !data.password) {
      return res.status(400).json({
        error: "Missing necessary data (age, name, email, password)",
      });
    }
    const one = await usersManager.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error creating the user";
    return res.status(status).json({ error: message });
  }
};

server.post("/api/users", createUser);

const readOneUser = async (req, res) => {
  const { uid } = req.params;
  try {
    const one = await usersManager.readOne(uid);
    if (one) {
      return res.status(200).json({ response: one });
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    return res.status(500).json({ error: "Error getting the user" });
  }
};
server.get("/api/users/:uid", readOneUser);

///////////////////////////////////////////////////////////

// ----> Now, routes that serve us with the carts

/* const createCartMock = async (req, res) => {
  try {
    // Create the random product
    const randomProduct = {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.random.alphaNumeric(6),
      price: parseFloat(faker.commerce.price()),
      status: faker.datatype.boolean(),
      stock: faker.datatype.number({ min: 1, max: 100 }),
      category: faker.commerce.department(),
      thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
    };

    // Create the empty cart first
    const cart = await cartManager.createCart();

    // Here you should have a function that adds products to the cart.
    // Assuming the cart has a method like 'addProduct'
    await cartManager.addProductToCart(cart.id, randomProduct); // Add the product to the cart.

    return res.status(201).json({ response: cart }); // Return the cart with the added product
  } catch (error) {
    return res.status(500).json({ error: "Error creating the cart" });
  }
};

server.post("/api/carts", createCartMock); */

// Create a cart

const createCart = async (req, res) => {
  try {
    // Create a cart using the CartManager method
    const newCart = await cartManager.createCart();
    return res.status(201).json({ response: newCart });
  } catch (error) {
    return res.status(500).json({ error: "Error creating the cart" });
  }
};

server.post("/api/carts", createCart);

// Get the products of a cart
const readOneCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    if (cart) {
      return res.status(200).json({ response: cart });
    }
    return res.status(404).json({ error: "Cart not found" });
  } catch (error) {
    return res.status(500).json({ error: "Error getting the cart" });
  }
};

server.get("/api/carts/:cid", readOneCart);

// Get all carts

const readCarts = async (req, res) => {
  try {
    const allCarts = await cartManager.getCarts();
    if (allCarts.length > 0) {
      return res.status(200).json({ response: allCarts });
    }
    return res.status(404).json({ error: "No carts found" });
  } catch (error) {
    return res.status(500).json({ error: "Error getting the carts" });
  }
};

server.get("/api/carts", readCarts);

// Add a product to the cart
const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  // Quantity validation
  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be a positive number" });
  }

  try {
    // Get the product by ID
    const product = await productsManager.readOne(pid);
    if (!product) {
      return res
        .status(404)
        .json({ error: `Product with ID ${pid} not found` });
    }

    // Check if the requested quantity exceeds the stock
    if (quantity > product.stock) {
      return res
        .status(400)
        .json({
          error: `Not enough stock for product ${pid}. Available stock: ${product.stock}`,
        });
    }

    // Get the cart
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: `Cart with ID ${cid} not found` });
    }

    // Check if the product is already in the cart
    const existingProduct = cart.products.find((p) => p.product === pid);
    if (existingProduct) {
      // If the product is already in the cart, increase the quantity
      existingProduct.quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      cart.products.push({ product: pid, quantity });
    }

    // Update the cart in storage
    await cartManager.updateCart(cid, cart);

    return res.status(200).json({ response: cart });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error adding product to cart: ${error.message}` });
  }
};

server.post("/api/carts/:cid/product/:pid", addProductToCart);

/* non-existent routes always go at the end because * has priority in the order */
server.get("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});
