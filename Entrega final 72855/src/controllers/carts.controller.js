import cartsManager from "../data/mongo/managers/carts.mongo.js";

// Agregar producto al carrito
const addProductToCart = async (req, res, next) => {
  const { quantity, user_id, product_id } = req.body;

  // Validación de la cantidad
  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be a positive number" });
  }

  try {
    // Agregar producto al carrito
    const one = await cartsManager.addProductToCart(user_id, product_id, quantity);
    res.status(201).json({
      method: req.method,
      url: req.url,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};

// Leer productos del carrito del usuario
const readProductsFromUser = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const all = await cartsManager.readProductsFromUser(user_id);
    if (all.length > 0) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: all,
      });
    }
    const error = new Error("Cart not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

// Actualizar la cantidad de productos en el carrito
const updateQuantity = async (req, res, next) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;

  // Validación de la cantidad
  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be a positive number" });
  }

  try {
    // Actualizar la cantidad
    const one = await cartsManager.updateQuantity(cart_id, quantity);
    res.status(200).json({
      method: req.method,
      url: req.url,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto del carrito
const removeProductFromCart = async (req, res, next) => {
  const { cart_id } = req.params;
  try {
    const one = await cartsManager.removeProductFromCart(cart_id);
    if (one) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: one,
      });
    }
    const error = new Error("Cart or Product not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

export {
  addProductToCart,
  updateQuantity,
  readProductsFromUser,
  removeProductFromCart,
};
