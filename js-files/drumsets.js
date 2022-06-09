'use strict'

import { setingItem, cartNumbers, span, totalCost, setListItems, prodPopMod } from "./lib.js";

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
            const nextImgDelay = 3000;
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

///////////////////////////////////// PRODUCTS /////////////////////////////////////

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
                                    <span>You have to be loged in</span>
                                    <i class="fa-regular fa-heart"></i>
                                    <i class="fa-solid fa-heart"></i>
                                </a>
                            </div>
                        </div>
                        <div class="price">
                            <span class="product_price">€ ${data[i].price}</span>
                            <a class="shop open_cart" data-cart="add_to_cart_btn">
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

            const hearts = document.querySelectorAll('.fa-heart');
            for(let h of hearts) {
                if(localStorage.getItem('logedUser') == null) {
                    h.style.color = 'rgba(59, 59, 59, 0.5)';
                    h.addEventListener('mouseover', (e) => {
                        e.target.previousElementSibling.classList.add('show-span');
                    })
                    h.addEventListener('mouseout', (e) => {
                        e.target.previousElementSibling.classList.remove('show-span');
                    })
                } else {
                    h.style.color = '$product-box-shadow';
                };
            };

            let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));
            if(wishListItems && localStorage.getItem('logedUser') != null) {
                Object.values(wishListItems).map(el => {
                    let children = document.querySelectorAll('.description');
                    for(let ch of children) {
                        if(el.name === ch.firstElementChild.textContent) {
                            ch.children[2].children[2].children[1].style.display = 'none';
                            ch.children[2].children[2].children[2].classList.add('showHeart');
                        };
                    };
                });
            }

            ///////////////////////////////////// Add To Cart /////////////////////////////////////
      
            const addToCartBtn = document.querySelectorAll('[data-cart="add_to_cart_btn"]');
            
            addToCartBtn.forEach((btn, i) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault()
                    if(localStorage.getItem('logedUser') == null) {
                        setCartNumbers(data[i]);
                        setTotalCost(data[i]);
                        prodPopMod(data[i].name);
                    } else {
                        setCartNumbers(data[i]);
                        setTotalCost(data[i]);
                        prodPopMod(data[i].name);
                    };
                });
            });

            ///////////////////////////////////// On Load Cart Numbers /////////////////////////////////////
            function setOnLoadCartNumbers() {
                if(localStorage.getItem('logedUser') == null) {
                    let productNumbers = localStorage.getItem('localCartNumbers');
                    onLoadCartNumbers(productNumbers)
                } else {
                    let productNumbers = localStorage.getItem('userCartNumbers');
                    onLoadCartNumbers(productNumbers) 
                }
            }

            function onLoadCartNumbers(productNumbers) {
                if(productNumbers >= 1) {
                    setSpan(productNumbers);
                } else {
                    document.querySelectorAll('.shop span').forEach(s => {
                        s.style.display = "none";
                    });
                };
            };
            
            ///////////////////////////////////// cart Numbers /////////////////////////////////////
            function setCartNumbers(product) {
                if(localStorage.getItem('logedUser') == null) {
                    let productNumbers = parseInt(localStorage.getItem('localCartNumbers'));
                    let key = 'localCartNumbers';
                    cartNumbers(product, productNumbers, key);
                } else {
                    let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
                    let key = 'userCartNumbers';
                    cartNumbers(product, productNumbers, key);
                };
            };

            function cartNumbers(product, productNumbers, key) {
                if(productNumbers) {
                    localStorage.setItem(key, productNumbers + 1);
                    setSpan(productNumbers + 1) ;
                } else {
                    localStorage.setItem(key, 1);
                    setSpan(1); 
                };                
                setItems(product);
            };

            ///////////////////////////////////// set Items /////////////////////////////////////
            function setItems(product) {
                if(localStorage.getItem('logedUser') == null) { 
                    let cartItems = JSON.parse(localStorage.getItem('localProductsInCart'));
                    const key = 'localProductsInCart';
                    setingItem(product, cartItems, key);
                } else if(localStorage.getItem('logedUser') != null && !document.querySelector('.user_page').classList.contains('open_user_modal')){
                    let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
                    const key = 'userProductsInCart';
                    setingItem(product, cartItems, key);
                };
            };
          
            ///////////////////////////////////// SPAN /////////////////////////////////////            
            function setSpan(number) {
                if(localStorage.getItem('logedUser') == null) { 
                    let productNumbers = parseInt(localStorage.getItem('localCartNumbers'));
                    span(number, productNumbers);
                } else {
                    let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
                    span(number, productNumbers);
                };
            };

            ///////////////////////////////////// totalCost /////////////////////////////////////
            function setTotalCost(product) {
                if(localStorage.getItem('logedUser') == null) { 
                    let cartCost = localStorage.getItem('localTotalCost');
                    const tcKey = "localTotalCost";
                    totalCost(product, cartCost, tcKey);
                } else {
                    let cartCost = localStorage.getItem('userTotalCost');
                    const tcKey = "userTotalCost";
                    totalCost(product, cartCost, tcKey);
                };
            };

            ///////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// Filters /////////////////////////////////////        
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

            ///////////////////////////////////// Search products /////////////////////////////////////

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

            ///////////////////////////////////// In stock /////////////////////////////////////

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

            ///////////////////////////////////// Sorting Items /////////////////////////////////////
            
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

            ////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// Compare products /////////////////////////////////////

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

            ///////////////////////////////////// Add Item /////////////////////////////////////

            document.querySelectorAll('.compare_btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    document.querySelector('.product_compare_box').classList.add('show_up');
                    let compareItems = JSON.parse(localStorage.getItem('compareItems'));
                    let targetName = e.target.closest('.description').firstElementChild.innerHTML;
                    if(compareItems) {
                        if(Object.values(compareItems).length >= 3) return;
                    }
                    for(let i=0 ; i<data.length ; i++) {
                        if(data[i].name === targetName) {
                            setCompareItems(data[i]);
                            displayItems();
                            removeBoxItem();
                            removeAllItems();
                        };                        
                    };
                });
            });            
            
            ///////////////////////////////////// setItems /////////////////////////////////////
            function setCompareItems(item) {
                let storageItems = JSON.parse(localStorage.getItem('compareItems'));
                const key = 'compareItems';
                setListItems(item, storageItems, key);
            };

            ///////////////////////////////////// Display Item /////////////////////////////////////
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
                        removeAllItems();
                        closeCompareModal();
                    });
                };
            };

            ///////////////////////////////////// Toggle Contant /////////////////////////////////////
            function toggleItems() {
                // let compareItems = JSON.parse(localStorage.getItem('compareItems'));
                document.querySelector('.compare_products').addEventListener('click', () => {                    
                    // if(Object.values(compareItems).length != 0 || Object.values(compareItems).length != null) {
                        document.querySelectorAll('.itemDescription').forEach(d => {
                            if(d.classList.contains('read')) {
                                d.classList.remove('read');
                                document.querySelector('.compare_products').textContent = "Compare";
                            } else {
                                d.classList.add('read');
                                document.querySelector('.compare_products').textContent = "Minimize";
                            };
                        });
                    // };
                });
            };
            toggleItems();

            ///////////////////////////////////// Remove Item from Box /////////////////////////////////////
            function removeBoxItem() {
                let compareItems = JSON.parse(localStorage.getItem('compareItems'));
                const removeItemBtn = document.querySelectorAll('.remove_box_btn');
                let comparedItem;
                
                for(let i=0; i < removeItemBtn.length; i++) {
                    removeItemBtn[i].addEventListener('click', (e) => {
                        document.querySelector('.compare_products').textContent = "Compare";
                        comparedItem = removeItemBtn[i].previousElementSibling.previousElementSibling.textContent;
                        delete compareItems[comparedItem];
                        localStorage.setItem('compareItems', JSON.stringify(compareItems));
                        displayItems();
                        displayMessage();                        
                    });
                };
            };

            ///////////////////////////////////// Remove All Items /////////////////////////////////////
            function removeAllItems() {
                document.querySelector('.remove_products').addEventListener('click', ()=> {
                    localStorage.setItem('compareItems', JSON.stringify({}));
                    displayItems();
                    displayMessage();
                });                
            };

            ///////////////////////////////////// Display empty box message /////////////////////////////////////
            function displayMessage() {
                let compareItems = JSON.parse(localStorage.getItem('compareItems'));
                if(compareItems){
                    if(Object.values(compareItems).length == 0) {
                        document.querySelector('.products_container').innerHTML = `
                                    <span class="chose_text">Chose products to compare</span>
                                `
                        document.querySelector('.compare_products').textContent = "Compare";
                    };
                };
            };

            ///////////////////////////////////// Close Modal /////////////////////////////////////
            function closeCompareModal() {
                document.querySelector('.close_box_btn').addEventListener('click', () => {
                    document.querySelector('.product_compare_box').classList.remove('show_up');
                    document.querySelector('.compare_products').textContent = "Compare";
                    displayItems();
                });
            };

            /////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// Wish List /////////////////////////////////////
            function wishList() {        
                const parentDiv = document.querySelectorAll('.description');                
                let wishListNumbers = JSON.parse(localStorage.getItem('wishListNumbers'));
                let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));
                
                parentDiv.forEach(p => {
                    p.querySelector('.wish_list_btn').addEventListener('click', (e) => {                        
                        let targetName = p.firstElementChild.textContent;
                        
                        if(p.querySelector('.fa-solid.fa-heart').classList.contains('showHeart')) {                            
                            removeWishListItem(targetName);
                            p.querySelector('.fa-regular.fa-heart').style.display = 'block';
                            p.querySelector('.fa-solid.fa-heart').classList.remove('showHeart');
                        } else {
                            
                            if(wishListNumbers == null || Object.values(wishListItems).length == 0) { 
                                setTarget(targetName);    
                                p.querySelector('.fa-regular.fa-heart').style.display = 'none';
                                p.querySelector('.fa-solid.fa-heart').classList.add('showHeart');
    
                            } else {
                                setTarget(targetName);    
                                p.querySelector('.fa-regular.fa-heart').style.display = 'none';
                                p.querySelector('.fa-solid.fa-heart').classList.add('showHeart');
                            };
                        };
                    });
                });

                function setTarget(targetName) {
                    for(let i=0 ; i<data.length ; i++) {
                        if(data[i].name === targetName) {
                            setWishListItems(data[i]);
                            setWishListNumbers();
                        };
                    };
                };

                ///////////////////////////////////// set Items /////////////////////////////////////
                function setWishListItems(item) {
                    let storageItems = JSON.parse(localStorage.getItem('wishListItems'));
                    const key = 'wishListItems';
                    setListItems(item, storageItems, key);
                };
                ///////////////////////////////////// set WL Spam /////////////////////////////////////
                function setWishListNumbers(change) {
                    let wlNumbers = parseInt(localStorage.getItem('wishListNumbers'));
                    if(change) {
                        localStorage.setItem('wishListNumbers', wlNumbers - 1);
                    } else if(wlNumbers) {
                        localStorage.setItem('wishListNumbers', wlNumbers + 1);
                    } else {
                        localStorage.setItem('wishListNumbers', 1);
                    };
                };
                
                ///////////////////////////////////// Remove WL Item /////////////////////////////////////////
                function removeWishListItem(name) {
                    let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));
                    if(wishListItems[name] != undefined) {
                        // console.log('ok')
                    }
                    setWishListNumbers("decrease");
                    delete wishListItems[name];
                    localStorage.setItem('wishListItems', JSON.stringify(wishListItems));
                };
            };                   
            
            function init() {
                displayItems();
                setOnLoadCartNumbers();
                wishList()
            };
            init();
        });
};
drumsets();
