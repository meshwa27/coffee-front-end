const merchProducts = document.querySelector("#merchProducts")
const countMerchProduct = document.querySelector("#merchProduct-count")
let allData = []

function fetchMerchData(){
    fetch("https://coffee-back-end.onrender.com/mearch")
        .then((res) => res.json())
        .then((data) => {
            countMerchProduct.innerText = data.length
            allData = data
            allMerchProducts(data)
        })
        .catch((err) => console.log(err))
}
fetchMerchData()

function merchProduct(name, image, price, id, description, rating, star){
    let div = `
    <div class="col-12 col-sm-12 col-md-4 col-lg-3 mb-4">
        <div id="product-card">
            <div id="image" class="mb-2">
               <a href="description.html?title=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&id=${encodeURIComponent(id)}&star=${encodeURIComponent(star)}&rating=${encodeURIComponent(rating)}">
                   <img src="${image}" alt="" class="img-fluid" data-id="${id}" class="merch-Data">
                </a>
            </div>
            
                <p id="name" class="m-0">
                   <a href="description.html?title=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&id=${encodeURIComponent(id)}&star=${encodeURIComponent(star)}&rating=${encodeURIComponent(rating)}" class="merch-Data" style=" text-align: left;">${name}</a>
                </p>
                <p id="regular-price" class="m-0">$${price}</p>
                <p id="rating" class="m-0 text-white">
                   <span id="star" class="fs-5">${star}</span> ${rating}
                </p>
                <button data-id="${id}" id="add-cart" class="addMerchDataButton">Add to Cart <i class="ri-shopping-cart-2-line" id="cartIcon"></i></button>
           
        </div>
    </div>
    `
    return div
}

function allMerchProducts(arrayData){
    let storeMerchData = arrayData.map((element) => merchProduct(element.name, element.image, element.price, element.id, element.description, element.rating, element.star))
    merchProducts.innerHTML = storeMerchData.join("")
}

// for Filter Data
const features = document.querySelector("#featured")
const bestSelling = document.querySelector("#bestSelling")
const sortAtoZ = document.querySelector("#sortAtoZ")
const sortZtoA = document.querySelector("#sortZtoA")
const priceLowToHigh = document.querySelector("#lowToHigh")
const priceHighToLow = document.querySelector("#HighToLow")

features.addEventListener("click", () => {
    let storeFeatureData = allData.sort((a,b) => a.id - b.id)
    allMerchProducts(storeFeatureData)
})

bestSelling.addEventListener("click", () => {
    let storeBestSelling = allData.sort((a,b) => {
        return b.star - a.star
    })
    allMerchProducts(storeBestSelling)
})

sortAtoZ.addEventListener("click", () => {
    let storeAtoZData =  allData.sort((a,b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()){
            return 1
        }
        return 0
    })
    allMerchProducts(storeAtoZData)
})

sortZtoA.addEventListener("click", () => {
    let storeZtoAData = allData.sort((a,b) => {
        if(b.name.toLowerCase() < a.name.toLowerCase()){
            return -1
        }
        if(b.name.toLowerCase() > a.name.toLowerCase()){
            return 1
        }
        return 0
    })
    allMerchProducts(storeZtoAData)
})

priceLowToHigh.addEventListener("click", () => {
    let storeFilterData = allData.sort((a,b) => a.price - b.price)
    allMerchProducts(storeFilterData)
})

priceHighToLow.addEventListener("click", () => {
    let storeFilterData = allData.sort((a,b) => b.price - a.price)
    allMerchProducts(storeFilterData)
})