"use strict"
window.addEventListener( "DOMContentLoaded", function () {
    function onPageLoad() {
        let logedUser = JSON.parse(localStorage.getItem("logedUser"));
        const firstName = document.querySelector('#billing_first_name');
        const lastName = document.querySelector('#billing_last_name');
        const email = document.querySelector('#billing_email');

        document.querySelector('.delivery_legend').style.display = 'none';
        document.querySelector('.delivery_form_wrapper').style.display = 'none';

        if(localStorage.getItem('localProductsInCart') != null || localStorage.getItem('userProductsInCart') != null) {
            document.querySelector('.buy_now_btn').style.background = 'black';
            document.querySelector('.buy_now_btn').disabled = false;
        } else if(localStorage.getItem('localProductsInCart') == null || localStorage.getItem('userProductsInCart') == null) {
            document.querySelector('.buy_now_btn').style.background = 'red';
            document.querySelector('.buy_now_btn').style.cursor = 'not-allowed'
            document.querySelector('.buy_now_btn').setAttribute("disabled", "")
            // alert(`Your cart is empty. Put product in cart`);
        }

        if(localStorage.getItem('logedUser') == null) return;    

        let firstNameValue = logedUser.firstName,
            lastNameValue = logedUser.lastName,
            emailValue = logedUser.email;

        firstName.value = firstNameValue;
        lastName.value = lastNameValue;
        email.value = emailValue;

        label();
    };
    onPageLoad()



    console.log(document.querySelector('.shipping_costs_full'))

    function checkout() {;
        if(localStorage.getItem('logedUser') == null && 
            localStorage.getItem("localProductsInCart") == undefined || 
            localStorage.getItem('logedUser') != null && 
            localStorage.getItem("userProductsInCart") == undefined) return;
        
        if(localStorage.getItem('logedUser') == null) {
            let cartItems = JSON.parse(localStorage.getItem("localProductsInCart"));
            let totalCost = JSON.parse(localStorage.getItem("localTotalCost"));
            let itemsInCart = JSON.parse(localStorage.getItem("localCartNumbers"));
            let items = Object.values(cartItems);
            basketItems(items, totalCost, itemsInCart);
        } else {
            let cartItems = JSON.parse(localStorage.getItem("userProductsInCart"));
            let totalCost = JSON.parse(localStorage.getItem("userTotalCost"));
            let itemsInCart = JSON.parse(localStorage.getItem("userCartNumbers"));
            let items = Object.values(cartItems);
            basketItems(items, totalCost, itemsInCart);
        };
        
        function basketItems(items, totalCost, itemsInCart) {
            for(let i=0 ; i<items.length ; i++) {
                document.querySelector('.basket_products').innerHTML += `
                        <div class="basket_product_cont">
                            <div class="basket_product_info">
                                <p class="product_name">${items[i].name}</p>
                                <span class="stock">${items[i].stock === true ? 'In stock' : 'Available soon'}</span>
                            </div>
                            <div class="basket_product_quantity">
                                <span>x ${items[i].inCart}</span>
                            </div>
                            <div class="basket_price_div">
                                <!--<span class="price_single">€ ${items[i].price}</span>-->
                                <span class="price_full">€${items[i].price * items[i].inCart}</span>
                            </div>
                        </div>
                        `
                const stock = document.querySelectorAll('.stock');
                for(let s of stock) {
                    if(s.textContent === 'In stock') {
                        s.classList.add('green');
                    } else {
                        s.classList.add('yellow');
                    };
                };
            };
            if(JSON.parse(localStorage.getItem("checkShippingCost"))) {
                console.log(JSON.parse(localStorage.getItem("checkShippingCost")))
            }
            
            let totalPrice = document.querySelector('.total_price');
            totalPrice.innerHTML = `€ ${totalCost + JSON.parse(localStorage.getItem("checkShippingCost"))}`;

            let totalQuantity = document.querySelector('.total_quantity');
            totalQuantity.innerHTML = itemsInCart;

            function shippingCosts() {
                let shipCostsSpan = document.querySelector('.shipping_costs_full');    
                let shipCostNumber = 0;
            
                if(itemsInCart < 5) {
                    // console.log('1', itemsInCart)
                    shipCostsSpan.innerHTML = `€ 15`;
                    shipCostNumber = 15;
                } else if(itemsInCart == 5 || itemsInCart <= 10) {
                    // console.log('2', itemsInCart)
                    shipCostsSpan.innerHTML = `€ 35`;
                    shipCostNumber = 35;
                } else if(itemsInCart > 10) {
                    // console.log('3', itemsInCart)
                    shipCostsSpan.innerHTML = `€ 55`;
                    shipCostNumber = 55;
                };
                console.log(shipCostNumber)
                localStorage.setItem('checkShippingCost', shipCostNumber)
            };
            shippingCosts()
        };
    };
    checkout();
})
////////////////////////////// label ///////////////////////////////
function label() {
    const inputEl = document.querySelectorAll('.form_control input');

    inputEl.forEach(el => {
        
        if(el.value) {
            el.previousElementSibling.classList.add('move_label');
        };

        el.addEventListener('focus', function(e) {            
            this.previousElementSibling.classList.add('move_label');
        });
        el.addEventListener('blur', function(e) {
            if(el.value != 0) return;
            this.previousElementSibling.classList.remove('move_label');
        });
    });
};
label();

/////////////////////////////// fetch API ////////////////////////////
const fetchCountry = async(e) => {
	const apiEndpoint = 'https://restcountries.com/v2/all';
    const countries = document.querySelector('#billing_country');
    const phone = document.querySelector('#billing_phone');
    const countriesDel = document.querySelector('#delivery_country');
    
	await fetch(apiEndpoint)
		.then(res => res.json())
		.then(data => {
            data.forEach(el => {
                countries.innerHTML += `<option value="${el.name}">${el.name}</option>`;
                countriesDel.innerHTML += `<option value="${el.name}">${el.name}</option>`;
                
                countries.addEventListener('change', function(e) {
                    if(el.name === e.target.value) {
                        phone.value = `+${el.callingCodes[0]} `;
                        phone.parentElement.previousElementSibling.classList.add('move_label');
                    };
                });

                
            });
        });

    /////////////////////////////////// Shipping costs //////////////////////////////////////
            
    


    // const countries = document.querySelector('#billing_country'),
    //      phone = document.querySelector('#billing_phone'),
    const firstName = document.querySelector('#billing_first_name'),
        lastName = document.querySelector('#billing_last_name'),
        email = document.querySelector('#billing_email'),
        street = document.querySelector('#billing_street'),
        zip = document.querySelector('#billing_zip'),
        town = document.querySelector('#billing_town');
        
    // const countriesDel = document.querySelector('#delivery_country'),
    const firstNameDel = document.querySelector('#delivery_first_name'),
        lastNameDel = document.querySelector('#delivery_last_name'),
        streetDel = document.querySelector('#delivery_street'),
        zipDel = document.querySelector('#delivery_zip'),
        townDel = document.querySelector('#delivery_town');


    const checkoutBtn = function() {
        document.querySelector('.buy_now_btn').addEventListener('click', function(e) {
            e.preventDefault();

            /////////////////////////////// Validate & submit forms data ////////////////////////////////////
            let user = '';
            if(localStorage.getItem('logedUser') == null) { 
                user = 'false';
            } else {
                user = 'true';            
            };        
            
            if(checkBillingInputs() != true) {
                document.querySelectorAll('.bill').forEach(inp => {                
                    const inputCont = inp.parentElement;
                    const small = inputCont.querySelector('.verify');
                    
                    if(small.innerHTML !== 'Success!') {
                        if(inp == firstName) {
                            setErrorFor(firstName, 'Please enter a first name');
                        } 
                        if(inp == lastName) {
                            setErrorFor(lastName, 'Please enter a last name');
                        } 
                        if(inp == email) {
                            setErrorFor(email, 'Please enter a valid e-mail address.');
                        } 
                        if(inp == street) {
                            setErrorFor(street, 'Enter your Street and Number.');
                        } 
                        if(inp == zip) {
                            setErrorFor(zip, 'Enter your Postal Code');
                        } 
                        if(inp == town) {
                            setErrorFor(town, 'Please enter a city');
                        } 
                        if(inp == countries) {
                            setErrorFor(countries, 'Select your Country.');
                        };
                    };
                });
            };

            if(checkDeliveryInputs() != true) {
                document.querySelectorAll('.del').forEach(inp => {                
                    const inputCont = inp.parentElement;
                    const small = inputCont.querySelector('.verify');
                    
                    if(small.innerHTML !== 'Success!') {
                        if(inp == firstNameDel) {
                            setErrorFor(firstNameDel, 'Please enter a first name');
                        } 
                        if(inp == lastNameDel) {
                            setErrorFor(lastNameDel, 'Please enter a last name');
                        } 
                        if(inp == streetDel) {
                            setErrorFor(streetDel, 'Enter your Street and Number.');
                        } 
                        if(inp == zipDel) {
                            setErrorFor(zipDel, 'Enter your PostCode');
                        } 
                        if(inp == townDel) {
                            setErrorFor(townDel, 'Please enter a city');
                        } 
                        if(inp == countriesDel) {
                            setErrorFor(countriesDel, 'Select your Country.');
                        };
                    };
                });
            };

            const firstNameVal = document.querySelector('#billing_first_name').value,
                lastNameVal = document.querySelector('#billing_last_name').value,
                emailVal = document.querySelector('#billing_email').value,
                streetVal = document.querySelector('#billing_street').value,
                zipVal = document.querySelector('#billing_zip').value,
                phoneVal = document.querySelector('#billing_phone').value,
                townVal = document.querySelector('#billing_town').value,
                countryVal = document.querySelector('#billing_country').value;

            const firstNameDelVal = document.querySelector('#delivery_first_name').value,
                lastNameDelVal = document.querySelector('#delivery_last_name').value,
                streetDelVal = document.querySelector('#delivery_street').value,
                zipDelVal = document.querySelector('#delivery_zip').value,
                townDelVal = document.querySelector('#delivery_town').value,
                countryDelVal = document.querySelector('#delivery_country').value;

            if(checkBillingInputs() == true && document.querySelector('.checkbox').checked == false) {
                // console.log('true & false 111')
                let billingData = JSON.parse(localStorage.getItem('checkBillingData')) || [];
                // console.log("1-1 :", firstNameVal, lastNameVal, emailVal, streetVal, townVal, zipVal, countryVal, phoneVal, user)
                billingData.push({firstNameVal, lastNameVal, emailVal, streetVal, townVal, zipVal, countryVal, phoneVal, user});
                localStorage.setItem('checkBillingData', JSON.stringify(billingData));

                let deliveryData = JSON.parse(localStorage.getItem('checkDeliveryData')) || [];
                // console.log("1-2 :", firstNameVal, lastNameVal, streetVal, townVal, zipVal, countryVal)         
                deliveryData.push({firstNameVal, lastNameVal, streetVal, townVal, zipVal, countryVal});
                localStorage.setItem('checkDeliveryData', JSON.stringify(deliveryData));

            } else if(checkDeliveryInputs() == true && document.querySelector('.checkbox').checked == true) {
                // console.log("true & true 222")
                let billingData = JSON.parse(localStorage.getItem('checkBillingData')) || [];
                // console.log("2-1 :", firstNameVal, lastNameVal, emailVal, streetVal, townVal, zipVal, countryVal, phoneVal, user)
                billingData.push({firstNameVal, lastNameVal, emailVal, streetVal, townVal, zipVal, countryVal, phoneVal, user});
                localStorage.setItem('checkBillingData', JSON.stringify(billingData));

                let deliveryData = JSON.parse(localStorage.getItem('checkDeliveryData')) || [];
                // console.log("2-2 :", firstNameDelVal, lastNameDelVal, streetDelVal, townDelVal, zipDelVal, countryDelVal, user)
                deliveryData.push({firstNameDelVal, lastNameDelVal, streetDelVal, townDelVal, zipDelVal, countryDelVal, user});
                localStorage.setItem('checkDeliveryData', JSON.stringify(deliveryData));
            };

            
        });
        // shippingCosts()
    };
    checkoutBtn();


    firstName.addEventListener('blur', setFirstName, true)
    lastName.addEventListener('blur', setLastName, true);
    email.addEventListener('blur', setEmail, true);
    street.addEventListener('blur', setStreet, true);
    zip.addEventListener('blur', setZip, true);
    town.addEventListener('blur', setTown, true);
    countries.addEventListener('blur', setCountries, true);


    function checkBillingInputs() {
        let retVal = true;
        
        if(setFirstName() != true) return;
        if(setLastName() != true) return;
        if(setEmail() != true) return;
        if(setStreet() != true) return;
        if(setZip() != true) return;
        if(setTown() != true) return;
        if(setCountries() != true) return;
        
        return retVal;
    };

    firstNameDel.addEventListener('blur', setFirstNameDel, true);
    lastNameDel.addEventListener('blur', setLastNameDel, true);
    streetDel.addEventListener('blur', setStreetDel, true);
    zipDel.addEventListener('blur', setZipDel, true);
    townDel.addEventListener('blur', setTownDel, true);
    countriesDel.addEventListener('blur', setCountriesDel, true);

    function checkDeliveryInputs() {
        let retVal = true;
        
        if(setFirstNameDel() != true) return;
        if(setLastNameDel() != true) return;
        if(setStreetDel() != true) return;
        if(setZipDel() != true) return;
        if(setTownDel() != true) return;
        if(setCountriesDel() != true) return;

        return retVal;
    };
            
    function setFirstName() {
        let retVal = true;
        const firstNameValue = firstName.value.trim();

        if(firstNameValue == null || firstNameValue == '') {
            setErrorFor(firstName, 'Please enter a first name');
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
        
    function setLastName() {
        let retVal = true;
        const lastNameValue = lastName.value.trim();

        if(lastNameValue == null || lastNameValue == '') {
            setErrorFor(lastName, 'Please enter a last name');
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
        
    function setEmail() {
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

        
    function setStreet() {
        let retVal = true;
        const streetValue = street.value.trim();

        if(streetValue == null || streetValue == '') {
            setErrorFor(street, 'Enter your Street and Number.');
            retVal = false;
        } else {
            setSuccessFor(street, 'Success!');
        };
        return retVal;
    };

        
    function setZip() {
        let retVal = true;
        const zipValue = parseFloat(zip.value.trim());

        if(zipValue == null || zipValue == '') {
            setErrorFor(zip, 'Please enter your Postal Code');
            retVal = false;
        } else if(isNaN(zipValue)) {
            setErrorFor(zip, 'Postal Code must be a number.');
            retVal = false;
        }else {
            setSuccessFor(zip, 'Success!');
        };
        return retVal;
    };

        
    function setTown() {
        let retVal = true;
        const townValue = town.value.trim();

        if(townValue == null || townValue == '') {
            setErrorFor(town, 'Please enter a city');
            retVal = false;
        } else {
            setSuccessFor(town, 'Success!');
        };
        return retVal;
    };

        
    function setCountries() {
        let retVal = true;
        const countryValue = countries.value;

        if(countryValue == '') {
            setErrorFor(countries, 'Select your Country.');
            retVal = false;
        } else {
            setSuccessFor(countries, 'Success!');
        };
        return retVal;
    };

    ///////////////////////// Delivery validation ////////////////////////
    function setFirstNameDel() {
        let retVal = true;
        const firstNameDelValue = firstNameDel.value.trim();

        if(firstNameDelValue == null || firstNameDelValue == '' ) {
            setErrorFor(firstNameDel, 'First name cannot be blank.');
            retVal = false;
        } else if(firstNameDelValue.charAt(0) != firstNameDelValue.charAt(0).toUpperCase()) {
            setErrorFor(firstNameDel, 'First character must by uppercase.');
            retVal = false;
        } else if(firstNameDelValue.length < 3) {
            setErrorFor(firstNameDel, 'First name must be at least 3 characters long.');
            retVal = false;
        } else {
            setSuccessFor(firstNameDel, 'Success!');
        };

        return retVal;
    };

    function setLastNameDel() {
        let retVal = true;
        const lastNameDelValue = lastNameDel.value.trim();

        if(lastNameDelValue == null || lastNameDelValue == '') {
            setErrorFor(lastNameDel, 'Last name cannot be blank.');
            retVal = false;
        } else if(lastNameDelValue.charAt(0) != lastNameDelValue.charAt(0).toUpperCase()) {
            setErrorFor(lastNameDel, 'First character must by uppercase.');
            retVal = false;
        } else if(lastNameDelValue.length < 3) {
            setErrorFor(lastNameDel, 'Last name must be at least 3 characters long.');
            retVal = false;
        } else {
            setSuccessFor(lastNameDel, 'Success!');
        };

        return retVal;
    };

    function setStreetDel() {
        let retVal = true;
        const streetDelValue = streetDel.value.trim();
        if(streetDelValue == null || streetDelValue == '') {
            setErrorFor(streetDel, 'Enter your Street and Number.');
            retVal = false;
        } else {
            setSuccessFor(streetDel, 'Success!');
        };

        return retVal;
    };

    function setZipDel() {
        let retVal = true;
        const zipDelValue = parseFloat(zipDel.value.trim());

        if(zipDelValue == null || zipDelValue == '') {
            setErrorFor(zipDel, 'Enter your Zip/Postcode.');
            retVal = false;
        } else if(isNaN(zipDelValue)) {
            setErrorFor(zipDel, 'Zip must be a number.');
            retVal = false;
        }else {
            setSuccessFor(zipDel, 'Success!');
        };

        return retVal;
    };

    function setTownDel() {
        let retVal = true;
        const townDelValue = townDel.value.trim();

        if(townDelValue == null || townDelValue == '') {
            setErrorFor(townDel, 'Enter your Town.');
            retVal = false;
        } else {
            setSuccessFor(townDel, 'Success!');
        };

        return retVal;
    };

    function setCountriesDel() {
        let retVal = true;
        const countryDelValue = countriesDel.value;

        if(countryDelValue == null || countryDelValue == '') {
            setErrorFor(countriesDel, 'Select your Country.');
            retVal = false;
        } else {
            setSuccessFor(countriesDel, 'Success!');
        };

        return retVal;
    };

    ////////////////////////////////// set Error / Success msg ////////////////////////////////
    function setErrorFor(input, message) {
        const inputCont = input.parentElement;
        const small = inputCont.querySelector('.verify');

        small.innerHTML = message;
        small.classList = 'verify error';

        input.style.border = '1px solid red';
    };

    function setSuccessFor(input, message) {
        const inputCont = input.parentElement;
        const small = inputCont.querySelector('.verify');

        small.innerHTML = message;
        small.classList = 'verify success';

        input.style.border = '1px solid black';
    };


    function checkDeliveryAddress() {
        const checkbox = document.querySelector('.checkbox');
        checkbox.addEventListener('change', function(e) {
            if(checkbox.checked == true) {
                document.querySelector('.delivery_legend').style.display = 'block';
                document.querySelector('.delivery_form_wrapper').style.display = 'block';
            } else {
                document.querySelector('.delivery_legend').style.display = 'none';
                document.querySelector('.delivery_form_wrapper').style.display = 'none';
            };
        });
    };
    checkDeliveryAddress();
}; /////////////////////////// !!! fetch end ////////////////////////////

function init() {
    // onPageLoad();
    fetchCountry();
};
init();


///////////////////////////// Accordion ///////////////////////////////////////
function accordionBtns() {
    const accBtn = document.querySelectorAll(".info_btn");

    accBtn.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const panel = this.nextElementSibling;
            
            if(panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.classList.remove('open');
                this.setAttribute('aria-expanded','false');
            } else{
                let active = document.querySelectorAll('.info_btn.active');
                active.forEach(a => {
                    a.classList.remove('active');
                    a.setAttribute('aria-expanded','false');
                    a.nextElementSibling.style.maxHeight = null;
                    a.nextElementSibling.classList.remove('open');
                });

                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add('open');
                this.setAttribute('aria-expanded','true');
            };

            this.classList.toggle('active');
        });
    });

    const paymantBtns = document.querySelectorAll('.radio_bank_btn');

    paymantBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const span = this.firstElementChild.lastElementChild;
            const panel = this.nextElementSibling;

            if(panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.classList.remove('open');
                this.setAttribute('aria-expanded','false');
                span.classList.remove('active');
                
            } else{
                let active = document.querySelectorAll('.radio_bank_btn.active');
                active.forEach(a => {
                    a.classList.remove('active');
                    a.setAttribute('aria-expanded','false');
                    a.nextElementSibling.style.maxHeight = null;
                    a.nextElementSibling.classList.remove('open');
                    a.firstElementChild.lastElementChild.classList.remove('active');
                });

                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add('open');
                this.setAttribute('aria-expanded','true');
                span.classList.add('active');
            };

            this.classList.toggle('active');
        });
    });
};
accordionBtns();