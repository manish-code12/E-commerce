const products = [
  {id:1,name:"T-Shirt",price:0,image:"https://via.placeholder.com/200x180?text=T-Shirt",category:"Clothes",rating:4},
  {id:2,name:"Jeans",price:0,image:"https://via.placeholder.com/200x180?text=Jeans",category:"Clothes",rating:5},
  {id:3,name:"Shoes",price:0,image:"https://via.placeholder.com/200x180?text=Shoes",category:"Shoes",rating:4},
  {id:4,name:"Cap",price:0,image:"https://via.placeholder.com/200x180?text=Cap",category:"Accessories",rating:3},
  {id:5,name:"Bag",price:0,image:"https://via.placeholder.com/200x180?text=Bag",category:"Accessories",rating:5},
  {id:6,name:"Watch",price:0,image:"https://via.placeholder.com/200x180?text=Watch",category:"Accessories",rating:4}
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const total = document.getElementById("total");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");

function displayProducts(list){
  productsContainer.innerHTML = "";
  list.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <div class="rating">${"★".repeat(product.rating)}${"☆".repeat(5-product.rating)}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="wishlist" onclick="toggleWishlist(this)">❤</button>
    `;
    productsContainer.appendChild(div);
  });
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  updateCart();
}

function updateCart(){
  cartItems.innerHTML = "";
  let sum=0;
  cart.forEach(item=>{
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    sum+=item.price;
  });
  cartCount.textContent = cart.length;
  total.textContent = sum;
}

document.getElementById("checkout").addEventListener("click",()=>{
  if(cart.length===0){ alert("Cart empty!"); }
  else{
    alert("Checkout successful! Total: $"+cart.reduce((s,i)=>s+i.price,0));
    cart=[];
    updateCart();
  }
});

function toggleWishlist(btn){
  btn.classList.toggle("active");
}

// Search and Category Filter
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

function filterProducts(){
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const filtered = products.filter(p=>{
    return (p.name.toLowerCase().includes(searchTerm)) && (category==="all" || p.category===category);
  });
  displayProducts(filtered);
}

displayProducts(products);