'use strict'

const heroImages = function() {
    fetch('/json-files/cards-products.json')
        .then(results => results.json())
        .then(data => {
            const imageBox = document.querySelector('.image_slider_box');
            for(let i=0; i<3; i++) {
                imageBox.innerHTML +=  `
                    <img class="slide_img" src="${data[i].image}">
                    `
            };
            const slideImgs = document.querySelectorAll(".slide_img");
            const nextImgDelay = 5000;
            let imgCounter = 0;

            slideImgs[imgCounter].style.opacity = 1;

            setInterval(nextImage, nextImgDelay);

            function nextImage() {
                slideImgs[imgCounter].style.opacity = 0;

                imgCounter = (imgCounter+1) % slideImgs.length;

                slideImgs[imgCounter].style.opacity = 1;
            };
        });
};
heroImages();

///////////////////////////////// PRODUCTS ////////////////////////////////////

const drumsets = function() {
    fetch('/json-files/cards-products.json')
        .then(results => results.json())
        .then(data => {
            const itemContainer = document.querySelector('.products');
            for(let i=0; i<data.length; i++) {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML +=  `
                        <div class="product_container product"
                                data-category="${data[i].category}" 
                                data-brand="${data[i].brand}"
                                data-material="${data[i].material}">
                            <div class="img_container">
                                <img class="product_img" src="${data[i].image}" alt="">
                            </div>
                            <div class="description">
                                <a class="card_btn open_prod_modal product_name" data-product-target="#productModal">${data[i].name}</a>
                                <ul>
                                    <li>${data[i].category}</li>
                                    <li>${data[i].brand}</li>
                                    <li>${data[i].material}</li>
                                    <li>${data[i].color}</li>
                                </ul>
                                <p>${data[i].stock === true ? 'In stock' : 'Available soon'}</p>
                            </div>
                            <div class="price">
                                <span class="product_price">€ ${data[i].price}</span>
                                <a href="#" class="shop open_cart" data-cart="add_to_cart_btn"><ion-icon name="cart-outline"></ion-icon></a>
                            </div>
                        </div>
                    `

                itemContainer.insertAdjacentElement('beforeend', itemDiv);
            }            

            const stock = document.querySelectorAll('.description p');
                
            for(let p of stock) {
                if(p.textContent === 'In stock') {
                    p.classList.add('green');
                } else {
                    p.classList.add('yellow');
                };
            };

            ////////////////////////////////////// Add To Cart ///////////////////////////////////////////////
            
            const addToCartBtn = document.querySelectorAll('[data-cart="add_to_cart_btn"]');
            
            addToCartBtn.forEach((btn, i) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    cartNumbers(data[i]);
                    totalCost(data[i]);
                    alert(`One ${data[i].name} addet to cart`);
                });
            });

            function onLoadCartNumbers() {
                let productNumbers = localStorage.getItem('cartNumbers');
                
                if( productNumbers >= 1 ) {
                    span(productNumbers) ;
                } else {
                    document.querySelectorAll('.shop span').forEach(s => {
                        s.style.display = "none";
                    });
                };
            };
            
            // -------------------- cartNumbers -------------------
            function cartNumbers(product) {
                let productNumbers = localStorage.getItem('cartNumbers');
                productNumbers = parseInt(productNumbers);
                
                if(productNumbers) {
                    localStorage.setItem('cartNumbers', productNumbers + 1);
                    span(productNumbers + 1) ;
                } else {
                    localStorage.setItem('cartNumbers', 1);
                    span(1); 
                };
                
                setItems(product);
            };

            // -------------------- setItems -------------------
            function setItems(product) {
                let cartItems = localStorage.getItem('productsInCart');
                cartItems = JSON.parse(cartItems);
                
                if(cartItems != null){
                    if(cartItems[product.name] == undefined) {
                        cartItems = {
                            ...cartItems,
                            [product.name]: product
                        };
                    };
                    cartItems[product.name].inCart += 1
                } else {
                    product.inCart = 1
                    cartItems = {
                        [product.name]: product
                    };
                };
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            };
          
            // -------------------- SPAN -------------------
            function span(number) {
                let productNumbers = localStorage.getItem('cartNumbers');
                productNumbers = parseInt(productNumbers);
                const numSpan = document.querySelectorAll('.shop span');
                
                numSpan.forEach(s => {
                    if(productNumbers == 0) {
                        s.style.display = "none";
                    } else {
                        s.style.display = "block";
                        s.textContent = `${number}`;
                    };
                });
            };


            // -------------------- totalCost -------------------
            function totalCost(product) {
                let cartCost = localStorage.getItem("totalCost");
                
                if(cartCost != null) {
                    cartCost = parseInt(cartCost);
                    localStorage.setItem("totalCost", cartCost + product.price);
                } else {
                    cartCost = parseInt(cartCost);
                    localStorage.setItem("totalCost", product.price);
                }                
            }


            /////////////////////////////////// Filters //////////////////////////////////////////
        
            let arrCategory = [];
            let arrBrand = [];
            let arrMaterial = [];
            
            for(let i=0; i<data.length; i++) {
                arrCategory.push(data[i].category);
                arrBrand.push(data[i].brand);
                arrMaterial.push(data[i].material);
            };

            function unique(arr) {
                return arr.filter((el, i) => arr.indexOf(el) === i);
            };
            
            let unique1 = unique(arrCategory);
            let unique2 = unique(arrBrand);
            let unique3 = unique(arrMaterial);
            
            unique1.forEach(el => {
                let cat1 = `<option value="${el}">${el}</option>`;
                document.querySelector(".filter_category").insertAdjacentHTML("beforeend", cat1);
            });
            unique2.forEach(el => {
                let cat2 = `<option value="${el}">${el}</option>`;
                document.querySelector(".filter_brand").insertAdjacentHTML("beforeend", cat2);
            });
            unique3.forEach(el => {
                let cat3 = `<option value="${el}">${el}</option>`;
                document.querySelector(".filter_material").insertAdjacentHTML("beforeend", cat3);
            });
      
            let filtersObject = {};
            
            document.querySelectorAll('.filter').forEach(el => {
                el.addEventListener('change', function(e) {
                    e.preventDefault();
                    let filterName = this.dataset.filter;
                    let filterVal = this.value;
                    
                    if(filterVal == "") {
                        delete filtersObject[filterName];
                    } else {
                        filtersObject[filterName] = filterVal;
                    };
                                    
                    let filters = "";
        
                    for(var key in filtersObject) {
                        if(filtersObject.hasOwnProperty(key)) {
                            filters += `[data-${key}="${filtersObject[key]}"]`;
                        };
                    };
                                    
                    const show = function(elem) {
                        showProducts(elem);
                        sort();
                    };
                    const hide = function(elem) {
                        hideProducts(elem);
                    };

                    if(filters === "") {
                        document.querySelectorAll(".product_container").forEach(el => {
                            show(el);
                        });
                    } else {
                        document.querySelectorAll(".product_container").forEach(el => {
                            hide(el);
                        });
                        document.querySelectorAll(filters).forEach(el => {
                            show(el);
                        });
                    };
                });
            });

            ////////////////////////////////// Search products ///////////////////////////////////

            document.querySelector('.submit_search_btn').addEventListener('click', (e) => {
                e.preventDefault();

                let searchValue = document.querySelector('#productSearch').value.toLowerCase();
                
                const show = function(elem) {
                    showProducts(elem);
                };
                const hide = function(elem) {
                    hideProducts(elem);
                };

                document.querySelectorAll(".product_container").forEach(el => {
                    hide(el);
                });
                document.querySelectorAll(".product_container").forEach(function(el) {
                    let category = el.dataset.category.toLowerCase();
                    let brand = el.dataset.brand.toLowerCase();
                    let material = el.dataset.material.toLowerCase();
                    
                    if(category.indexOf(searchValue) > -1 || brand.indexOf(searchValue) > -1 || material.indexOf(searchValue) > -1) {
                        show(el);
                        console.log(el);
                    };
                })
            })

            function showProducts(elem) {
                elem.parentElement.classList.remove('show_div');
            };

            function hideProducts(elem) {
                elem.parentElement.classList.add('show_div');
            };

            //////////////////////////////// In stock ////////////////////////////////

            function inStock() {
                const checkBox = document.querySelector('#check');
                const products = document.querySelectorAll('.products > div');
                
                checkBox.addEventListener('change', (e) => {
                    e.preventDefault();
                    
                    for(const product of products) {
                        let productStock = product.querySelector('.description p').textContent.trim();

                        if(checkBox.checked && productStock === 'Available soon') {
                            product.classList.add('in_stock');
                        } else if (!checkBox.checked && productStock === 'Available soon') {
                            product.classList.remove('in_stock');
                        };
                    };
                });                
            };
            inStock();

            //////////////////////////////// Sorting Items /////////////////////////////
            
            const sortSelect = document.querySelector('.sort_products_container select');
            
            function sort() {
                sortSelect.addEventListener('change', function() {
                    let productDivs = itemContainer.children;
                    let productArr = [];
                    for (let i = 0; i < productDivs.length; i++) {
                        productArr.push(productDivs[i]);
                    };

                    if(this.value === "high_low") {
                        function sortByPriceDes(a, b) {
                            let p1 = parseFloat(a.querySelector('.product_price').textContent.replace('€', '').trim()),
                                p2 = parseFloat(b.querySelector('.product_price').textContent.replace('€', '').trim());
                            return p2 - p1
                        };

                        productArr.sort(sortByPriceDes);
                        appendDivs();
                    };

                    if(this.value === "low_high") {
                        function sortByPriceAsc(a, b) {
                            let p1 = parseFloat(a.querySelector('.product_price').textContent.replace('€', '').trim()),
                                p2 = parseFloat(b.querySelector('.product_price').textContent.replace('€', '').trim());
                            return p1 - p2
                        };

                        productArr.sort(sortByPriceAsc);
                        appendDivs();
                    };

                    if(this.value === "a_z") {
                        function sortByNameAsc(a, b) {
                            let n1 = a.querySelector('.product_name').textContent.toLowerCase().trim().replace(/ +/g,""),
                                n2 = b.querySelector('.product_name').textContent.toLowerCase().trim().replace(/ +/g,"");
                            return n1 < n2 ? -1 : 0
                        };

                        productArr.sort(sortByNameAsc);
                        appendDivs();
                    };

                    if(this.value === "z_a") {
                        function sortByNameDes(a, b) {
                            let n1 = a.querySelector('.product_name').textContent.toLowerCase().trim().replace(/ +/g,""),
                                n2 = b.querySelector('.product_name').textContent.toLowerCase().trim().replace(/ +/g,"");
                            return n1 > n2 ? -1 : 0
                        };

                        productArr.sort(sortByNameDes);
                        appendDivs();
                    };

                    function appendDivs(){
                        for (let i=0; i < productArr.length; i++) {
                            itemContainer.appendChild(productArr[i]);
                        };
                    };
                });
            };
            sort();
            onLoadCartNumbers();
        });
};
drumsets();
