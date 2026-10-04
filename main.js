// Realistic Product Data
const products = [
  { id: 1, name: "Apple iPhone 15 (Blue, 128 GB)", price: 72999, mrp: 79900, image: "https://via.placeholder.com/200x250/fff/333?text=iPhone+15", category: "Electronics", rating: 4.8 },
  { id: 2, name: "Sony WH-1000XM5 Noise Cancelling Headphones", price: 26990, mrp: 34990, image: "https://via.placeholder.com/200x250/fff/333?text=Sony+XM5", category: "Electronics", rating: 4.7 },
  { id: 3, name: "PUMA Men's Running Shoes", price: 2499, mrp: 4999, image: "https://via.placeholder.com/200x250/fff/333?text=Puma+Shoes", category: "Footwear", rating: 4.2 },
  { id: 4, name: "US Polo Assn. Men's Cotton T-Shirt", price: 699, mrp: 1199, image: "https://via.placeholder.com/200x250/fff/333?text=T-Shirt", category: "Fashion", rating: 4.0 },
  { id: 5, name: "Fastrack Analog Watch for Men", price: 1250, mrp: 1999, image: "https://via.placeholder.com/200x250/fff/333?text=Fastrack+Watch", category: "Accessories", rating: 4.1 },
  { id: 6, name: "ASUS VivoBook 15 Core i5 12th Gen", price: 45990, mrp: 62990, image: "https://via.placeholder.com/200x250/fff/333?text=Asus+Laptop", category: "Electronics", rating: 4.5 }
];

let cart = [];
let wishlist = [];

// DOM Elements
const productsContainer = document.getElementById("products");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");
const totalPriceEl = document.getElementById("total-price");
const searchInput = document.getElementById("search");
const loginModal = document.getElementById("login-modal");

// Initialize
function init() {
  displayProducts(products);
  setupCategoryFilters();
}

// Display Products
function displayProducts(list) {
  productsContainer.innerHTML = "";
  if(list.length === 0) {
    productsContainer.innerHTML = "<h3>No products found!</h3>";
    return;
  }
  
  list.forEach(product => {
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    const isWished = wishlist.includes(product.id) ? 'active' : '';
    
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <button class="wishlist-btn-card ${isWished}" onclick="toggleWishlist(${product.id}, this)">
        <i class="fas fa-heart"></i>
      </button>
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="rating">${product.rating} <i class="fas fa-star" style="font-size:10px;"></i></div>
      <div class="price-container">
        <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
        <span class="mrp">₹${product.mrp.toLocaleString('en-IN')}</span>
        <span class="discount">${discount}% off</span>
      </div>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(div);
  });
}

// Cart Logic
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
    showToast(`Increased quantity of ${product.name}`);
  } else {
    cart.push({ ...product, quantity: 1 });
    showToast(`${product.name} added to cart!`);
  }
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  if(cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;
    
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
        <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:12px; margin-top:5px;">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = totalItems;
  totalPriceEl.textContent = `₹${total.toLocaleString('en-IN')}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  showToast("Item removed from cart");
}

function toggleCartSidebar() {
  cartSidebar.classList.toggle("open");
  cartOverlay.classList.toggle("active");
}

// Wishlist Logic
function toggleWishlist(id, btn) {
  const index = wishlist.indexOf(id);
  if (index > -1) {
    wishlist.splice(index, 1);
    btn.classList.remove("active");
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    btn.classList.add("active");
    showToast("Added to wishlist!");
  }
  wishlistCount.textContent = wishlist.length;
}

function toggleWishlistModal() {
  showToast(`You have ${wishlist.length} items in your wishlist.`);
}

// Search & Filters
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  displayProducts(filtered);
});

function setupCategoryFilters() {
  const tabs = document.querySelectorAll("#category-filter li");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const category = tab.getAttribute("data-category");
      if (category === "all") {
        displayProducts(products);
      } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
      }
    });
  });
}

// Login Modal
document.getElementById("login-btn").addEventListener("click", () => {
  loginModal.classList.add("active");
});

function closeLoginModal() {
  loginModal.classList.remove("active");
}

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  closeLoginModal();
  document.getElementById("login-btn").textContent = "My Account";
  showToast("Logged in successfully!");
});

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
  } else {
    showToast(`Order Placed Successfully! Total: ${totalPriceEl.textContent}`);
    cart = [];
    updateCart();
    toggleCartSidebar();
  }
});

// Toast Notifications
function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Run app
init();
