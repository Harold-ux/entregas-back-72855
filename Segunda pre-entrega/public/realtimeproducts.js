const socket = io();

const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("productList");

addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!title || isNaN(price) || isNaN(stock)) {
        alert("All fields are required.");
        return;
    }

    const newProduct = { title, price, stock };

    socket.emit("addProduct", newProduct);

    addProductForm.reset();
});

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

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const productId = event.target.dataset.id;
        if (confirm("Are you sure you want to delete this product?")) {
            socket.emit("deleteProduct", productId);
        }
    }
});
