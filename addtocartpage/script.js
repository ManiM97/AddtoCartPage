let cartItems = [];
let cartTotal = 0;
let data;

// Rest of your JavaScript code remains the same

async function fetchProducts() {
    try {
        const response = await fetch('data.json'); // Fetch local JSON file
        data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Rest of the JavaScript code (displayProducts, addToCart, etc.) remains the same

function displayProducts(data) {
    const container = document.getElementById('list');
    data.forEach(product => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="height:200px;width:200px">
            <div class="title">${product.title}</div>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button onclick="addToCart(${product.id})" class="_3v1-ww"><svg class="_1KOMV2" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path class="" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg> Add to cart</button>
            <br>
            <div class="_3LWZlK">${product.rating.rate}<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" class="_1wB99o"></div>
            <span class="_2_R_DZ">(${product.rating.count})</span>
            <div class="description" style="overflow: hidden;">Description : <br/>${product.description}</div>`;
            container.appendChild(newDiv);
    });
}

function addToCart(productId) {
    const selectedProduct = data.find(product => product.id === productId);
    if (!selectedProduct) {
        console.error(`Product with ID ${productId} not found.`);
        return;
    }

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...selectedProduct, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsList = document.getElementById('cart-items');
    cartCount.style.fontSize = "20px";
    cartCount.innerText = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotalElement.innerText = cartTotal.toFixed(2);

    if (cartItems.length > 0) {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            const newCartItem = document.createElement('li');
            newCartItem.style.listStyleType = "none";
            newCartItem.style.padding = "10px";

            //create a image
            const imageElement = document.createElement('img');
            imageElement.src = `${item.image}`;
            imageElement.style.height = "100px";

            // Create a div for item details
            const itemDetailsDiv = document.createElement('div');
            itemDetailsDiv.textContent = `${item.title} - $${item.price.toFixed(2)}`;

            // Create an input field for quantity
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityInput.style.width = "35px";
            quantityInput.style.height = "35px";
            quantityInput.style.textAlign = "center";
            quantityInput.style.margin = "10px";
            quantityInput.addEventListener('change', (event) => {
                const newQuantity = parseInt(event.target.value);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                    item.quantity = newQuantity;
                    updateCart();
                }
            });

            // Create a button to remove the item from the cart
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                cartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                updateCart();
            });

            //create horizontal line element
            const horizontalElement = document.createElement('hr');

            // Append the details, quantity input, and remove button to the cart item
            newCartItem.appendChild(imageElement);
            newCartItem.appendChild(itemDetailsDiv);
            newCartItem.appendChild(quantityInput);
            newCartItem.appendChild(removeButton);
            newCartItem.appendChild(horizontalElement);

            cartItemsList.appendChild(newCartItem);
        });
    } else {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    }
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}

function clearCart() {
    cartItems = [];
    updateCart();
}

fetchProducts();