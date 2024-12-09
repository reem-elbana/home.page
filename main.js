
//flash sales section
const slider = document.getElementById("product-slider");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const viewall = document.querySelector(".view-all-btn");

viewall.addEventListener('click', function() { slider.classList.toggle('hidden'); });

const countdownElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

// Fetch products from the Fake Store API
async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
  
      products.slice(0, 12).forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
  
        // Random discount percentage
        const discount = Math.floor(Math.random() * 30) + 10;
  
        // Calculate discounted price
        const discountedPrice = (product.price - (product.price * discount) / 100).toFixed(2);
  
        productCard.innerHTML = `
          <div class="discount-badge">-${discount}%</div>
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title.substring(0, 25)}...</h3>
          <p class="price">
            <span class="current">$${discountedPrice}</span>
            <span class="original">$${product.price.toFixed(2)}</span>
            <button class=" add-to-cart-btn border-2 px-8 py-1 border rounded-md">Add To Cart</button>

          </p>
        `;
        
        
        slider.appendChild(productCard);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  
  

// Countdown Timer
function startCountdown() {
    const targetDate = new Date("December 31, 2024 23:59:59").getTime();
  
    setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
  
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
      countdownElements.days.textContent = days.toString().padStart(2, "0");
      countdownElements.hours.textContent = hours.toString().padStart(2, "0");
      countdownElements.minutes.textContent = minutes.toString().padStart(2, "0");
      countdownElements.seconds.textContent = seconds.toString().padStart(2, "0");
    }, 1000);
  }


// Slider Navigation
prevBtn.addEventListener("click", () => {
    slider.scrollBy ({left : -200 , behavior :"smooth"});

});

nextBtn.addEventListener ("click" , ()=>{
    slider.scrollBy({left :200 , behavior :"smooth"});
});

// Initialize
fetchProducts();
startCountdown();

//end flash sales section
// ===========================================================================================================
// start best selling section 
const bestSellingSlider = document.getElementById("best-selling-product-slider");

async function fetchLatestProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // Get the last 4 products from the API
    const latestProducts = products.slice(-4).reverse(); // Reverse for proper order (latest first)

    latestProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      // Random discount percentage
      const discount = Math.floor(Math.random() * 30) + 10;

      // Calculate discounted price
      const discountedPrice = (product.price - (product.price * discount) / 100).toFixed(2);

      productCard.innerHTML = `
        <div class="discount-badge">-${discount}%</div>
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title.substring(0, 25)}...</h3>
        <p class="price">
          <span class="current">$${discountedPrice}</span>
          <span class="original">$${product.price.toFixed(2)}</span>
        </p>
        <button class="add-to-cart-btn border-2 px-8 py-1 border rounded-md">Add to Cart</button>
      `;

      bestSellingSlider.appendChild(productCard);
    });
  } catch (error) {
    console.error("Error fetching latest products:", error);
  }
}

// Initialize
fetchLatestProducts();

// end best selling section 

// ================================================================================= 

// start our product section 

document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const productBtn = document.getElementById("product-btn");

  let allProducts = []; // Store all products from the API
  let displayedCount = 8; // Initially show 8 products

  // Fetch data from API
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
      allProducts = data; // Store all products
      renderProducts(allProducts.slice(0, 8)); // Initially render 8 products
    })
    .catch(error => console.error("Error fetching products:", error));

  // Render products
  function renderProducts(products) {
    productGrid.innerHTML += products
      .map(product => createProductCard(product))
      .join("");
  }

  // Create a product card
  function createProductCard(product) {
    return `
      <div class="col-md-3">
        <div class="card position-relative">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          ${product.rating.rate > 4 ? '<span class="new-badge">NEW</span>' : ""}
          <div class="card-body text-center">
            <h5 class="card-title">${product.title.substring(0, 25)}</h5>
            <button class="btn add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }

  // Event listener for the button
  productBtn.addEventListener("click", () => {
    const remainingProducts = allProducts.length - displayedCount;
    if (remainingProducts > 0 && displayedCount === 8) {
      const nextProducts = allProducts.slice(displayedCount, displayedCount + 4); // Fetch the next 4 products
      renderProducts(nextProducts);
      displayedCount += 4;
    }
    productBtn.disabled = false; // Disable the button after loading 4 more products
  }); 
});


// end our product section 
