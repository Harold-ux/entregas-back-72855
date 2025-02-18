import productsManager from "../data/fs/products.en.js";

// Get all products
const readProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productsManager.readAll(category);

    if (!all || all.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    return res.status(200).json({ response: all });
  } catch (error) {
    next(error);
  }
};

// Get a product by ID
const readOne = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);

    if (!one) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({ response: one });
  } catch (error) {
    next(error);
  }
};

// Create a product
const createProduct = async (req, res, next) => {
  try {
    const one = await productsManager.create(req.body);
    return res.status(201).json({ response: one });
  } catch (error) {
    next(error);
  }
};

// Update a product
const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productsManager.updateOne(pid, req.body);
    if (!updatedProduct) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }
    return res.status(200).json({ response: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deleted = await productsManager.deleteOne(pid);

    if (!deleted) {
      const err = new Error(`Product with ID ${pid} not found`);
      err.statusCode = 404;
      throw err;
    }

    return res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export { readProducts, createProduct, readOne, updateProduct, deleteProduct };
