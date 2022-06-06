'use strict'

import { setingItem, totalCost, span, prodPopMod } from "./lib.js";
// import { openProdModal } from "./product-modal.js";
// console.log(openProdModal)

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
                                <input type="email" name="email" id="login_email" class="logInp" placeholder="Enter your email">
                                <span class="verify"></span>
                            </div>
                            <label for="password">Password :</label>
                            <div class="input_login">
                                <input type="password" name="password" id="login_password" class="logInp" placeholder="Enter your password">
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
                            <input type="text" name="signin_first_name" id="signin_first_name" class="signInp" placeholder="Your First Name">
                            <span class="verify"></span>
                        </div>
                        <label for="signin_last_name">Last Name:</label>
                        <div class="signin_login">
                            <input type="text" name="signin_last_name" id="signin_last_name" class="signInp" placeholder="Your Last Name">
                            <span class="verify"></span>
                        </div>
                        <label for="signin_email">Email: <span>*</span></label>
                        <div class="signin_login">
                            <input type="email" name="signin_email" id="signin_email" class="signInp" placeholder="Your Email Address">
                            <span class="verify"></span>
                        </div>
                        <label for="signin_password">Password: <span>*</span></label>
                        <div class="signin_login">
                            <input type="password" name="signin_password" id="signin_password" class="signInp" placeholder="Your Password">
                            <i class="far fa-eye-slash" id="togglePassword"></i>
                            <span class="verify"></span>
                        </div>
                        <button class="submit_btn submit_signin_btn" type="submit">Signin</button>
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
                            <input type="text" name="contact_first_name" id="contact_first_name" class="messageInp">
                            <span class="verify"></span>
                        </div>
                        <label for="contact_last_name">Last Name:</label>
                        <div class="contact_login">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" name="contact_last_name" id="contact_last_name" class="messageInp">
                            <span class="verify"></span>
                        </div>
                        <label for="contact_email">Email: <span>*</span></label>
                        <div class="contact_login">
                            <i class="fa-solid fa-at"></i>
                            <input type="email" name="contact_email" id="contact_email" class="messageInp">
                            <span class="verify"></span>
                        </div>
                        <div class="message_login">
                            <label for="message">Message: </label>
                            <textarea name="message" id="message" class="messageInp" cols="30" rows="10" placeholder="Your message"></textarea>
                            <span class="verify"></span>
                        </div>
                        <button class="contact_submit_btn" type="button">Send</button>
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
                if(this.classList.contains('fa-eye')) {
                    this.parentElement.children[0].setAttribute('type', 'password')
                } else {
                    this.parentElement.children[0].setAttribute('type', 'text')
                }
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////// Login  Form /////////////////////////////////////////
        

        const validateLogIn = function() {
            const email = document.querySelector('#login_email');
            const password = document.querySelector('#login_password');
            const formBtn = document.querySelector('.submit_login_btn')
            const popup = document.querySelector('.popup_login');
            const popBtn = document.querySelector('.pop_btn');

            
            formBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if(checkLogInputs() != true) {
                    document.querySelectorAll('.logInp').forEach(inp => {                
                        const inputCont = inp.parentElement;
                        const small = inputCont.querySelector('.verify');
                        
                        if(small.innerHTML !== 'Success!') {
                            if(inp == email) {
                                setErrorFor(email, 'Please enter a valid e-mail address.');
                            };
                            if(inp == password) {
                                setErrorFor(password, 'Please enter your password');
                            };
                        };
                    });
                };
                
                if(checkLogInputs() == true) {
                    let emailValue = document.querySelector('#login_email').value;
                    let passwordValue = document.querySelector('#login_password').value;

                    let formData = JSON.parse(localStorage.getItem('formData')) || [];
                    let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => 
                            data.email.toLowerCase() == emailValue.toLowerCase() && 
                            data.password.toLowerCase() == passwordValue.toLowerCase()
                    );
                    
                    if(!exist){
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login h3').textContent = 'Ooopppssss...!';
                        document.querySelector('.popup_login span').textContent = 'Incorrect login credentials';
                        document.querySelector('.popup_login p').textContent = 'Try again.';
                        document.querySelector('.pop_btn').textContent = 'Log In';
                        popupModClose(exist)
                    } else {
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login span').textContent = `${email}`;
                        document.querySelector('.login_logout_link').style.display = "none";
                        document.querySelector('.loged_user_btn').style.display = "block";
                        document.querySelector('.pop_btn').textContent = 'Go surf';
                        // // setUserBtn();
                        // ///////////////////// Loged User //////////////////////
                        JSON.parse(localStorage.getItem('formData')).find(d => {
                            if(d.email.toLowerCase() === emailValue.toLowerCase() && d.password.toLowerCase() === passwordValue.toLowerCase()) {
                                document.querySelector('.popup_login span').textContent = `${d.firstName} ${d.lastName}`;
                                document.querySelector('.nav_info_top span').textContent = `Welcome ${d.firstName}`
                                let logedUser = JSON.parse(localStorage.getItem('logedUser')) || [];
                                logedUser.push(logedUser);
                                localStorage.setItem('logedUser', JSON.stringify(d));

                            };
                        });
                        popupModClose(exist)
                    };
                };

                function popupModClose(exist) {
                    popBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(exist) {
                            document.querySelector('.submit_signin_btn').disabled = false;
                            const modal = document.querySelector('.modal_wrapper');
                            closeModal(modal);
                            location.reload();
                        } else {
                            // document.querySelector('.submit_signin_btn').disabled = false;
                            document.querySelector('.popup_login').classList.remove('open_popup');
                            document.querySelector('#login_form').reset();
                            document.querySelectorAll('.input_login .verify').forEach(s => {
                                s.innerHTML = '';
                            });
                        };
                    });
                };
            });
        

            //////////////////////////////////////// login validation ////////////////////////////////////////
            email.addEventListener('blur', setLogEmail, true);
            password.addEventListener('blur', setLogPassword, true);

            function checkLogInputs() {
                let retVal = true;
                
                if(setLogEmail() != true) return;
                if(setLogPassword() != true) return;            
                
                return retVal;
            };

            function setLogEmail() {
                let retVal = true;
                const emailValue = email.value.trim();        
                const at = emailValue.indexOf('@');
                const dot = emailValue.indexOf('.');
            
                if(emailValue == null || emailValue == '') {
                    setErrorFor(email, 'Please enter a valid e-mail address.');
                    retVal = false;
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
                return retVal;
            };

            function setLogPassword() {
                let retVal = true;
                const passwordValue = password.value.trim();

                if(passwordValue == '') {
                    setErrorFor(password, 'Please enter a password');
                    retVal = false;
                } else if(passwordValue.length < 8) {
                    setErrorFor(password, 'Password must have min 8 char!');
                    retVal = false;
                } else {
                    setSuccessFor(password, 'Success!');
                };
                
                return retVal;
            };
        };
        validateLogIn();

        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////// Sign In Form ////////////////////////////////////////

        const validateSignIn = function() {
            const formBtn = document.querySelector('.submit_signin_btn')
            const firstName = document.querySelector('#signin_first_name');
            const lastName = document.querySelector('#signin_last_name');
            const email = document.querySelector('#signin_email');
            const password = document.querySelector('#signin_password');
            const popup = document.querySelector('.popup_login');
            const popBtn = document.querySelector('.pop_btn');
            
            formBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if(checkSignInputs() != true) {
                    document.querySelectorAll('.signInp').forEach(inp => {                
                        const inputCont = inp.parentElement;
                        const small = inputCont.querySelector('.verify');
                        
                        if(small.innerHTML !== 'Success!') {
                            if(inp == firstName) {
                                setErrorFor(firstName, 'Please enter a first name.');
                            };
                            if(inp == lastName) {
                                setErrorFor(lastName, 'Please enter a last name.');
                            };
                            if(inp == email) {
                                setErrorFor(email, 'Please enter a valid e-mail address.');
                            };
                            if(inp == password) {
                                setErrorFor(password, 'Please enter your password');
                            };
                        };
                    });
                };
                
                if(checkSignInputs() == true) {
                    document.querySelector('.submit_signin_btn').disabled = true;
                    let firstName = document.querySelector('#signin_first_name').value;
                    let lastName = document.querySelector('#signin_last_name').value;
                    let email = document.querySelector('#signin_email').value;
                    let password = document.querySelector('#signin_password').value;                    

                    let formData = JSON.parse(localStorage.getItem('formData')) || [];
                    
                    let exist = formData.length && 
                        JSON.parse(localStorage.getItem('formData')).some(data => 
                            data.firstName.toLowerCase() == firstName.toLowerCase() &&
                            data.lastName.toLowerCase() == lastName.toLowerCase() &&
                            data.email.toLowerCase() == email.toLowerCase() &&
                            data.password.toLowerCase() == password.toLowerCase()
                        );
                    
                    if(!exist){                        
                        formData.push({firstName, lastName, email, password});
                        localStorage.setItem('formData', JSON.stringify(formData));

                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login h3').textContent = 'Welcome!';
                        document.querySelector('.popup_login span').textContent = `${firstName} ${lastName}`;
                        document.querySelector('.popup_login p').textContent = `You are successfuly signed into DrumCentral`;
                        document.querySelector('.pop_btn').textContent = `Go to LogIn`;
                        popupModClose(exist)
                    } else {
                        popup.classList.add('open_popup');
                        document.querySelector('.popup_login h3').textContent = 'Ooopppssss... Duplicate found!!!';
                        document.querySelector('.popup_login span').textContent = `${firstName} ${lastName}`;
                        document.querySelector('.popup_login p').textContent = 'You have already signed in.';
                        document.querySelector('.pop_btn').textContent = 'Go to LogIn';
                        popupModClose(exist)
                    };
                };

                function popupModClose(exist) {
                    popBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        document.querySelector('.submit_signin_btn').disabled = false;
                        popup.classList.remove('open_popup');
                        
                        const userData = JSON.parse(localStorage.getItem('formData'));                        
                        if(userData) {
                            userData.map(em => {
                                if(em.firstName == document.querySelector('#signin_first_name').value && 
                                    em.lastName == document.querySelector('#signin_last_name').value &&
                                    em.email == document.querySelector('#signin_email').value) {
                                    document.querySelector('#login_email').value = document.querySelector('#signin_email').value;
                                    document.querySelector('#login_password').value = document.querySelector('#signin_password').value;
                                }
                            })
                        }
                        modalContainer.classList.add('slide-login');
                    });
                };
            });

            //////////////////////////////////////// sign validation ////////////////////////////////////////
            firstName.addEventListener('blur', setSignFirstName, true);
            lastName.addEventListener('blur', setSignLastName, true);
            email.addEventListener('blur', setSignEmail, true);
            password.addEventListener('blur', setSignPassword, true);

            function checkSignInputs() {
                let retVal = true;
            
                if(setSignFirstName() != true) return;
                if(setSignLastName() != true) return;
                if(setSignEmail() != true) return;
                if(setSignPassword() != true) return;            
                
                return retVal;
            };

            function setSignFirstName() {
                let retVal = true;
                const firstNameValue = firstName.value.trim();
    
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
                
                return retVal;
            };

            function setSignLastName() {
                let retVal = true;
                const lastNameValue = lastName.value.trim();
    
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
                
                return retVal;
            };

            function setSignEmail() {
                let retVal = true;
                const emailValue = email.value.trim();        
                const at = emailValue.indexOf('@');
                const dot = emailValue.indexOf('.');
            
                if(emailValue == null || emailValue == '') {
                    setErrorFor(email, 'Please enter a valid e-mail address.');
                    retVal = false;
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
                return retVal;
            };

            function setSignPassword() {
                let retVal = true;
                const passwordValue = password.value.trim();
    
                if(passwordValue == '') {
                    setErrorFor(password, 'Please enter a password');
                    retVal = false;
                } else if(passwordValue.length < 8) {
                    setErrorFor(password, 'Password must have min 8 char!');
                    retVal = false;
                } else {
                    setSuccessFor(password, 'Success!');
                };
                
                return retVal;
            };
        };
        validateSignIn();

        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////// Contact Form ////////////////////////////////////////

        function validateContact() {
            const firstName = document.querySelector('#contact_first_name');
            const lastName = document.querySelector('#contact_last_name');
            const email = document.querySelector('#contact_email');
            const message = document.querySelector('#message');
            const contSubBtn = document.querySelector('.contact_submit_btn');

            
            contSubBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if(checkContactInputs() != true) {
                    document.querySelectorAll('.messageInp').forEach(inp => {                
                        const inputCont = inp.parentElement;
                        const small = inputCont.querySelector('.verify');
                        
                        if(small.innerHTML !== 'Success!') {
                            if(inp == firstName) {
                                setErrorFor(firstName, 'Please enter a first name.');
                            };
                            if(inp == lastName) {
                                setErrorFor(lastName, 'Please enter a last name.');
                            };
                            if(inp == email) {
                                setErrorFor(email, 'Please enter a valid e-mail address.');
                            };
                            if(inp == message) {
                                setErrorFor(message, 'Please enter your message.');
                            };
                        };
                    });
                };

                if(checkContactInputs() == true) {
                    let firstName = document.querySelector('#contact_first_name').value;
                    let lastName = document.querySelector('#contact_last_name').value;
                    let email = document.querySelector('#contact_email').value;
                    let message = document.querySelector('#message').value;

                    console.log(firstName, lastName, email, message)
                    // ---TODOO--- //
                };
            });


            //////////////////////////////////////// contact validation ////////////////////////////////////////
            firstName.addEventListener('blur', setContactFirstName, true);
            lastName.addEventListener('blur', setContactLastName, true);
            email.addEventListener('blur', setContactEmail, true);
            message.addEventListener('blur', setContactMessage, true);

            function checkContactInputs() {
                let retVal = true;
            
                if(setContactFirstName() != true) return;
                if(setContactLastName() != true) return;
                if(setContactEmail() != true) return;
                if(setContactMessage() != true) return;            
                
                return retVal;
            };
            
            function setContactFirstName() {
                let retVal = true;
                const firstNameValue = firstName.value.trim();

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
                return retVal;
            };

            
            function setContactLastName() {
                let retVal = true;
                const lastNameValue = lastName.value.trim();

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
                return retVal;
            };

            function setContactEmail() {
                let retVal = true;
                const emailValue = email.value.trim();        
                const at = emailValue.indexOf('@');
                const dot = emailValue.indexOf('.');
            
                if(emailValue == null || emailValue == '') {
                    setErrorFor(email, 'Please enter a valid e-mail address.');
                    retVal = false;
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
                return retVal;
            };

            function setContactMessage() {
                let retVal = true;
                const messageValue = message.value.trim();

                if(messageValue == '') {
                    setErrorFor(message, 'message cannot be blank.');
                    retVal = false;
                } else {
                    setSuccessFor(message, 'Success!');
                };                
                return retVal;
            };
        };
        validateContact();

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
    };
    modals();

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
                    // console.log(item.id)
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
                    // openProdModal(item.id)
                    // openProduct(item)
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
});
