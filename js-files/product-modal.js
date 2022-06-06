"use strict"

import { setingItem, totalCost, span } from "./lib.js";

function prodModal() {
    fetch('/json-files/cards-products.json')
        .then(results => results.json())
        .then(data => {
            function productId(number) {
                for(let i=0; i<data.length; i++) {                 
                    if(data[i].id === number+1) {
                        cardModal(data[i]);
                    };
                };
            };

            function cardModal(product) {
                const modalDiv = document.createElement('div');
                modalDiv.innerHTML = `
                        <div class="card_modal">
                            <button class="close_prod_modal_btn" data-close-modal>
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                            <div class="mod_cont">
                                <div class="card_modal_content">
                                    <h3 class="card_modal_title"></h3>
                                    <p class="card_modal_description">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing
                                        elit. Cupiditate officiis optio officia repudiandae harum adipisci neque repellendus
                                        minus laboriosam eaque.
                                    </p>
                                    <ul class="card_modal_list"></ul>
                                </div>
                                <div class="card_modal_media">

                                    <div class="main_img_container"></div>

                                    <div class="slider_container">
                                        <i class="fa-solid fa-chevron-left" id="btnLeft"></i></i>
                                        <div class="cardSlider"></div> 
                                        <i class="fa-solid fa-chevron-right" id="btnRight"></i>
                                    </div>
                                    <div class="column">
                                        <h1>Shop Now</h1>
                                        <h3 class="card_modal_price"></h3>
                                        <div class="shop_container">
                                            <button class="add_cart_btn" data-cart="add_to_cart_modal_btn">
                                                <span class="circle" aria-hidden="true">
                                                    <span class="icon arrow"></span>
                                                </span>
                                                <span class="button-text">Add to cart</span>
                                            </button>
                                            <a href="/pages/cart.html" class="open_cart_btn">
                                                <span class="circle" aria-hidden="true">
                                                    <span class="icon arrow"></span>
                                                </span>
                                                <span class="button-text">Go to cart</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `                        
                document.body.insertAdjacentElement('beforeend', modalDiv);
                document.querySelector('.card_modal_title').innerHTML =
                        `${product.name}`;
            
                document.querySelector('.main_img_container').innerHTML =
                        `<img class="main_img" src="${product.image}">`;
                        
                document.querySelector('.card_modal_price').innerHTML =
                        `Only € ${product.price}`;

                document.querySelectorAll('.card_modal_list').forEach((mod, i) => {
                    let info = [];
                    for(let j=0 ; j<product.description.length; j++) {
                        info += `
                            <li class="card_modal_item">
                                <i class="fa-solid fa-check"></i>${product.description[j]}
                            </li>`;
                    };
                    mod.innerHTML = info;                    
                });

                ///////////////////////////////////// Modal Slider /////////////////////////////////////   
                let col = [];
                for(let i=0 ; i<product.colors.length; i++) {
                    col += `<img class="thumbnail" src="/${product.colors[i]}">`;
                };
                    
                document.querySelector('.cardSlider').innerHTML = 
                    `<img class="thumbnail activePic" src="${product.image}">
                    ${col}`;
                    
                const sliderPics = document.querySelectorAll('.thumbnail');
                const activePic = document.querySelectorAll('.activePic');
                
                document.querySelectorAll('.main_img').forEach((el) => {
                    for(let i=0; i<sliderPics.length; i++){
                        sliderPics[i].addEventListener('mouseover', function(){
                            if (activePic.length > 0){
                                activePic[0].classList.remove('activePic');
                            };
                            this.classList.add('activePic');
                            el.src = this.src;
                        });
                    };                        
                });
            
                const slider = document.querySelector('.cardSlider');                
                document.querySelector('#btnLeft').addEventListener('click', function(){
                    slider.scrollLeft -= 100;
                });

                document.querySelector('#btnRight').addEventListener('click', function(){
                    slider.scrollLeft += 100;
                });
                
                /*----------------------- Close Modal Btn------------------------*/
                document.querySelector('.close_prod_modal_btn').addEventListener('click', () => {
                    document.querySelector('.card_modal').classList.remove('show_prod_modal');
                    slider.scrollLeft = 0;
                    cardOverlay.classList.remove('show_overlay');
                    document.querySelector('body').style.overflow = 'auto';
                    // location.reload();
                    clearInputField();
                }); 

                ///////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////// ADD TO CART /////////////////////////////////////
                const addToCartBtn = document.querySelectorAll('[data-cart="add_to_cart_modal_btn"]');
                
                addToCartBtn.forEach((btn, i) => {
                    btn.addEventListener('click', () => {
                        if(localStorage.getItem('logedUser') == null) {
                            setCartNumbers(product);
                            setTotalCost(product);
                        } else {
                            setCartNumbers(product);
                            setTotalCost(product);
                        };
                    });
                });

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
                };

                ///////////////////////////////////// set Items /////////////////////////////////////
                function setItems(product) {
                    if(localStorage.getItem('logedUser') == null) { 
                        let cartItems = JSON.parse(localStorage.getItem('localProductsInCart'));
                        const key = 'localProductsInCart';
                        setingItem(product, cartItems, key);
                    } else {
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
            };

            //////////////////////////////// Open product modal /////////////////////////////
            const openProdModBtn = document.querySelectorAll('.open_prod_modal');
            const cardOverlay = document.querySelector('#overlay_cards');
            
            openProdModBtn.forEach((btn, i) => {
                btn.addEventListener('click', (e) => {
                    console.log(e.target)
                    productId(i);
                    document.querySelector('.card_modal').classList.add('show_prod_modal');
                    cardOverlay.classList.add('show_overlay');
                    document.querySelector('body').style.overflow = 'hidden';
                });
            });
            ////////////////////////// Open modal with search form btn /////////////////////// 
            document.querySelector('.search_btn').addEventListener('click', () => {
                const inputValue = document.querySelector('.search_input').value;
                if(inputValue != 0) {
                    for(let i=0; i<data.length; i++) {                 
                        if(data[i].name === inputValue) {
                            let number = data[i].id;
                            productId(number - 1);
                        };
                    };
                    console.log(document.querySelector('.card_modal'))
                    document.querySelector('.card_modal').classList.add('show_prod_modal');
                    cardOverlay.classList.add('show_overlay');
                    document.querySelector('body').style.overflow = 'hidden';
                };
            });
            ///////////////////////////// Close product modal with overlay //////////////////////////
            cardOverlay.addEventListener('click', function () {
                document.querySelector('.card_modal').classList.remove('show_prod_modal');
                cardOverlay.classList.remove('show_overlay');
                document.querySelector('body').style.overflow = 'auto';
                // location.reload()
                clearInputField();
            });

            function clearInputField() {
                const inputValue = document.querySelector('.search_input').value;
                if(inputValue != 0) {
                    document.querySelector('.search_input').value = '';
                    document.querySelector('.fa-search').style.color = 'red';
                };
            };

            function openCartProdModal() {
                let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
    
                document.querySelectorAll('[data-product-target="#productModal"]').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        Object.values(cartItems).map(item => {
                            if(e.target.textContent === item.name) {
                                cardModal(item);
                                
                            };
                        });
                        document.querySelector('.card_modal').classList.add('show_prod_modal');
                        cardOverlay.classList.add('show_overlay');
                        document.querySelector('body').style.overflow = 'hidden';
                    });
                });
            }; 
            openCartProdModal();

            ///////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// User Modal //////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////
        // function logedUserModal() {
            const logedUser = JSON.parse(localStorage.getItem('logedUser'));        

            function setUserBtn(){
                if(logedUser) {
                    document.querySelector('.login_logout_link').style.display = "none";
                    document.querySelector('.loged_user_btn').style.display = "block";
                    document.querySelector('.nav_info_top span').textContent = `Welcome ${logedUser.firstName}`;

                    ///////////////////////////////////// Open User Modal /////////////////////////////////////
                    document.querySelector('.loged_user_btn').addEventListener('click', (e) => {
                        e.preventDefault();

                        createUserDiv();
                        document.querySelector('.user_page').classList.add('open_user_modal');
                        document.querySelector('.userPage_container h1 span').textContent = `${logedUser.firstName} ${logedUser.lastName}`;
                        document.querySelector('.wrapper').style.filter = "blur(3.5px)";
                    });
                };
            };
            setUserBtn();

            function createUserDiv() {
                const userModal = document.createElement('div');
                userModal.innerHTML = `
                        <div class="user_page">
                            <button class="close_user_modal_btn">
                                <i class="fa-solid fa-xmark"></i>
                            </button>

                            <div class="userPage_container">
                                <h1>Welcome <span></span></h1>
                                <button class="logout_btn">Log out</button>
                                <button class="login_btn" data-modal-target="#loginModal">Log in</button>
                            </div>
                            <p>Go search instruments</p>
                            <div class="page_btns">
                                <a href="/pages/drumsets.html">Drums</a>
                                <a href="cymbals.html">Cymbals</a>
                                <a href="percussion.html">Percussion</a>
                            </div>
                            <hr>
                            <div class="user_tabs">
                                <button class="tab_btn active_tab" data-tab="cart">Cart <span class="tc_span"></span></button>
                                <button class="tab_btn" data-tab="wish_list">Wish list <span class="wl_span"></span></button>
                                <button class="tab_btn" data-tab="something">Something</button>
                            </div>

                            <div id="cart" class="tab_container active">
                                <div class="cart_btns">
                                    <button class="">Checkout</button>
                                    <button class="remove_all_user_cart">Remove all</button>
                                </div>
                                <div class="total_price_box">
                                    <h3>Total Price: <span class="tc_total_price_value">€ 0</span></h3>
                                </div>
                                <div class="cart_list_content">
                                    
                                </div>
                            </div>

                            <div id="wish_list" class="tab_container">
                                <div class="wish_btns">
                                    <button class="">Hide all</button>
                                    <button class="remove_all_wl">Remove all</button>
                                </div>
                                <div class="wish_list_content">
                                    
                                </div>
                            </div>

                            <div id="something" class="tab_container">
                                
                            </div>
                        </div>
                        `;
                document.body.insertAdjacentElement('beforeend', userModal);

                openTabs();
                displayWishListItem();
                displayCartItem();
                tabCartSpan();
                wlTabSpan();
            };
            
            ///////////////////////////////////// Display WL Items /////////////////////////////////////
            function displayWishListItem() {
                let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));
                const wishListItemsContainer = document.querySelector('.wish_list_content');
                if(wishListItems) {
                    wishListItemsContainer.innerHTML = ``;
                    Object.values(wishListItems).map(item => {
                    wishListItemsContainer.innerHTML +=  `
                            <div class="wish_list_box list_box">
                                <button class="remove_wl_item_btn remove_btn">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                                <div class="box_content_container">
                                    <div class="img_container">
                                        <img class="product_img" src="${item.image}">
                                    </div>
                                    <div class="info_container">
                                        <a class="card_btn open_prod_modal product_name" data-product-target="#productModal">${item.name}</a>
                                        <div class="shop_container">
                                            <span>€ ${item.price}</span>
                                            <a class="shop open_cart" data-cart="add_to_cart_btn">
                                                <i class="fas fa-cart-arrow-down"></i>
                                            </a>
                                            <a href="/pages/cart.html" class="open_cart_btn">
                                                Go to cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        removeWishListItem();
                        removeAllWishListItems();
                        btn(wishListItems);
                        openCartProdModal();
                    });
                };
            };

            ///////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// Open/Close tabs /////////////////////////////////////
            function openTabs() {
                const tabBtns = document.querySelectorAll('[data-tab]');
                const bindAll = function() {
                    for(let i=0 ; i<tabBtns.length ; i++) {
                        tabBtns[i].addEventListener('click', change, false);
                    };
                };
                
                function clear() {
                    for(let i=0 ; i<tabBtns.length ; i++) {
                        tabBtns[i].classList.remove('active_tab');
                        const id = tabBtns[i].getAttribute('data-tab');
                        document.getElementById(id).classList.remove('active');
                    };
                };
                
                function change(e) {
                    clear();
                    e.target.classList.add('active_tab');
                    const id = e.currentTarget.getAttribute('data-tab');
                    document.getElementById(id).classList.add('active');
                };

                bindAll();
            };

            ///////////////////////////////////// Add To Cart Items /////////////////////////////////////
            function btn(items) {
                const addToCartBtn = document.querySelectorAll('[data-cart="add_to_cart_btn"]');
                
                addToCartBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        let itemName = e.target.parentElement.parentElement.parentElement.children[0].innerHTML;
                        setCartNumbers(items[itemName])
                        wlTotalCost(items[itemName])
                        displayCartItem();
                    });
                });
            };

            ///////////////////////////////////// cart Numbers /////////////////////////////////////
            function setCartNumbers(product) {
                let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
                
                if(productNumbers) {
                    localStorage.setItem('userCartNumbers', productNumbers + 1);
                    setSpan(productNumbers + 1) ;
                    tabCartSpan(productNumbers + 1);
                } else {
                    localStorage.setItem('userCartNumbers', 1);
                    setSpan(1); 
                    tabCartSpan(1);
                };                
                setItems(product);
            };

            ///////////////////////////////////// set Items /////////////////////////////////////

            function setItems(product) {
                let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
                const key = 'userProductsInCart';
                setingItem(product, cartItems, key);
            };

            ///////////////////////////////////// SPAN /////////////////////////////////////
            function setSpan(number) {
                let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
                span(number, productNumbers);
            };        

            ///////////////////////////////////// totalCost /////////////////////////////////////
            function wlTotalCost(product) {
                let cartCost = localStorage.getItem('userTotalCost');

                if(cartCost != null) {
                    cartCost = parseInt(cartCost);
                    localStorage.setItem("userTotalCost", cartCost + product.price);                
                } else {
                    cartCost = parseInt(cartCost);
                    localStorage.setItem("userTotalCost", product.price);
                };
            };

            /////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// Wish List Numbers /////////////////////////////////////
            function setWLNumbers(change) { 
                let wlNumbers = parseInt(localStorage.getItem('wishListNumbers'));

                if(change) {
                    localStorage.setItem('wishListNumbers', wlNumbers - 1);
                    wlTabSpan(wlNumbers - 1);
                } else if(wlNumbers) {
                    localStorage.setItem('wishListNumbers', wlNumbers + 1);
                    wlTabSpan(wlNumbers + 1);
                } else {
                    localStorage.setItem('wishListNumbers', 1);
                    wlTabSpan(1);
                };            
            };

            ///////////////////////////////////// Wish List Tab Span /////////////////////////////////////
            function wlTabSpan() {
                let wlNumbers = localStorage.getItem('wishListNumbers');
                const wlSpan = document.querySelector('.wl_span');
                if(wlNumbers < 1 || wlNumbers == null) {
                    wlSpan.style.display = "none";
                } else {
                    wlSpan.style.display = "block";
                    wlSpan.textContent = `${wlNumbers}`;
                };
            };

            ///////////////////////////////////// Remove Wish List Item /////////////////////////////////////
            function removeWishListItem() {
                let wishListItems = JSON.parse(localStorage.getItem('wishListItems'));
                const removeItemBtn = document.querySelectorAll('.remove_wl_item_btn');
                let item;

                for(let i=0; i < removeItemBtn.length; i++) {
                    removeItemBtn[i].addEventListener('click', () => {
                        item = removeItemBtn[i].nextElementSibling.children[1].firstChild.nextSibling.textContent;
                        setWLNumbers("decrease");
                        delete wishListItems[item];
                        localStorage.setItem('wishListItems', JSON.stringify(wishListItems));
                        
                        displayWishListItem();
                        wlTabSpan();
                    });
                };
            };

            ///////////////////////////////////// Remove All Wish List Items /////////////////////////////////////
            function removeAllWishListItems() {
                document.querySelector('.remove_all_wl').addEventListener('click', ()=> {
                    document.querySelector('.wish_list_content').innerHTML = '';
                    localStorage.setItem('wishListItems', JSON.stringify({}));
                    localStorage.setItem('wishListNumbers', JSON.stringify(0));
                    document.querySelector('.wl_span').textContent = 0;
                    displayWishListItem();
                });                
            };            

            /////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// Tab Cart Products /////////////////////////////////////
            function onLoadTabCartNumbers() {
                let productNumbers = localStorage.getItem('userCartNumbers');
                
                if(productNumbers == null || productNumbers == 0) {
                    document.querySelector('.tc_span').style.display = "none";
                } else {
                    document.querySelector('.tc_span').style.display = "block";
                    // span(productNumbers)
                };
            };

            ///////////////////////////////////// TC Numbers /////////////////////////////////////
            function setTabCartNumbers(change) { 
                let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
                
                if(change) {
                    localStorage.setItem('userCartNumbers', productNumbers - 1);
                    tabCartSpan(productNumbers - 1);
                    span(productNumbers - 1);
                } else if(productNumbers) {
                    localStorage.setItem('userCartNumbers', productNumbers + 1);
                    tabCartSpan(productNumbers + 1);
                    span(productNumbers + 1);
                } else {
                    localStorage.setItem('userCartNumbers', 1);
                    tabCartSpan(1);
                    span(1);
                };            
            };

            ///////////////////////////////////// TC Span /////////////////////////////////////
            function tabCartSpan() {
                let productNumbers = localStorage.getItem('userCartNumbers');
                const numSpan = document.querySelector('[data-tab="cart"] span');
                
                if(productNumbers < 1 || productNumbers == null) {
                    numSpan.style.display = "none";
                } else {
                    numSpan.style.display = "block";
                    numSpan.textContent = `${productNumbers}`;
                    span2(productNumbers)
                };
            };

            function span2(number) {
                const numSpan = document.querySelectorAll('.shop span');
                numSpan.forEach(s => {
                    s.textContent = `${number}`;
                });
            };

            ///////////////////////////////////// totalCost /////////////////////////////////////
            function userCartTotalCost(product, action) {
                let totalPrice = localStorage.getItem("userTotalCost");
                
                if(action) {
                    totalPrice = parseInt(totalPrice);
                    localStorage.setItem("userTotalCost", totalPrice - product.price);
                } else if(totalPrice != null) {        
                    totalPrice = parseInt(totalPrice);
                    localStorage.setItem("userTotalCost", totalPrice + product.price);    
                } else {
                    localStorage.setItem("userTotalCost", product.price);
                };
                displayCartItem();
            };
            
            ///////////////////////////////////// Display Tab Cart Items /////////////////////////////////////
            function displayCartItem() {
                let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
                let totalPrice = parseInt(localStorage.getItem("userTotalCost"));
                const cartItemsContainer = document.querySelector('.cart_list_content');
                const tp = document.querySelector('.tc_total_price_value');
                
                if(cartItems) {                
                    cartItemsContainer.innerHTML = ``;
                    tp.textContent = `€ ${totalPrice}`;
                    Object.values(cartItems).map(item => {
                    cartItemsContainer.innerHTML +=  `
                            <div class="cart_list_box list_box">
                                <button class="remove_tc_item_btn remove_btn">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                                <div class="box_content_container">
                                    <div class="img_container">
                                        <img class="product_img" src="${item.image}">
                                    </div>
                                    <div class="info_container">
                                        <a class="card_btn open_prod_modal item_name" data-product-target="#productModal">${item.name}</a>
                                        
                                        <div class="shop_container cart_shop_container">
                                            <span>€ ${item.price}</span>
                                            <div class="cart_quantity">
                                                <i class="fa-solid fa-angle-left left"></i>
                                                <span class="cart_q">${item.inCart}</span>
                                                <i class="fa-solid fa-angle-right right"></i>
                                            </div>
                                            <span>€ ${item.inCart * item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                        removeTabCartItem();
                        removeAllUserCartItems();
                        manageTCQuantity();
                        openCartProdModal();
                    });
                };
            };
            
            ///////////////////////////////////// Tab Cart Product Quantity /////////////////////////////////////
            function manageTCQuantity() {
                let cartItems = JSON.parse(localStorage.getItem("userProductsInCart"));
                let decreaseButtons = document.querySelectorAll('.left');
                let increaseButtons = document.querySelectorAll('.right');
                let currentQuantity = 0;
                let currentProduct = '';
                
                for(let i=0; i < increaseButtons.length; i++) {
                    decreaseButtons[i].addEventListener('click', () => {
                        currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
                        currentProduct = decreaseButtons[i].parentElement.parentElement.previousElementSibling.textContent;
                        
                        if(cartItems[currentProduct].inCart > 1) {
                            // document.querySelectorAll('.cart_quantity span').textContent -= 1
                            cartItems[currentProduct].inCart -= 1;
                            setTabCartNumbers("decrease");
                            userCartTotalCost(cartItems[currentProduct], "decrease");
                            localStorage.setItem("userProductsInCart", JSON.stringify(cartItems));
                            
                            displayCartItem();
                        };
                    });
            
                    increaseButtons[i].addEventListener('click', () => {
                        currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
                        currentProduct = increaseButtons[i].parentElement.parentElement.previousElementSibling.textContent;
                                            
                        cartItems[currentProduct].inCart += 1;
                        setTabCartNumbers();
                        userCartTotalCost(cartItems[currentProduct]);
                        localStorage.setItem("userProductsInCart", JSON.stringify(cartItems));
            
                        displayCartItem();
                    });
                };
            };
            ///////////////////////////////// Open Product Modal from User Modal //////////////////////////
            function openCartProdModal() {
                let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
                let wlItems = JSON.parse(localStorage.getItem('wishListItems'));

                document.querySelectorAll('[data-product-target="#productModal"]').forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        Object.values(cartItems).map(item => {
                            if(e.target.textContent === item.name) {
                                cardModal(item);                                
                            };                            
                        });
                        Object.values(wlItems).map(item => {
                            if(e.target.textContent === item.name) {
                                cardModal(item);                                
                            };                            
                        });
                        document.querySelector('.card_modal').classList.add('show_prod_modal');
                        cardOverlay.classList.add('show_overlay');
                        document.querySelector('body').style.overflow = 'hidden';
                    });
                });
            };            
            
            ///////////////////////////////////// Remove Tab Cart Item /////////////////////////////////////
            function removeTabCartItem() {
                let userProductsInCart = JSON.parse(localStorage.getItem('userProductsInCart'));
                let cartCost = localStorage.getItem("userTotalCost");
                let productNumbers = localStorage.getItem('userCartNumbers');
                const removeItemBtn = document.querySelectorAll('.remove_tc_item_btn');
                let item;

                for(let i=0; i < removeItemBtn.length; i++) {
                    removeItemBtn[i].addEventListener('click', () => {
                        item = removeItemBtn[i].nextElementSibling.children[1].firstChild.nextSibling.textContent;
                        localStorage.setItem("userTotalCost", cartCost - (userProductsInCart[item].price * userProductsInCart[item].inCart));
                        localStorage.setItem("userCartNumbers", productNumbers - userProductsInCart[item].inCart);
                        
                        delete userProductsInCart[item];
                        localStorage.setItem('userProductsInCart', JSON.stringify(userProductsInCart));
                        
                        displayCartItem();
                        onLoadTabCartNumbers();
                        tabCartSpan()
                    });
                };
            };

            ///////////////////////////////////// Remove All User Cart Items /////////////////////////////////////
            function removeAllUserCartItems() {
                document.querySelector('.remove_all_user_cart').addEventListener('click', ()=> {
                    document.querySelector('.cart_list_content').innerHTML = '';
                    localStorage.setItem('userProductsInCart', JSON.stringify({}));
                    localStorage.setItem('userCartNumbers', JSON.stringify(0));
                    localStorage.setItem('userTotalCost', JSON.stringify(0));
                    document.querySelector('[data-tab="cart"] span').textContent = 0;
                    
                    displayCartItem();
                    onLoadTabCartNumbers();
                    // location.reload();
                    // return false;
                });                
            };

            ////////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////// Close User Modal /////////////////////////////////////
            function closeUserDiv() {
                createUserDiv();
                document.querySelector('.close_user_modal_btn').addEventListener('click', () => {
                    document.querySelector('.user_page').classList.remove('open_user_modal');
                    document.querySelector('.wrapper').style.filter = "";
                    location.reload();
                });
            };
            closeUserDiv();
            
            ///////////////////////////////////// Logout / Login BTNS /////////////////////////////////////
            function logout() {
                document.querySelector('.logout_btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('logedUser');

                    document.querySelector('.login_logout_link').style.display = "block";
                    document.querySelector('.loged_user_btn').style.display = "none";
                    document.querySelector('.nav_info_top span').textContent = '';
                    document.querySelector('.userPage_container h1').textContent = 'You are logged out';
                    document.querySelector('.logout_btn').classList.add('close');
                    document.querySelector('.login_btn').classList.add('open');
                    document.querySelector('.cart_list_content').innerHTML = '';
                    document.querySelector('.wish_list_content').innerHTML = '';
                    // location.reload();
                });
            };
            logout();

            function logInUser() {
                document.querySelector('.login_btn').addEventListener('click', () => {
                    const modal = document.querySelector('#loginModal')
                    document.querySelector('.user_page').classList.remove('open_user_modal');
                    openModals(modal);
                    let productNumbers = parseInt(localStorage.getItem('localCartNumbers'));
                    // setSpan(productNumbers);
                    const numSpan = document.querySelectorAll('.shop span');
                    numSpan.forEach(s => {
                        s.textContent = `${productNumbers}`;
                    });
                });
            };
            logInUser();

            function init() {
                displayCartItem();
                onLoadTabCartNumbers();
            };
            init();
        });
};
prodModal();