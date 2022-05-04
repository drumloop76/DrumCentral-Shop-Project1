'use strict'

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
                    <form class="signin_form modal_form" id="signin_form" action="#" novalidate>
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
                <button class="pop_btn" data-close-modal>Go Surf</button>
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
                    <form class="form_contact" action="#">
                        <label for="contact_firs_name">First Name:</label>
                        <div class="contact_login">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" name="contact_first_name" id="contact_first_name">
                        </div>
                        <label for="contact_last_name">Last Name:</label>
                        <div class="contact_login">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" name="contact_last_name" id="contact_last_name">
                        </div>
                        <label for="contact_email">Email: <span>*</span></label>
                        <div class="contact_login">
                            <i class="fa-solid fa-at"></i>
                            <input type="email" name="contact_email" id="contact_email" required>
                        </div>
                        <label for="message">Message: <span>*</span></label>
                        <textarea name="message" id="message" cols="30" rows="10" required placeholder="Your message"></textarea>
                        <button class="contact_submit_btn" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
        `
    document.body.insertAdjacentElement('beforeend', modalDiv);

    /*--------------------- Modals -------------------------*/

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
                openModal(modal);
            });
        });

        openContactModalBtn.forEach(btn => {
            btn.addEventListener('click', function () {
                const modal = document.querySelector(btn.dataset.contactTarget);
                openContactModal(modal);
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

        function openModal(mod) {
            if (mod === null) return
            mod.classList.add('active_modal');
            modalWrapper.classList.add('active_modal');
            overlay.classList.add('active_modal');
            modalContainer.style.left = "0px";
            wrapper.style.filter = "blur(3.5px)";
            document.querySelector('body').style.overflow = 'hidden';
        };

        function openContactModal(mod) {
            if (mod === null) return
            mod.classList.add('active_modal');
            contactWrapper.classList.add('active_modal');
            overlay.classList.add('active_modal');
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
                console.log(e.target);
                password.forEach(pass => {
                    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
                    pass.setAttribute('type', type);
                });
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        });

        /*----------------------- Login ---------------------------*/

        const validation = function() {
            const loginForm = document.querySelector('#login_form');
            const email = document.querySelector('#login_email');
            const password = document.querySelector('#login_password');
            const popup = document.querySelector('.popup_login');
            const popBtn = document.querySelector('.pop_btn');
            
            popBtn.addEventListener('click', () => {
                document.querySelector('.popup_login').classList.remove('open_popup');
                email.value = '';
                password.value = '';
            });

            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();

                
                if(checkInputs() === true) {
                    let email = document.querySelector('#login_email').value;
                    let password = document.querySelector('#login_password').value;

                    let formData = JSON.parse(localStorage.getItem('formData')) || [];

                    let exist = formData.length && 
                        JSON.parse(localStorage.getItem('formData')).some(data => 
                            data.email.toLowerCase() == email && 
                            data.password.toLowerCase() == password
                        );
                    if(!exist){
                        alert("Incorrect login credentials");
                        document.querySelector('#login_form').reset();
                    } else {
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login span').textContent = `${email.value}`;
                        document.querySelector('.login_logout_link').textContent = `Log Out`;
                        document.querySelector('.fa-cart-shopping').style.color = '#4893c6';
                    };
                };
            });

            function checkInputs() {
                const emailValue = email.value.trim();
                const passwordValue = password.value.trim();

                let retVal = true;

                if(emailValue === '') {
                    setErrorFor(email, 'Email cannot be blank');
                    retVal = false;
                } else if(!isEmail(emailValue)) {
                    setErrorFor(email, 'Email is not valid!');
                    retVal = false;
                } else {
                    setSuccessFor(email, 'Success!');
                };

                if(passwordValue === '') {
                    setErrorFor(password, 'password cannot be blank');
                    retVal = false;
                } else if(!isPassword(password)) {
                    setErrorFor(password, 'password is not valid!');
                    retVal = false;
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

            function isEmail(email) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            }
            function isPassword(password) {
                return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
            };
        };
        validation();
    };
    modals();

    /*--------------------------------- Product Modal --------------------------------------*/

    function prodModal() {
        fetch('/json-files/cards-products.json')
            .then(results => results.json())
            .then(data => {
                function cardModal(product_id) {
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
                                        <div class="main_img_container">

                                        </div>
                                        <div class="slider_container">
                                            <i class="fa-solid fa-chevron-left" id="btnLeft"></i></i>
                                            <div class="cardSlider"></div> 
                                            <i class="fa-solid fa-chevron-right" id="btnRight"></i>
                                        </div>
                                        <div class="column">
                                            <h1>Shop Now</h1>
                                            <h3 class="card_modal_price"></h3>
                                            <div class="shop_container">
                                                <input value=1 type="number">

                                                <din class="div_cart_btn"></div>
                                                
                                                <a class="side_shop shop open_cart" data-open-cart="open_cart"><i class="fa-solid fa-cart-shopping"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                    document.body.insertAdjacentElement('beforeend', modalDiv);
                    console.log(data[product_id].image)
                    document.querySelector('.card_modal_title').innerHTML =
                            `${data[product_id].name}`
                
                    document.querySelector('.main_img_container').innerHTML =
                            `<img class="main_img" src="${data[product_id].image}">`
                            
                    document.querySelector('.card_modal_price').innerHTML =
                            `Only € ${data[product_id].price}`

                    document.querySelectorAll('.card_modal_list').forEach((mod, i) => {
                        let info = [];
                        for(let j=0 ; j<data[i].description.length; j++) {
                            info += `
                                <li class="card_modal_item">
                                    <i class="fa-solid fa-check"></i>${data[i].description[j]}
                                </li>`
                        };
                        mod.innerHTML = info;
                    });

                    document.querySelector('.div_cart_btn').innerHTML =
                            `<button class="add_cart_btn" data-cart="add_to_cart_modal_btn" id="${data[product_id].id}">
                                <span class="circle" aria-hidden="true">
                                    <span class="icon arrow"></span>
                                </span>
                                <span class="button-text">Add to card</span>
                            </button>`
                            
                    ////////////////// Modal Slider //////////////////   
                    let col = [];
                    for(let i=0 ; i<data[product_id].colors.length; i++) {
                        col += `<img class="thumbnail" src="/${data[product_id].colors[i]}">`
                    };
                        
                    document.querySelector('.cardSlider').innerHTML = 
                        `<img class="thumbnail activePic" src="${data[product_id].image}">
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
                    
                    document.querySelector('.close_prod_modal_btn').addEventListener('click', (e) => {
                        console.log(e)
                        document.querySelector('.card_modal').classList.remove('show_prod_modal');
                        slider.scrollLeft = 0;
                        cardOverlay.classList.remove('show_overlay');
                        document.querySelector('body').style.overflow = 'auto';
                    }); 

                    ////////////////////////////////////////////////////////////
                    // ///////////////////// ADD TO CART ?????????????????????
                    
                    const addToCartBtn = document.querySelectorAll('[data-cart="add_to_cart_modal_btn"]');
                    
                    addToCartBtn.forEach((btn, i) => {
                        btn.addEventListener('click', (e) => {
                            cartNumbers(data[product_id]);
                            totalCost(data[product_id]);
                        });
                    });

                    // -------------------- cartNumbers -------------------
                    function cartNumbers(product) {
                        let productNumbers = localStorage.getItem('cartNumbers');
                        productNumbers = parseInt(productNumbers);
                        
                        if(productNumbers) {
                            localStorage.setItem('cartNumbers', productNumbers + 1);
                            span(productNumbers + 1);
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
                            cartItems[product.name].inCart += 1;
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
                        const numSpan = document.querySelectorAll('.shop span');

                        numSpan.forEach(s => {
                            s.textContent = `${number}`;
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
                        };
                    };
                };

                const openProdModBtn = document.querySelectorAll('.open_prod_modal');
                const cardOverlay = document.querySelector('#overlay_cards');
                
                openProdModBtn.forEach((btn, i) => {
                    btn.addEventListener('click', () => {
                        cardModal(i);
                        document.querySelector('.card_modal').classList.add('show_prod_modal');
                        cardOverlay.classList.add('show_overlay');
                        document.querySelector('body').style.overflow = 'hidden';
                    });
                });
                
                cardOverlay.addEventListener('click', function () {
                    document.querySelector('.card_modal').classList.remove('show_prod_modal');
                    cardOverlay.classList.remove('show_overlay');
                    document.querySelector('body').style.overflow = 'auto';
                });
            });
    };
    prodModal();
});

// window.addEventListener( "DOMContentLoaded", function () {
//     const modalDiv = document.createElement('div');
    
//     modalDiv.innerHTML = `
//         <div class="modal_wrapper modal" id="loginModal">
//             <div class="modal_container">
//                 <div class="login_modal_container modals">
//                     <button class="close_modal_btn" data-close-modal>
//                         <i class="fa-solid fa-xmark"></i>
//                     </button>
//                     <h1 class="login_header modal_header">Log into DrumCentral</h1>
//                     <div class="form_container">
//                         <form class="login_form modal_form" id="login_form" action="/" novalidate>
//                             <label for="email">Email address :</label>
//                             <div class="input_login email_cont">
//                                 <input type="email" name="email" id="login_email" placeholder="Enter your email">
//                                 <span class="verify"></span>
//                             </div>
//                             <label for="password">Password :</label>
//                             <div class="input_login">
//                                 <input type="password" name="password" id="login_password" class="pass" placeholder="Enter your password">
//                                 <i class="far fa-eye-slash" id="togglePassword"></i>
//                                 <span class="verify"></span>
//                             </div>
//                             <button class="submit_login_btn submit_btn" type="submit">Login</button>
//                         </form>

//                         <div class="divider">
//                             <div class="divider_line_up"></div>
//                             <div class="divider_text"><span>or</span></div>
//                             <div class="divider_line_down"></div>
//                         </div>

//                         <div class="login_media">
//                             <button class="log_media_btn">
//                                 <i class="fab fa-facebook-f icon"></i>
//                                 <span>Log in with Facebook</span>
//                             </button>
//                             <button class="log_media_btn">
//                                 <i class="fab fa-twitter icon"></i>
//                                 <span>Log in with Twitter</span>
//                             </button>
//                             <button class="log_media_btn">
//                                 <i class="fab fa-linkedin-in icon"></i>
//                                 <span>Log in with Linkedin</span>
//                             </button>
//                         </div>
//                     </div>
                    
//                     <a class="signin_form_btn">Sign In.</a>
//                 </div>

                
//                 <div class="signin_modal_container modals">
//                     <button class="close_modal_btn" data-close-modal>
//                         <i class="fa-solid fa-xmark"></i>
//                     </button>
//                     <button class="go_back">
//                         <i class="fa-solid fa-angle-left"></i>go back</button>
//                     <h1 class="signin_header modal_header">Sign In</h1>
//                     <form class="signin_form modal_form" id="signin_form" action="#" novalidate>
//                         <label for="signin_first_name">First Name:</label>
//                         <div class="signin_login">
//                             <input type="text" name="signin_first_name" id="signin_first_name" placeholder="Your First Name">
//                             <span class="verify"></span>
//                         </div>
//                         <label for="signin_last_name">Last Name:</label>
//                         <div class="signin_login">
//                             <input type="text" name="signin_last_name" id="signin_last_name" placeholder="Your Last Name">
//                             <span class="verify"></span>
//                         </div>
//                         <label for="signin_email">Email: <span>*</span></label>
//                         <div class="signin_login">
//                             <input type="email" name="signin_email" id="signin_email" placeholder="Your Email Address" required>
//                             <span class="verify"></span>
//                         </div>
//                         <label for="signin_password">Password: <span>*</span></label>
//                         <div class="signin_login">
//                             <input type="password" name="signin_password" id="signin_password" class="pass" placeholder="Your Password" required>
//                             <i class="far fa-eye-slash" id="togglePassword"></i>
//                             <span class="verify"></span>
//                         </div>
//                         <button class="submit_btn" type="submit">Signin</button>
//                     </form>
//                 </div>
//             </div>

//             <div class="popup_login">
//                 <h3>Welcome back</h3>
//                 <span></span>
//                 <p>You are successfuly loged into DrumCentral!</p>
//                 <button class="pop_btn" data-close-modal>Go Surf</button>
//             </div>
//         </div>

//         <div class="contact_wrapper modal_wrapper modal" id="contactModal">
//             <div class="modal_container">
//                 <div class="container_left"></div>
                
//                 <div class="container_right">
//                     <button class="close_modal_btn" data-close-modal>
//                         <i class="fa-solid fa-xmark"></i>
//                     </button>
//                     <h1>Contact Us</h1>
//                     <form class="form_contact" action="#">
//                         <label for="contact_firs_name">First Name:</label>
//                         <div class="contact_login">
//                             <i class="fa-solid fa-user"></i>
//                             <input type="text" name="contact_first_name" id="contact_first_name">
//                         </div>
//                         <label for="contact_last_name">Last Name:</label>
//                         <div class="contact_login">
//                             <i class="fa-solid fa-user"></i>
//                             <input type="text" name="contact_last_name" id="contact_last_name">
//                         </div>
//                         <label for="contact_email">Email: <span>*</span></label>
//                         <div class="contact_login">
//                             <i class="fa-solid fa-at"></i>
//                             <input type="email" name="contact_email" id="contact_email" required>
//                         </div>
//                         <label for="message">Message: <span>*</span></label>
//                         <textarea name="message" id="message" cols="30" rows="10" required placeholder="Your message"></textarea>
//                         <button class="contact_submit_btn" type="submit">Send</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//         `
//     document.body.insertAdjacentElement('beforeend', modalDiv);

//     /*--------------------- Modals -------------------------*/

//     const modals = function () {
//         const openModalBtn = document.querySelectorAll('[data-modal-target]');
//         const openContactModalBtn = document.querySelectorAll('[data-contact-target]');
//         const closeModalBtn = document.querySelectorAll('[data-close-modal]');
//         const overlay = document.querySelector('#overlay');

//         const modalWrapper = document.querySelector('.modal_wrapper');
//         const contactWrapper = document.querySelector('.contact_wrapper');
//         const modalContainer = document.querySelector('.modal_container');
//         const signInBtn = document.querySelector('.signin_form_btn');
//         const logInBtn = document.querySelector('.go_back');
        
//         const togglePassword = document.querySelectorAll('#togglePassword');
//         const password = document.querySelectorAll('.pass');
//         const wrapper = document.querySelector('.wrapper');

//         openModalBtn.forEach(btn => {
//             btn.addEventListener('click', function () {
//                 const modal = document.querySelector(btn.dataset.modalTarget);
//                 openModal(modal);
//             })
//         })

//         openContactModalBtn.forEach(btn => {
//             btn.addEventListener('click', function () {
//                 const modal = document.querySelector(btn.dataset.contactTarget);
//                 openContactModal(modal);
//             })
//         })

//         closeModalBtn.forEach(btn => {
//             btn.addEventListener('click', function () {
//                 const modal = btn.closest('.modal_wrapper');
//                 closeModal(modal);
//             })
//         })

//         overlay.addEventListener('click', function () {
//             const modal = document.querySelector('.active_modal');
//             closeModal(modal);
//         })

//         function openModal(mod) {
//             if (mod === null) return
//             mod.classList.add('active_modal');
//             modalWrapper.classList.add('active_modal');
//             overlay.classList.add('active_modal');
//             modalContainer.style.left = "0px";
//             wrapper.style.filter = "blur(3.5px)";
//             document.querySelector('body').style.overflow = 'hidden';
//         }

//         function openContactModal(mod) {
//             if (mod === null) return
//             mod.classList.add('active_modal');
//             contactWrapper.classList.add('active_modal');
//             overlay.classList.add('active_modal');
//             wrapper.style.filter = "blur(3.5px)";
//             document.querySelector('body').style.overflow = 'hidden';
//         }

//         function closeModal(modal) {
//             if(modal === null) return
//             modal.classList.remove('active_modal');
//             overlay.classList.remove('active_modal');
//             modalWrapper.classList.remove('active_modal');
//             contactWrapper.classList.remove('active_modal');
//             modalContainer.classList.remove('slide-login');
//             modalContainer.classList.remove('slide-signin');
//             wrapper.style.filter = "";
//             document.querySelector('body').style.overflow = 'auto';
//         }

//         signInBtn.addEventListener('click', function () {
//             modalContainer.classList.add('slide-signin');
//             modalContainer.classList.remove('slide-login');
//         })

//         logInBtn.addEventListener('click', () => {
//             modalContainer.classList.remove('slide-signin');
//             modalContainer.classList.add('slide-login');
//         })

//         togglePassword.forEach(icon => {
//             icon.addEventListener('click', function(e) {
//                 console.log(e.target);
//                 password.forEach(pass => {
//                     const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
//                     pass.setAttribute('type', type);
//                     console.log(type)
//                 })
//                 this.classList.toggle('fa-eye');
//                 this.classList.toggle('fa-eye-slash');
//             })
//         })

//         /*----------------------- Login ---------------------------*/

//         const validation = function() {
//             const loginForm = document.querySelector('#login_form');
//             const email = document.querySelector('#login_email');
//             const password = document.querySelector('#login_password');
//             const popup = document.querySelector('.popup_login');
//             const popBtn = document.querySelector('.pop_btn');
            
//             popBtn.addEventListener('click', () => {
//                 document.querySelector('.popup_login').classList.remove('open_popup')
//                 email.value = ''
//                 password.value = ''
//             })

//             loginForm.addEventListener('submit', (e) => {
//                 e.preventDefault();

                
//                 if(checkInputs() === true) {
//                     let email = document.querySelector('#login_email').value;
//                     let password = document.querySelector('#login_password').value;

//                     let formData = JSON.parse(localStorage.getItem('formData')) || [];

//                     let exist = formData.length && 
//                         JSON.parse(localStorage.getItem('formData')).some(data => 
//                             data.email.toLowerCase() == email && 
//                             data.password.toLowerCase() == password
//                         );
//                     if(!exist){
//                         alert("Incorrect login credentials");
//                         document.querySelector('#login_form').reset();
//                     }
//                     else{
//                         popup.classList.add('open_popup');
//                         document.querySelector('.popup_login span').textContent = `${email.value}`;
//                         document.querySelector('.login_logout_link').textContent = `Log Out`;
//                         document.querySelector('.fa-cart-shopping').style.color = '#4893c6';
//                     }
//                 }
//             });

//             function checkInputs() {
//                 const emailValue = email.value.trim();
//                 const passwordValue = password.value.trim();

//                 let retVal = true;

//                 if(emailValue === '') {
//                     setErrorFor(email, 'Email cannot be blank');
//                     retVal = false;
//                 } else if(!isEmail(emailValue)) {
//                     setErrorFor(email, 'Email is not valid!');
//                     retVal = false;
//                 } else {
//                     setSuccessFor(email, 'Success!');
//                 };

//                 if(passwordValue === '') {
//                     setErrorFor(password, 'password cannot be blank');
//                     retVal = false;
//                 } else if(!isPassword(password)) {
//                     setErrorFor(password, 'password is not valid!');
//                     retVal = false;
//                 } else if(passwordValue.length < 8) {
//                     setErrorFor(password, 'Email must have min 8 char!');
//                     retVal = false;
//                 } else {
//                     setSuccessFor(password, 'Success!');
//                 };
                
//                 return retVal;
//             }
            
//             function setErrorFor(input, message) {
//                 const inputCont = input.parentElement;
//                 const small = inputCont.querySelector('span');

//                 small.innerHTML = message;
//                 small.classList = 'verify error';
//             }

//             function setSuccessFor(input, message) {
//                 const inputCont = input.parentElement;
//                 const small = inputCont.querySelector('span');

//                 small.innerHTML = message;
//                 small.classList = 'verify success';
//             }

//             function isEmail(email) {
//                 return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
//             }
//             function isPassword(password) {
//                 return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
//             }
//         }
//         validation();
//     }
//     modals();

//     /*--------------------------------- Product Modal --------------------------------------*/

//     function prodModal() {
//         fetch('/json-files/cards-products.json')
//             .then(results => results.json())
//             .then(data => {
//                 function cardModal(product_id) {
//                     // console.log(product_id)
//                     const modalDiv = document.createElement('div');
//                     modalDiv.innerHTML = `
//                         <!-- <div class="prod_modal_wrapper modal" id="productModal"> -->
//                             <div class="card_modal">
//                                 <button class="close_modal_btn" data-close-modal>
//                                     <i class="fa-solid fa-xmark"></i>
//                                 </button>
//                                 <div class="mod_cont">
//                                     <div class="card_modal_content">
//                                         <h3 class="card_modal_title"></h3>
//                                         <p class="card_modal_description">
//                                             Lorem ipsum dolor sit amet consectetur, adipisicing
//                                             elit. Cupiditate officiis optio officia repudiandae harum adipisci neque repellendus
//                                             minus laboriosam eaque.
//                                         </p>
//                                         <ul class="card_modal_list"></ul>
//                                     </div>
//                                     <div class="card_modal_media">
//                                         <div class="main_img_container">

//                                         </div>
//                                         <div class="slider_container">
//                                             <i class="fa-solid fa-angle-left" id="btnLeft"></i>
//                                             <div class="cardSlider"></div> 
//                                             <i class="fa-solid fa-chevron-right" id="btnRight"></i>
//                                         </div>
//                                         <div class="column">
//                                             <h1>Shop Now</h1>
//                                             <h3 class="card_modal_price"></h3>
//                                             <div class="shop_container">
//                                                 <input value=1 type="number">
//                                                 <din class="div_cart_btn"></div>
                                                
//                                                 <!-- <button class="shop open_cart">Go to Cart</button> -->
//                                                 <a class="side_shop shop open_cart"><i class="fa-solid fa-cart-shopping"></i></a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         <!-- </div> -->
//                         `
//                     // console.log(data[product_id].id)
//                     document.body.insertAdjacentElement('beforeend', modalDiv);
                    
//                     document.querySelector('.card_modal_title').innerHTML =
//                             `${data[product_id].name}`
                
//                     document.querySelector('.main_img_container').innerHTML =
//                             `<img class="main_img" src="${data[product_id].image}">`
                            
//                     document.querySelector('.card_modal_price').innerHTML =
//                             `Only € ${data[product_id].price}`

//                     document.querySelector('.card_modal_list').innerHTML =
//                             `<li class="card_modal_item">
//                                 <i class="fa-solid fa-check"></i>${data[product_id].description}
//                             </li>`

//                     // ??????????????????????????????
//                     document.querySelector('.div_cart_btn').innerHTML =
//                             `<button class="add_cart_btn" id="${data[product_id].id}">
//                                 <span class="circle" aria-hidden="true">
//                                     <span class="icon arrow"></span>
//                                 </span>
//                                 <span class="button-text">Add to card</span>
//                             </button>`
                            
//                     let col = [];
//                     for(let i=0 ; i<data[product_id].colors.length; i++) {
//                         col += `<img class="thumbnail" src="${data[product_id].colors[i]}">`
//                     }
                        
//                     document.querySelector('.cardSlider').innerHTML = 
//                         `<img class="thumbnail activePic" src="${data[product_id].image}">
//                         ${col}`
                        
//                     const sliderPics = document.querySelectorAll('.thumbnail');
//                     const activePic = document.querySelectorAll('.activePic');
                    
//                     document.querySelectorAll('.main_img').forEach((el) => {
//                         for(let i=0; i<sliderPics.length; i++){
//                             sliderPics[i].addEventListener('mouseover', function(){
//                                 if (activePic.length > 0){
//                                     activePic[0].classList.remove('activePic');
//                                 };
//                                 this.classList.add('activePic');
//                                 el.src = this.src;
//                             });
//                         };
                        
//                     });
                    
//                     // const btnLeft = document.querySelectorAll('#btnLeft');
//                     // const btnRight = document.querySelectorAll('#btnRight');
//                     const slider = document.querySelector('.cardSlider');
//                     // console.log(slider, btnLeft)

//                     document.querySelector('#btnLeft').addEventListener('click', function(){
//                         slider.scrollLeft -= 100;
//                     });

//                     document.querySelector('#btnRight').addEventListener('click', function(){
//                         slider.scrollLeft += 100;
//                     });
                    
//                     document.querySelector('.close_modal_btn').addEventListener('click', (e) => {
//                         // document.querySelector('.prod_modal_wrapper').classList.remove('active_modal');
//                         document.querySelector('.card_modal').classList.remove('show_prod_modal');
//                         slider.scrollLeft = 0;
//                         cardOverlay.classList.remove('show_overlay');
//                         document.querySelector('body').style.overflow = 'auto';
//                     }); 

                    
                    
                    
//                 }    

//                 const openProdModBtn = document.querySelectorAll('.open_prod_modal');
//                 const cardOverlay = document.querySelector('#overlay_cards');

//                 openProdModBtn.forEach((btn, i) => {
//                     btn.addEventListener('click', () => {
//                         cardModal(i);
//                         document.querySelector('.card_modal').classList.add('show_prod_modal');
//                         cardOverlay.classList.add('show_overlay');
//                         document.querySelector('body').style.overflow = 'hidden';
//                     });
//                 });
                
//             }) 
//     }
//     prodModal()
// })