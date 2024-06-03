const allProducts = document.querySelector("#allProducts");
const countProducts = document.querySelector("#product-count");
let allData = [];

function fetchdata() {
    fetch("https://coffee-back-end.onrender.com/product")
        .then((res) => res.json())
        .then((data) => {
            allData = data; // Store the fetched data for sorting later
            cardlist(data);
        })
        .catch((err) => console.log(err));
}

fetchdata();

function cardlist(data) {
    const store = data.map((el) => product(el.name, el.image_url, el.regular_price, el.star, el.rating, el.id, el.description));
    allProducts.innerHTML = store.join("");
    countProducts.innerHTML = `Total Products: ${data.length}`;
}

function product(name, image_url, regular_price, star, rating, id, description) {
    return `
        <div class="col-4 col-sm-6 col-md-4 col-lg-3 mb-4">
        <a href="description.html?title=${encodeURIComponent(name)}&price=${encodeURIComponent(regular_price)}&image=${encodeURIComponent(image_url)}&description=${encodeURIComponent(description)}&star=${encodeURIComponent(star)}&rating=${encodeURIComponent(rating)}&id=${encodeURIComponent(id)}">

            <div class="product-card">
                <div id="image" class="mb-2">
                    <img src="${image_url}" alt="" class="img-fluid" data-id="${id}">
                </div>
                <p id="name" class="m-0">${name}</p>
                <p id="regular-price" class="m-0">$${regular_price}</p>
                <p id="rating" class="m-0 text-white">
                    <span id="star" class="fs-5">${star}</span> ${rating}
                </p>
                <button data-id="${id}" id="addtocart" class="addCoffeeDataButton btn btn-primary mt-2">
                    Add to Cart <i class="ri-shopping-cart-2-line" id="cartIcon"></i>
                </button>
            </div>
            </a>
        </div>

    `;
}

const priceLowToHigh = document.querySelector("#lowToHigh");
const priceHighToLow = document.querySelector("#HighToLow");

priceLowToHigh.addEventListener("click", () => {
    let storeFilterData = [...allData].sort((a, b) => a.regular_price - b.regular_price);
    cardlist(storeFilterData);
});

priceHighToLow.addEventListener("click", () => {
    let storeFilterData = [...allData].sort((a, b) => b.regular_price - a.regular_price);
    cardlist(storeFilterData);
});
