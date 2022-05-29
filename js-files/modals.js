'use strict'

import { setingItem, totalCost, span, prodPopMod } from "./lib.js";

window.addEventListener( "DOMContentLoaded", function () {
    const modalDiv = document.createElement('div');
    
    modalDiv.innerHTML = `
        <div class="modal_wrapper modal" id="loginModal">
            <div class="modal_container">
                <div class="login_modal_container modals">
                    <button class="close_modal_btn" data-close-modal>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <h1 class="login_header modal_header">Log into DrumCentral</h1>
                    <div class="form_container">
                        <form class="login_form modal_form" id="login_form" action="/" novalidate>
                            <label for="email">Email address :</label>
                            <div class="input_login email_cont">
                                <input type="email" name="email" id="login_email" placeholder="Enter your email">
                                <span class="verify"></span>
                            </div>
                            <label for="password">Password :</label>
                            <div class="input_login">
                                <input type="password" name="password" id="login_password" class="pass" placeholder="Enter your password">
                                <i class="far fa-eye-slash" id="togglePassword"></i>
                                <span class="verify"></span>
                            </div>
                            <button class="submit_login_btn submit_btn" type="submit">Login</button>
                        </form>

                        <div class="divider">
                            <div class="divider_line_up"></div>
                            <div class="divider_text"><span>or</span></div>
                            <div class="divider_line_down"></div>
                        </div>

                        <div class="login_media">
                            <button class="log_media_btn">
                                <i class="fab fa-facebook-f icon"></i>
                                <span>Log in with Facebook</span>
                            </button>
                            <button class="log_media_btn">
                                <i class="fab fa-twitter icon"></i>
                                <span>Log in with Twitter</span>
                            </button>
                            <button class="log_media_btn">
                                <i class="fab fa-linkedin-in icon"></i>
                                <span>Log in with Linkedin</span>
                            </button>
                        </div>
                    </div>
                    
                    <a class="signin_form_btn">Sign In.</a>
                </div>
                
                <div class="signin_modal_container modals">
                    <button class="close_modal_btn" data-close-modal>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <button class="go_back">
                        <i class="fa-solid fa-angle-left"></i>go back</button>
                    <h1 class="signin_header modal_header">Sign In</h1>
                    <form class="signin_form modal_form" id="signin_form" action="/" novalidate>
                        <label for="signin_first_name">First Name:</label>
                        <div class="signin_login">
                            <input type="text" name="signin_first_name" id="signin_first_name" placeholder="Your First Name">
                            <span class="verify"></span>
                        </div>
                        <label for="signin_last_name">Last Name:</label>
                        <div class="signin_login">
                            <input type="text" name="signin_last_name" id="signin_last_name" placeholder="Your Last Name">
                            <span class="verify"></span>
                        </div>
                        <label for="signin_email">Email: <span>*</span></label>
                        <div class="signin_login">
                            <input type="email" name="signin_email" id="signin_email" placeholder="Your Email Address" required>
                            <span class="verify"></span>
                        </div>
                        <label for="signin_password">Password: <span>*</span></label>
                        <div class="signin_login">
                            <input type="password" name="signin_password" id="signin_password" class="pass" placeholder="Your Password" required>
                            <i class="far fa-eye-slash" id="togglePassword"></i>
                            <span class="verify"></span>
                        </div>
                        <button class="submit_btn" type="submit">Signin</button>
                    </form>
                </div>
            </div>

            <div class="popup_login">
                <h3>Welcome back</h3>
                <span></span>
                <p>You are successfuly loged into DrumCentral!</p>
                <button class="pop_btn">Go Surf</button>
            </div>
        </div>

        <div class="contact_wrapper modal_wrapper modal" id="contactModal">
            <div class="modal_container">
                <div class="container_left"></div>
                
                <div class="container_right">
                    <button class="close_modal_btn" data-close-modal>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <h1>Contact Us</h1>

                    <form class="form_contact" action="/" novalidate>
                        <label for="contact_first_name">First Name:</label>
                        <div class="contact_login">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" name="contact_first_name" id="contact_first_name">
                            <span class="verify"></span>
                        </div>
                        <label for="contact_last_name">Last Name:</label>
                        <div class="contact_login">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" name="contact_last_name" id="contact_last_name">
                            <span class="verify"></span>
                        </div>
                        <label for="contact_email">Email: <span>*</span></label>
                        <div class="contact_login">
                            <i class="fa-solid fa-at"></i>
                            <input type="email" name="contact_email" id="contact_email" required>
                            <span class="verify"></span>
                        </div>
                        <div class="message_login">
                            <label for="message">Message: </label>
                            <textarea name="message" id="message" cols="30" rows="10" required placeholder="Your message"></textarea>
                            <span class="verify"></span>
                        </div>
                        <button class="contact_submit_btn" type="submit">Send</button>
                    </form>

                </div>
            </div>
        </div>
        `
    document.body.insertAdjacentElement('beforeend', modalDiv);

    ///////////////////////////////////// Modals /////////////////////////////////////

    const modals = function () {
        const openModalBtn = document.querySelectorAll('[data-modal-target]');
        const openContactModalBtn = document.querySelectorAll('[data-contact-target]');
        const closeModalBtn = document.querySelectorAll('[data-close-modal]');
        const overlay = document.querySelector('#overlay');

        const modalWrapper = document.querySelector('.modal_wrapper');
        const contactWrapper = document.querySelector('.contact_wrapper');
        const modalContainer = document.querySelector('.modal_container');
        const signInBtn = document.querySelector('.signin_form_btn');
        const logInBtn = document.querySelector('.go_back');
        
        const togglePassword = document.querySelectorAll('#togglePassword');
        const password = document.querySelectorAll('.pass');
        const wrapper = document.querySelector('.wrapper');

        openModalBtn.forEach(btn => {
            btn.addEventListener('click', function () {
                const modal = document.querySelector(btn.dataset.modalTarget);
                openModals(modal);
            });
        });

        openContactModalBtn.forEach(btn => {
            btn.addEventListener('click', function () {
                const modal = document.querySelector(btn.dataset.contactTarget);
                // openContactModal(modal);
                openModals(modal);
            });
        });

        closeModalBtn.forEach(btn => {
            btn.addEventListener('click', function () {
                const modal = btn.closest('.modal_wrapper');
                closeModal(modal);
            });
        });

        overlay.addEventListener('click', function () {
            const modal = document.querySelector('.active_modal');
            closeModal(modal);
        });

        function openModals(mod) {
            if(mod === null) return
            mod.classList.add('active_modal');
            modalWrapper.classList.add('active_modal');
            overlay.classList.add('active_modal');
            modalContainer.style.left = "0px";
            wrapper.style.filter = "blur(3.5px)";
            document.querySelector('body').style.overflow = 'hidden';
        };

        function closeModal(modal) {
            if(modal === null) return
            modal.classList.remove('active_modal');
            overlay.classList.remove('active_modal');
            modalWrapper.classList.remove('active_modal');
            contactWrapper.classList.remove('active_modal');
            modalContainer.classList.remove('slide-login');
            modalContainer.classList.remove('slide-signin');
            wrapper.style.filter = "";
            document.querySelector('body').style.overflow = 'auto';
            // --------------------------------------------------
            document.querySelector('#login_form').reset();
            // document.querySelector('#signin_form').reset();
            // document.querySelector('#form_contact').reset();
            document.querySelectorAll('.verify').forEach(s => {
                s.innerHTML = '';
            });
        };

        signInBtn.addEventListener('click', function () {
            modalContainer.classList.add('slide-signin');
            modalContainer.classList.remove('slide-login');
        });

        logInBtn.addEventListener('click', () => {
            modalContainer.classList.remove('slide-signin');
            modalContainer.classList.add('slide-login');
        });

        togglePassword.forEach(icon => {
            icon.addEventListener('click', function(e) {
                password.forEach(pass => {
                    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
                    pass.setAttribute('type', type);
                });
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        });

        ///////////////////////////////////// Login /////////////////////////////////////

        const validation = function() {
            const loginForm = document.querySelector('#login_form');
            const email = document.querySelector('#login_email');
            const password = document.querySelector('#login_password');
            const popup = document.querySelector('.popup_login');
            const popBtn = document.querySelector('.pop_btn');         
            
            loginForm.addEventListener('click', (e) => {
                e.preventDefault();
                
                if(checkInputs() == true) {
                    let email = document.querySelector('#login_email').value;
                    let password = document.querySelector('#login_password').value;
                    
                    let formData = JSON.parse(localStorage.getItem('formData')) || [];

                    let exist = formData.length && 
                        JSON.parse(localStorage.getItem('formData')).some(data => 
                            data.email.toLowerCase() == email.toLowerCase() && 
                            data.password.toLowerCase() == password.toLowerCase()
                        );

                    if(!exist){
                        document.querySelector('#login_form').reset();
                        document.querySelectorAll('.input_login .verify').forEach(s => {
                            s.innerHTML = '';
                        });
                        
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login h3').textContent = 'Ooopppssss...!';
                        document.querySelector('.popup_login span').textContent = 'Incorrect login credentials';
                        document.querySelector('.popup_login p').textContent = 'Try again.';
                        document.querySelector('.pop_btn').textContent = 'Log In';
                    } else {
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login span').textContent = `${email}`;
                        document.querySelector('.login_logout_link').style.display = "none";
                        document.querySelector('.loged_user_btn').style.display = "block";
                        setUserBtn();
                        ///////////////////// Loged User //////////////////////
                        JSON.parse(localStorage.getItem('formData')).find(d => {
                            if(d.email.toLowerCase() === email.toLowerCase() && d.password.toLowerCase() === password.toLowerCase()) {
                                document.querySelector('.popup_login span').textContent = `${d.firstName} ${d.lastName}`;
                                document.querySelector('.nav_info_top span').textContent = `Welcome ${d.firstName}`
                                let logedUser = JSON.parse(localStorage.getItem('logedUser')) || [];
                                logedUser.push(logedUser);
                                localStorage.setItem('logedUser', JSON.stringify(d));                                
                                location.reload(); //!!!!!!!!!!!!!!!! 
                                // reset( !!!!!!!!!!!! )
                            };
                        });
                    };
                };
                
                popBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = document.querySelector('.modal_wrapper');
                    closeModal(modal);

                    document.querySelector('.popup_login').classList.remove('open_popup');
                    document.querySelector('#login_form').reset();
                    document.querySelectorAll('.input_login .verify').forEach(s => {
                        s.innerHTML = '';
                    });
                });
            });

            function checkInputs() {
                const emailValue = email.value.trim();
                const passwordValue = password.value.trim();

                let retVal = true;
                const at = emailValue.indexOf('@');
                const dot = emailValue.indexOf('.');

                if(emailValue === '') {
                    setErrorFor(email, 'Email cannot be blank.');
                    retVal = false;
                // } else if(!isEmail(emailValue)) {
                //     setErrorFor(email, 'Email is not valid!');
                //     retVal = false;
                } else if(at < 1) {
                    setErrorFor(email, 'Email must contain "@".');
                    retVal = false;
                } else if(dot <= at + 2) {
                    setErrorFor(email, '"." must have min 2 characters after "@".');
                    retVal = false;
                } else if(dot === emailValue.length - 1) {
                    setErrorFor(email, '"." cannot be at the end.');
                    retVal = false;
                } else {
                    setSuccessFor(email, 'Success!');
                };

                if(passwordValue === '') {
                    setErrorFor(password, 'password cannot be blank');
                    retVal = false;
                // } else if(!isPassword(password)) {
                //     setErrorFor(password, 'password is not valid!');
                //     retVal = false;
                } else if(passwordValue.length < 8) {
                    setErrorFor(password, 'Email must have min 8 char!');
                    retVal = false;
                } else {
                    setSuccessFor(password, 'Success!');
                };
                
                return retVal;
            };
            
            function setErrorFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');

                small.innerHTML = message;
                small.classList = 'verify error';
            };

            function setSuccessFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');

                small.innerHTML = message;
                small.classList = 'verify success';
            };

            // function isEmail(email) {
            //     return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            // }
            // function isPassword(password) {
            //     return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
            // };
        };
        validation();

        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////// User Modal //////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////
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
                    `
            document.body.insertAdjacentElement('beforeend', userModal);

            openTabs();
            displayWishListItem();
            displayCartItem();
            tabCartSpan()
            wlTabSpan()
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
                        `
                    removeWishListItem();
                    removeAllWishListItems();
                    btn(wishListItems);                    
                });
            };
        };

        ///////////////////////////////////// Add To Cart Items /////////////////////////////////////
        function btn(items) {
            const addToCartBtn = document.querySelectorAll('[data-cart="add_to_cart_btn"]');
            
            addToCartBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    let itemName = e.target.parentElement.parentElement.parentElement.children[0].innerHTML;
                    setCartNumbers(items[itemName])
                    totalCost(items[itemName])
                    displayCartItem()
                });
            });
        };

        ///////////////////////////////////// cart Numbers /////////////////////////////////////
        function setCartNumbers(product) {
            let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
            
            if(productNumbers) {
                localStorage.setItem('userCartNumbers', productNumbers + 1);
                setSpan(productNumbers + 1) ;
                tabCartSpan(productNumbers + 1)
            } else {
                localStorage.setItem('userCartNumbers', 1);
                setSpan(1); 
                tabCartSpan(1)
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
        function totalCost(product) {
            let cartCost = localStorage.getItem('userTotalCost');

            if(cartCost != null) {
                cartCost = parseInt(cartCost);
                localStorage.setItem("userTotalCost", cartCost + product.price);                
            } else {
                cartCost = parseInt(cartCost);
                localStorage.setItem("userTotalCost", product.price);
            }                
        }

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
            // console.log(span())
            if(change) {
                localStorage.setItem('userCartNumbers', productNumbers - 1);
                tabCartSpan(productNumbers - 1);
                span(productNumbers - 1)
            } else if(productNumbers) {
                localStorage.setItem('userCartNumbers', productNumbers + 1);
                tabCartSpan(productNumbers + 1);
                span(productNumbers + 1)
            } else {
                localStorage.setItem('userCartNumbers', 1);
                tabCartSpan(1);
                span(1)
            };            
        };

        ///////////////////////////////////// TC Span /////////////////////////////////////
        function tabCartSpan() {
            let productNumbers = localStorage.getItem('userCartNumbers');
            const numSpan = document.querySelector('[data-tab="cart"] span')
            
            if(productNumbers < 1 || productNumbers == null) {
                numSpan.style.display = "none";
            } else {
                numSpan.style.display = "block";
                numSpan.textContent = `${productNumbers}`;
                span(productNumbers)
            };
        }
        function span(number) {
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
                        `
                    removeTabCartItem()
                    removeAllUserCartItems();
                    manageTCQuantity();
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
        }

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
        }
        logout();

        function logInUser() {
            document.querySelector('.login_btn').addEventListener('click', () => {
                const modal = document.querySelector('#loginModal')
                document.querySelector('.user_page').classList.remove('open_user_modal');
                openModals(modal)
                let productNumbers = parseInt(localStorage.getItem('localCartNumbers'));
                // setSpan(productNumbers)
                const numSpan = document.querySelectorAll('.shop span');
                numSpan.forEach(s => {
                    s.textContent = `${productNumbers}`;
                });
            });
        }
        logInUser();

        function init() {
            displayCartItem()
            onLoadTabCartNumbers();
        };
        init();

        ///////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////// Sign In /////////////////////////////////////

        const validateSignIn = function() {
            const signInForm = document.querySelector('#signin_form');
            const firstName = document.querySelector('#signin_first_name');
            const lastName = document.querySelector('#signin_last_name');
            const email = document.querySelector('#signin_email');
            const password = document.querySelector('#signin_password');
            const popup = document.querySelector('.popup_login');
            const popBtn = document.querySelector('.pop_btn');
            
            signInForm.addEventListener('click', (e) => {
                e.preventDefault();
                
                if(checkInputs() == true) {
                    document.querySelector('.submit_btn').disabled = false;
                    let firstName = document.querySelector('#signin_first_name').value;
                    let lastName = document.querySelector('#signin_last_name').value;
                    let email = document.querySelector('#signin_email').value;
                    let password = document.querySelector('#signin_password').value;
                    

                    let formData = JSON.parse(localStorage.getItem('formData')) || [];
                    
                    let exist = formData.length && 
                        JSON.parse(localStorage.getItem('formData')).some(data => 
                            data.firstName.toLowerCase() == firstName.toLowerCase() &&
                            data.lastName.toLowerCase() == lastName.toLowerCase() &&
                            data.email.toLowerCase() == email.toLowerCase() 
                        );
                    
                    if(!exist){
                        formData.push({ firstName, lastName, email, password });
                        localStorage.setItem('formData', JSON.stringify(formData));

                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login h3').textContent = 'Welcome!';
                        document.querySelector('.popup_login span').textContent = `${firstName} ${lastName}`;
                        document.querySelector('.popup_login p').textContent = `You are successfuly signed into DrumCentral`;
                        document.querySelector('.pop_btn').textContent = `Go to LogIn`;
                        // document.querySelector('#login_email').innerHTML = `${email}`;
                        // location.reload();
                    } else {
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login h3').textContent = 'Ooopppssss... Duplicate found!!!';
                        document.querySelector('.popup_login span').textContent = `${firstName} ${lastName}`;
                        document.querySelector('.popup_login p').textContent = 'You have already signed in.';
                        document.querySelector('.pop_btn').textContent = 'Go to LogIn';
                    };
                };

                popBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    popup.classList.remove('open_popup');
                    document.querySelector('#signin_form').reset();
                    document.querySelector('.verify').innerHTML = '';
                    setErrorFor(firstName, '');
                    setErrorFor(lastName, '');
                    setErrorFor(email, '');
                    setErrorFor(password, '');
                    modalContainer.classList.add('slide-login');
                    // document.querySelector('#login_email').textContent = `${email}`
                    // document.querySelector('#login_email').textContent = `bbb`;
                })
                
            });

            function checkInputs() {
                const firstNameValue = firstName.value.trim();
                const lastNameValue = lastName.value.trim();
                const emailValue = email.value.trim();
                const passwordValue = password.value.trim();
                
                let retVal = true;
                const at = emailValue.indexOf('@');
                const dot = emailValue.indexOf('.');

                if(firstNameValue == null || firstNameValue == '') {
                    setErrorFor(firstName, 'First name cannot be blank.');
                    retVal = false;
                } else if(firstNameValue.charAt(0) != firstNameValue.charAt(0).toUpperCase()) {
                    setErrorFor(firstName, 'First character must by uppercase.');
                    retVal = false;
                } else if(firstNameValue.length < 3) {
                    setErrorFor(firstName, 'First name must be at least 3 characters long.');
                    retVal = false;
                } else {
                    setSuccessFor(firstName, 'Success!');
                };


                if(lastNameValue == null || lastNameValue == '') {
                    setErrorFor(lastName, 'Last name cannot be blank.');
                    retVal = false;
                } else if(lastNameValue.charAt(0) != lastNameValue.charAt(0).toUpperCase()) {
                    setErrorFor(lastName, 'First character must by uppercase.');
                    retVal = false;
                } else if(lastNameValue.length < 3) {
                    setErrorFor(lastName, 'Last name must be at least 3 characters long.');
                    retVal = false;
                } else {
                    setSuccessFor(lastName, 'Success!');
                };

                if(emailValue === '') {
                    setErrorFor(email, 'Email cannot be blank.');
                    retVal = false;
                // } else if(!isEmail(emailValue)) {
                //     setErrorFor(email, 'Email is not valid!');
                //     retVal = false;
                } else if(at < 1) {
                    setErrorFor(email, 'Email must contain "@".');
                    retVal = false;
                } else if(dot <= at + 2) {
                    setErrorFor(email, '"." must have min 2 characters after "@".');
                    retVal = false;
                } else if(dot === emailValue.length - 1) {
                    setErrorFor(email, '"." cannot be at the end.');
                    retVal = false;
                } else {
                    setSuccessFor(email, 'Success!');
                };

                if(passwordValue === '') {
                    setErrorFor(password, 'Password cannot be blank.');
                    retVal = false;
                // } else if(!isPassword(password)) {
                //     setErrorFor(password, 'password is not valid!');
                //     retVal = false;
                } else if(passwordValue.length < 8) {
                    setErrorFor(password, 'Password must have min 8 char!');
                    retVal = false;
                } else {
                    setSuccessFor(password, 'Success!');
                };
                
                return retVal;
            };

            function setErrorFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');

                small.innerHTML = message;
                small.classList = 'verify error';
            };

            function setSuccessFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');

                small.innerHTML = message;
                small.classList = 'verify success';
            };

            // function isEmail(email) {
            //     return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            // }
            // function isPassword(password) {
            //     return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
            // }
        };
        validateSignIn();

        

        ///////////////////////////////////// Contact /////////////////////////////////////

        function sendEmail() {
            const contForm = document.querySelector('.form_contact');
            const firstName = document.querySelector('#contact_first_name');
            const lastName = document.querySelector('#contact_last_name');
            const email = document.querySelector('#contact_email');
            const message = document.querySelector('#message');
            const contSubBtn = document.querySelector('.contact_submit_btn');

            
            contForm.addEventListener('click', (e) => {
                e.preventDefault();

                if(checkInputs() == true) {
                    let firstName = document.querySelector('#signin_first_name').value;
                    let lastName = document.querySelector('#signin_last_name').value;
                    let email = document.querySelector('#signin_email').value;
                    let message = document.querySelector('#signin_password').value;

                    console.log(firstName, lastName, email, message)
                };
            });



            function checkInputs() {
                const firstNameValue = firstName.value.trim();
                const lastNameValue = lastName.value.trim();
                const emailValue = email.value.trim();
                const messageValue = message.value.trim();

                console.log(firstNameValue, lastNameValue, emailValue, messageValue)

                let retVal = true;
                const at = emailValue.indexOf('@');
                const dot = emailValue.indexOf('.');

                // firstName.addEventListener('blur', (e) => {
                    // e.preventDefault();
                    // let retVal = true;
                    // function fn() {
                
                    if(firstNameValue === '') {
                        setErrorFor(firstName, 'First name cannot be blank.');
                        retVal = false;
                    } else if(firstNameValue.charAt(0) != firstNameValue.charAt(0).toUpperCase()) {
                        setErrorFor(firstName, 'First character must by uppercase.');
                        retVal = false;
                    } else {
                        setSuccessFor(firstName, 'Success!');
                    };
                    // return retVal
                // }
                // })

                // lastName.addEventListener('blur', (e) => {
                //     e.preventDefault();

                    if(lastNameValue === '') {
                        setErrorFor(lastName, 'First name cannot be blank.');
                        retVal = false;
                    } else if(lastNameValue.charAt(0) != lastNameValue.charAt(0).toUpperCase()) {
                        setErrorFor(lastName, 'First character must by uppercase.');
                        retVal = false;
                    } else {
                        setSuccessFor(lastName, 'Success!');
                    };
                // })

                // email.addEventListener('blur', (e) => {
                //     e.preventDefault();

                    if(emailValue === '') {
                        setErrorFor(email, 'Email cannot be blank.');
                        retVal = false;
                    // } else if(!isEmail(emailValue)) {
                    //     setErrorFor(email, 'Email is not valid!');
                    //     retVal = false;
                    } else if(at < 1) {
                        setErrorFor(email, 'Email must contain "@".');
                        retVal = false;
                    } else if(dot <= at + 2) {
                        setErrorFor(email, '"." must have min 2 characters after "@".');
                        retVal = false;
                    } else if(dot === emailValue.length - 1) {
                        setErrorFor(email, '"." cannot be at the end.');
                        retVal = false;
                    } else {
                        setSuccessFor(email, 'Success!');
                    };
                // })

                // message.addEventListener('blur', (e) => {
                //     e.preventDefault();

                    if(messageValue === '') {
                        setErrorFor(message, 'message cannot be blank.');
                        retVal = false;
                    } else {
                        setSuccessFor(message, 'Success!');
                    };
                // })
                
                return retVal;
            }

            function setErrorFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');
                console.log(small)

                small.innerHTML = message;
                small.classList = 'verify error';
            }

            function setSuccessFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');

                small.innerHTML = message;
                small.classList = 'verify success';
            }

            // function isEmail(email) {
            //     return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            // }
        }
        sendEmail();
    };
    modals();

    /////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////// Product Modal /////////////////////////////////////

    function prodModal() {
        fetch('/json-files/cards-products.json')
            .then(results => results.json())
            .then(data => {
                function productId(number) {
                    for(let i=0; i<data.length; i++) {                 
                        if(data[i].id === number+1) {
                            cardModal(data[i])
                        }
                    }
                }
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
                            `${product.name}`
                
                    document.querySelector('.main_img_container').innerHTML =
                            `<img class="main_img" src="${product.image}">`
                            
                    document.querySelector('.card_modal_price').innerHTML =
                            `Only € ${product.price}`

                    document.querySelectorAll('.card_modal_list').forEach((mod, i) => {
                        let info = [];
                        for(let j=0 ; j<product.description.length; j++) {
                            info += `
                                <li class="card_modal_item">
                                    <i class="fa-solid fa-check"></i>${product.description[j]}
                                </li>`
                        };
                        mod.innerHTML = info;
                    });

                    ///////////////////////////////////// Modal Slider /////////////////////////////////////   
                    let col = [];
                    for(let i=0 ; i<product.colors.length; i++) {
                        col += `<img class="thumbnail" src="/${product.colors[i]}">`
                    };
                        
                    document.querySelector('.cardSlider').innerHTML = 
                        `<img class="thumbnail activePic" src="${product.image}">
                        ${col}`
                        
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
                    
                    document.querySelector('.close_prod_modal_btn').addEventListener('click', () => {
                        document.querySelector('.card_modal').classList.remove('show_prod_modal');
                        slider.scrollLeft = 0;
                        cardOverlay.classList.remove('show_overlay');
                        document.querySelector('body').style.overflow = 'auto';
                        location.reload()
                    }); 

                    ///////////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////// ADD TO CART /////////////////////////////////////
                    const addToCartBtn = document.querySelectorAll('[data-cart="add_to_cart_modal_btn"]');
                    
                    addToCartBtn.forEach((btn, i) => {
                        btn.addEventListener('click', () => {
                            if(localStorage.getItem('logedUser') == null) {
                                setCartNumbers(product);
                                setTotalCost(product);
                                // prodPopMod(product);
                            } else {
                                setCartNumbers(product);
                                setTotalCost(product);
                                // prodPopMod(product);
                            };
                        });
                    });

                    ///////////////////////////////////// cart Numbers /////////////////////////////////////
                    function setCartNumbers(product) {
                        if(localStorage.getItem('logedUser') == null) {
                            let productNumbers = parseInt(localStorage.getItem('localCartNumbers'));
                            let key = 'localCartNumbers'
                            cartNumbers(product, productNumbers, key)
                        } else {
                            let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
                            let key = 'userCartNumbers'
                            cartNumbers(product, productNumbers, key)
                        }

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
                            const key = 'localProductsInCart'
                            setingItem(product, cartItems, key)
                        } else {
                            let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
                            const key = 'userProductsInCart'
                            setingItem(product, cartItems, key)
                        }
                    };

                    ///////////////////////////////////// SPAN /////////////////////////////////////            
                    function setSpan(number) {
                        if(localStorage.getItem('logedUser') == null) { 
                            let productNumbers = parseInt(localStorage.getItem('localCartNumbers'));
                            span(number, productNumbers)
                        } else {
                            let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
                            span(number, productNumbers)
                        }
                    }

                    ///////////////////////////////////// totalCost /////////////////////////////////////
                    function setTotalCost(product) {
                        if(localStorage.getItem('logedUser') == null) { 
                            let cartCost = localStorage.getItem('localTotalCost');
                            const tcKey = "localTotalCost"
                            totalCost(product, cartCost, tcKey)
                        } else {
                            let cartCost = localStorage.getItem('userTotalCost');
                            const tcKey = "userTotalCost"
                            totalCost(product, cartCost, tcKey)
                        }
                    }
                };

                const openProdModBtn = document.querySelectorAll('.open_prod_modal');
                const cardOverlay = document.querySelector('#overlay_cards');
                
                openProdModBtn.forEach((btn, i) => {
                    btn.addEventListener('click', () => {
                        productId(i);
                        document.querySelector('.card_modal').classList.add('show_prod_modal');
                        cardOverlay.classList.add('show_overlay');
                        document.querySelector('body').style.overflow = 'hidden';
                    });
                });


                cardOverlay.addEventListener('click', function () {
                    document.querySelector('.card_modal').classList.remove('show_prod_modal');
                    cardOverlay.classList.remove('show_overlay');
                    document.querySelector('body').style.overflow = 'auto';
                    location.reload()
                });
            });           
    };
    prodModal();
});