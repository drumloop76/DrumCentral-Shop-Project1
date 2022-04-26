'use strict'

window.addEventListener( "DOMContentLoaded", function () {
    const modalDiv = document.createElement('div');
    
    modalDiv.innerHTML = `
        <div class="modal_wrapper modal" id="loginModal">
            <div class="modal_container">
                <div class="login_modal_container modals">
                    <button class="close_modal_btn" data-close-modal>&times;</button>
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
                    
                    <a href="#" class="signin_form_btn">Sign In.</a>
                </div>

                
                <div class="signin_modal_container modals">
                    <button class="close_modal_btn" data-close-modal>&times;</button>
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
                <div class="container_left">
                    <p>rrrrrrrrrrrrrrrrrrrrr</p>
                </div>
                
                <div class="container_right">
                    <button class="close_modal_btn" data-close-modal>&times;</button>
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
            })
        })

        openContactModalBtn.forEach(btn => {
            btn.addEventListener('click', function () {
                const modal = document.querySelector(btn.dataset.contactTarget);
                openContactModal(modal);
            })
        })

        closeModalBtn.forEach(btn => {
            btn.addEventListener('click', function () {
                const modal = btn.closest('.modal_wrapper');
                closeModal(modal);
            })
        })

        overlay.addEventListener('click', function () {
            const modal = document.querySelector('.active_modal');
            closeModal(modal);
        })

        function openModal(mod) {
            if (mod === null) return
            mod.classList.add('active_modal');
            modalWrapper.classList.add('active_modal');
            overlay.classList.add('active_modal');
            modalContainer.style.left = "0px";
            wrapper.style.filter = "blur(3.5px)";
            document.querySelector('body').style.overflow = 'hidden';
        }

        function openContactModal(mod) {
            if (mod === null) return
            mod.classList.add('active_modal');
            contactWrapper.classList.add('active_modal');
            overlay.classList.add('active_modal');
            wrapper.style.filter = "blur(3.5px)";
            document.querySelector('body').style.overflow = 'hidden';
        }

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
        }

        signInBtn.addEventListener('click', function () {
            modalContainer.classList.add('slide-signin');
            modalContainer.classList.remove('slide-login');
        })

        logInBtn.addEventListener('click', () => {
            modalContainer.classList.remove('slide-signin');
            modalContainer.classList.add('slide-login');
        })

        togglePassword.forEach(icon => {
            icon.addEventListener('click', function(e) {
                console.log(e.target);
                password.forEach(pass => {
                    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
                    pass.setAttribute('type', type);
                    console.log(type)
                })
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            })
        })

        /*----------------------- Login ---------------------------*/

        const validation = function() {
            const loginForm = document.querySelector('#login_form');
            const email = document.querySelector('#login_email');
            const password = document.querySelector('#login_password');
            const popup = document.querySelector('.popup_login');
            const popBtn = document.querySelector('.pop_btn');
            
            popBtn.addEventListener('click', () => {
                document.querySelector('.popup_login').classList.remove('open_popup')
                email.value = ''
                password.value = ''
            })

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
                    }
                    else{
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login span').textContent = `${email.value}`;
                        document.querySelector('.login_logout_link').textContent = `Log Out`;
                        document.querySelector('.fa-cart-shopping').style.color = '#4893c6';
                    }
                }
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
            }
            
            function setErrorFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');

                small.innerHTML = message;
                small.classList = 'verify error';
            }

            function setSuccessFor(input, message) {
                const inputCont = input.parentElement;
                const small = inputCont.querySelector('span');

                small.innerHTML = message;
                small.classList = 'verify success';
            }

            function isEmail(email) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            }
            function isPassword(password) {
                return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
            }
        }
        validation();
    }
    modals();
})