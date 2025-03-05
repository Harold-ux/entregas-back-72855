// import productsManager from "../data/fs/products.en.js";
import productsManager from "../data/mongo/managers/products.mongo.js";

// Get all products
const read = async (req, res, next) => {
  try {
    const filter = req.query;
    const all = await productsManager.read(filter);
    if (all.length > 0) {
      return res.status(200).json({
        method: req.method,
        url: req.url,
        response: all,
      });
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};

// Get a product by ID
const readById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readById(pid);

    if (!one) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json({ method: req.method, url: req.url, response: one });
  } catch (error) {
    next(error);
  }
};

// Create a product
const create = async (req, res, next) => {
  try {
    const one = await productsManager.create(req.body);
    return res
      .status(201)
      .json({ method: req.method, url: req.url, response: one });
  } catch (error) {
    next(error);
  }
};

// Update a product
const updateById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productsManager.updateById(pid, req.body);
    if (!updatedProduct) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }
    return res
      .status(200)
      .json({ method: req.method, url: req.url, response: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// Delete a product
const deleteById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deleted = await productsManager.deleteById(pid);

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

const paginate = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { docs, prevPage, nextPage } = await productsManager.paginate(
      page,
      limit
    );
    return res.status(200).json({
      method: req.method,
      url: req.url,
      response: { docs, prevPage, nextPage },
    });
  } catch (error) {
    next(error);
  }
};

export { read, create, readById, updateById, deleteById, paginate };