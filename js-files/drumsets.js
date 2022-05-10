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
                                <div class="action">
                                    <p>${data[i].stock === true ? 'In stock' : 'Out of stock'}</p>
                                    <a class="compare_btn">
                                        <i class="fa-regular fa-copy"></i>
                                    </a>
                                    <a class="wish_list_btn">
                                        <i class="fa-regular fa-heart"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="price">
                                <span class="product_price">€ ${data[i].price}</span>
                                <a href="#" class="shop open_cart" data-cart="add_to_cart_btn">
                                    <i class="fas fa-cart-arrow-down"></i></i>
                                </a>
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
                    alert(`One ${data[i].name} added to cart`);
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

                        if(checkBox.checked && productStock === 'Out of stock') {
                            product.classList.add('in_stock');
                        } else if (!checkBox.checked && productStock === 'Out of stock') {
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

            ///////////////////////////////////////////////////////////////////
            /////////////////////// Compare products //////////////////////////

            const itemDiv = document.createElement('div');
                itemDiv.innerHTML +=  `
                        <div class="product_compare_box">
                            <button class="close_box_btn">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                            <h3>Compare products</h3>
                            <div class="comparison_content">
                                <div class="products_container">
                                
                                </div>
                                <div class="box_btns_cont">
                                    <button class="compare_products btn">Compare</button>
                                    <button class="remove_products btn">Remove all</button>
                                </div>
                            </div>
                        </div>
                    `

            document.body.insertAdjacentElement('beforeend', itemDiv);

            //////////////////////////// Add Item //////////////////////////

            const addItemBtn = document.querySelectorAll('.compare_btn');            
            let arr = [];
            
            addItemBtn.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector('.product_compare_box').classList.add('show_up');
                    
                    let targetName = e.target.closest('.description').firstElementChild.innerHTML;
                    
                    for(let i=0 ; i<data.length ; i++) {
                        if(data[i].name === targetName && arr.length <= 2) {
                            arr.push(targetName);
                            setCompareItems(data[i]);
                            displayItems();
                            removeAllItems();
                        };                        
                    };
                });
            });            
            
            // -------------------- setItems -------------------
            function setCompareItems(item) {
                let compareItems = JSON.parse(localStorage.getItem('compareItems'));

                if(compareItems != null){
                    if(compareItems[item.name] == undefined) {
                        compareItems = {
                            ...compareItems,
                            [item.name]: item
                        };
                    };
                    compareItems[item.name].inBox += 1;
                } else {
                    item.inBox = 1
                    compareItems = {
                        [item.name]: item
                    };
                };
                localStorage.setItem('compareItems', JSON.stringify(compareItems));
            };
            
            // -------------------- Display Item -------------------
            function displayItems() {
                let compareItems = JSON.parse(localStorage.getItem('compareItems'));

                const itemBox = document.querySelector('.products_container');
                if(compareItems) {
                    itemBox.innerHTML = ``;
                    Object.values(compareItems).map(item => {
                        itemBox.innerHTML += `
                            <div class="selected_item">
                                <div class="selected_item_img_box">
                                    <img src="${item.image}">
                                </div>
                                <span class="selected_item_name">${item.name}</span>
                                <div  class="itemDescription">
                                    <p>${item.category}</p>
                                    <p>${item.brand}</p>
                                    <p>${item.material}</p>
                                    <hr>
                                    <p>€ ${item.price}</p>
                                    <hr>
                                    <p>${item.description[0]}</p>
                                    <p>${item.description[1]}</p>
                                    <p>${item.description[2]}</p>
                                    <p>${item.description[3]}</p>
                                    <!--<p class="desc">${item.description}</p>-->
                                    <hr>
                                    <p>${item.woodPly}</p>
                                    <p>${item.edges}</p>
                                </div>
                                <button class="remove_box_btn">Remove</button>
                            </div>
                            ` 
                        removeBoxItem();
                    });
                };
            };            

            // -------------------- Remove Item from Box -------------------
            function removeBoxItem() {
                let compareItems = JSON.parse(localStorage.getItem('compareItems'));

                const removeItemBtn = document.querySelectorAll('.remove_box_btn');
                let comparedItem;               
                for(let i=0; i < removeItemBtn.length; i++) {
                    removeItemBtn[i].addEventListener('click', (e) => {
                        e.preventDefault();
                        comparedItem = removeItemBtn[i].previousElementSibling.previousElementSibling.textContent;
                        
                        delete compareItems[comparedItem];
                        localStorage.setItem('compareItems', JSON.stringify(compareItems));

                        arr.filter(function(value, index, arr){
                            if(comparedItem === value) 
                                arr.splice(index, 1)
                            });

                        displayItems();                        
                    });
                };
            };
            
            // -------------------- Remove All Items -------------------
            function removeAllItems() {
                document.querySelector('.remove_products').addEventListener('click', (e)=> {
                    e.preventDefault();
                    
                    const itemBox = document.querySelector('.products_container').innerHTML = '';
                    localStorage.removeItem("compareItems");
                    arr = [];
                    document.querySelector('.compare_products').textContent = "Compare";

                    displayItems();
                });                
            };

            // ------------------------ Toggle Contant ------------------------
            document.querySelector('.compare_products').addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.itemDescription').forEach(d => {
                    d.classList.toggle('read');
                    const compareBtn = document.querySelector('.compare_products');
                    d.classList.contains('read') ? compareBtn.textContent = "Minimize" : compareBtn.textContent = "Compare";
                });
            });

            // -------------------- Close Modal -------------------
            document.querySelector('.close_box_btn').addEventListener('click', () => {
                document.querySelector('.product_compare_box').classList.remove('show_up');
            });

            
            ///////////////////////////////////////////////////////////////////
            /////////////////////// Wish List //////////////////////////
                        
            document.querySelectorAll('.wish_list_btn').forEach((btn, i) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    let targetName = e.target.closest('.description').firstElementChild.innerHTML;
                    
                    for(let i=0 ; i<data.length ; i++) {
                        if(data[i].name === targetName) {
                            setWishListItems(data[i]);
                            displayWishListItem();
                            removeAllWishListItems();
                        };                    
                    };
                });
            });

            // // -------------------- setItems -------------------
            function setWishListItems(item) {
                let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));

                if(wishListItems != null){
                    if(wishListItems[item.name] == undefined) {
                        wishListItems = {
                            ...wishListItems,
                            [item.name]: item
                        };
                    };
                    wishListItems[item.name].inBox += 1;
                } else {
                    item.inBox = 1
                    wishListItems = {
                        [item.name]: item
                    };
                };
                localStorage.setItem('wishListItems', JSON.stringify(wishListItems));
            };

            // -------------------- Display Item -------------------
            function displayWishListItem() {
                let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));

                const wishListItemsContainer = document.querySelector('.wish_list_content');
                if(wishListItems) {
                    wishListItemsContainer.innerHTML = ``;
                    Object.values(wishListItems).map(item => {
                    wishListItemsContainer.innerHTML +=  `
                                <div class="wish_list_box">
                                    <button class="remove_wl_item_btn">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                    <div class="wish_content_container">
                                        <div class="img_container">
                                            <img class="product_img" src="${item.image}">
                                        </div>
                                        <div class="info_container">
                                            <a class="card_btn open_prod_modal product_name" data-product-target="#productModal">${item.name}</a>
                                            <div class="shop_container">
                                                <button class="add_cart_btn" data-cart="add_to_cart_modal_btn">
                                                    Add to cart
                                                </button>
                                                <a href="/pages/cart.html" class="open_cart_btn">
                                                    Go to cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                        removeWishListItem();
                    });
                };
            };

            // -------------------- Remove Wish List Item -------------------
            function removeWishListItem() {
                let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));

                const removeItemBtn = document.querySelectorAll('.remove_wl_item_btn');

                let item;               
                for(let i=0; i < removeItemBtn.length; i++) {
                    removeItemBtn[i].addEventListener('click', (e) => {
                        e.preventDefault();
                        item = removeItemBtn[i].nextElementSibling.children[1].firstChild.nextSibling.textContent;

                        delete wishListItems[item];
                        localStorage.setItem('wishListItems', JSON.stringify(wishListItems));

                        displayWishListItem();                     
                    });
                };
            };
            removeWishListItem();

            // -------------------- Remove All Wish List Items -------------------
            function removeAllWishListItems() {
                document.querySelector('.remove_all_wl').addEventListener('click', (e)=> {
                    e.preventDefault();
                    
                    const itemBox = document.querySelector('.products_container').innerHTML = '';
                    localStorage.removeItem("wishListItems");
                    
                    // document.querySelector('.compare_products').textContent = "Compare";

                    displayWishListItem();
                });                
            };

            function init() {
                displayItems();
                displayWishListItem();
                
            };
            init();
        });
        
};
drumsets();
