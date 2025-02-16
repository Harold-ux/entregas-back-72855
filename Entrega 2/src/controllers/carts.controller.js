import { faker } from "@faker-js/faker";
import cartManager from "../data/fs/carts.en.js";


const createCartMock = async (req, res) => {
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
    await cartsManager.addProductToCart(cart.id, randomProduct); // Add the product to the cart.

    return res.status(201).json({ response: cart }); // Return the cart with the added product
  } catch (error) {
    return res.status(500).json({ error: "Error creating the cart" });
  }
};

const createCart = async (req, res) => {
  try {
    // Create a cart using the CartManager method
    const newCart = await cartManager.createCart();
    return res.status(201).json({ response: newCart });
  } catch (error) {
    return res.status(500).json({ error: "Error creating the cart" });
  }
};

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
      return res.status(400).json({
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
    await cartsManager.updateCart(cid, cart);

    return res.status(200).json({ response: cart });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error adding product to cart: ${error.message}` });
  }
};


export { createCartMock, createCart, readOneCart, readCarts, addProductToCart };