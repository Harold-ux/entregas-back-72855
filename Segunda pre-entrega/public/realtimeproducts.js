const socket = io();

// Capturar el formulario y la lista de productos
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");

// Escuchar el envío del formulario para agregar productos
addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!title || isNaN(price) || isNaN(stock)) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const newProduct = { title, price, stock };

    // Enviar el producto al servidor vía WebSocket
    socket.emit("addProduct", newProduct);

    // Resetear el formulario
    addProductForm.reset();
});

// Escuchar la actualización de la lista de productos en tiempo real
socket.on("updateProducts", (products) => {
    productList.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("card", "product-card");
        productCard.style.width = "18rem";
        productCard.dataset.id = product._id;

        productCard.innerHTML = `
            <img src="${product.image || "/img/default-product.png"}" class="card-img-top" alt="Product Image">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">💲 ${product.price} - 📦 Stock: ${product.stock}</p>
                <button class="btn btn-danger delete-btn" data-id="${product._id}">Delete</button>
            </div>
        `;

        productList.appendChild(productCard);
    });
});

// 🔴 Mejor manera: Event Delegation para evitar múltiples event listeners
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const productId = event.target.dataset.id;
        if (confirm("¿Seguro que quieres eliminar este producto?")) {
            socket.emit("deleteProduct", productId);
        }
    }
});
