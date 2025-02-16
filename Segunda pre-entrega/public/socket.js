console.log("Connecting to script!");

const socket = io();

// DOM element references
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");

// Send a new product to the server when the form is submitted
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Obtener los datos del formulario
  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);
  const image = ""; // Si se incluye un campo de imagen, se puede manejar aquí.

  // Emitir el evento "addProduct" al servidor con los datos del nuevo producto
  socket.emit("addProduct", { title, price, stock, image });

  // Limpiar el formulario después de enviarlo
  addProductForm.reset();
});

// **Escuchar la actualización de productos**
socket.on("updateProducts", (products) => {
  // Actualiza la lista de productos en la UI
  productList.innerHTML = "";  // Limpiar la lista actual

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("card", "product-card");
    productDiv.style.width = "18rem";
    productDiv.dataset.id = product._id;

    // Mostrar los detalles del producto
    productDiv.innerHTML = `
      <img src="${product.image}" class="card-img-top" alt="Product Image">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">💲 ${product.price} - 📦 Stock: ${product.stock}</p>
        <button class="btn btn-danger delete-btn" data-id="${product._id}">Delete</button>
      </div>
    `;
    productList.appendChild(productDiv);
  });
});

// Listen for the 'deleteProduct' event and emit it when a product is deleted
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const productId = event.target.dataset.id;
    
    // Emit the 'deleteProduct' event with the product ID
    socket.emit("deleteProduct", productId);
  }
});
