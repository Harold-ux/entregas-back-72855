import productsManager from "../data/fs/products.en.js";

const indexView = async (req, res, next) => {
  try {
    const all = await productsManager.readAll();
    const data = {
      title: "Home",
      message: "WELCOME BACKend!",
      class: "home",
      products: all,
    };
    res.status(200).render("index", data);
  } catch (error) {
    next(error);
  }
};

const productView = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOne(pid);

    const data = {
      title: "Product Detail",
      product,
    };

    return res.status(200).render("product", data);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).render("product", {
        product: null,
      });
    }
    next(error);
  }
};

const cartView = (req, res, next) => {
  try {
    const data = {
      title: "Cart",
      message: "Welcome to the cart!",
    };
    return res.status(200).render("cart", data);
  } catch (error) {
    next(error);
  }
};

const profileView = (req, res, next) => {
  try {
    const data = {
      title: "Profile",
      message: "User data!",
    };
    res.status(200).render("profile", data);
  } catch (error) {
    next(error);
  }
};

const socketView = (req, res, next) => {
  try {
    const data = {
      title: "Chat",
      message: "Welcome to the real-time chat!",
    };
    res.status(200).render("socket", data);
  } catch (error) {
    next(error);
  }
};


export const realTimeProductsView = async (req, res) => {
  const products = await productsManager.readAll();
  res.render("realTimeProducts", { title: "Real-Time Products", products });
};

export { indexView, productView, cartView, profileView, socketView };
