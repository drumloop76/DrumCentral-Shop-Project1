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
            document.querySelector('.buy_now_btn').style.background = 'rgba(0, 0, 0, 0.301)';
            document.querySelector('.buy_now_btn').style.cursor = 'not-allowed';
            document.querySelector('.buy_now_btn').setAttribute("disabled", "");
            localStorage.removeItem('shippingCost');
            // document.querySelector('.total_price').innerHTML = '€ 0';
            alert('Your cart is empty')
        };

        if(localStorage.getItem('logedUser') == null) return;    

        let firstNameValue = logedUser.firstName,
            lastNameValue = logedUser.lastName,
            emailValue = logedUser.email;

        firstName.value = firstNameValue;
        lastName.value = lastNameValue;
        email.value = emailValue;

        label();
    };
    onPageLoad();    
    
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

            // function messageModal() {
            //     // document.querySelector('.basket_products').innerHTML += `
            // }

            
            let totalQuantity = document.querySelector('.total_quantity');
            totalQuantity.innerHTML = itemsInCart;

            function shippingCosts() {
                let shipCostsSpan = document.querySelector('.shipping_costs_full');    
                let shipCostNumber = 0;
            
                if(itemsInCart < 5) {
                    shipCostsSpan.innerHTML = `€ 15`;
                    shipCostNumber = 15;
                } else if(itemsInCart == 5 || itemsInCart <= 10) {
                    shipCostsSpan.innerHTML = `€ 35`;
                    shipCostNumber = 35;
                } else if(itemsInCart > 10) {
                    shipCostsSpan.innerHTML = `€ 55`;
                    shipCostNumber = 55;
                } else if(itemsInCart == 0 || itemsInCart == null) {
                    console.log('000')
                    shipCostsSpan.innerHTML = `€ 0`;
                    shipCostNumber = 0;
                    localStorage.removeItem('shippingCost');
                };
                localStorage.setItem('shippingCost', shipCostNumber);
            };
            shippingCosts();

            let totalPrice = document.querySelector('.total_price');
            totalPrice.innerHTML = `€ ${totalCost + JSON.parse(localStorage.getItem("shippingCost"))}`;
        };
    };
    checkout();
});
////////////////////////////// label ///////////////////////////////
function label() {
    const inputEl = document.querySelectorAll('.form_control input');
    console.log()

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

////////////////////////////////////////////////////////////////////////////
//////////////////////////////// fetch API /////////////////////////////////
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
    const firstName = document.querySelector('#billing_first_name'),
        lastName = document.querySelector('#billing_last_name'),
        email = document.querySelector('#billing_email'),
        street = document.querySelector('#billing_street'),
        zip = document.querySelector('#billing_zip'),
        town = document.querySelector('#billing_town');
        
    const firstNameDel = document.querySelector('#delivery_first_name'),
        lastNameDel = document.querySelector('#delivery_last_name'),
        streetDel = document.querySelector('#delivery_street'),
        zipDel = document.querySelector('#delivery_zip'),
        townDel = document.querySelector('#delivery_town');


    const checkoutBtn = function() {
        document.querySelector('.buy_now_btn').addEventListener('click', function(e) {
            e.preventDefault();
            console.log(localStorage.getItem("localProductsInCart") == undefined, localStorage.getItem("userProductsInCart") == undefined)
            if(localStorage.getItem("localProductsInCart") == undefined || localStorage.getItem("userProductsInCart") == undefined) {

            }
            
            console.log(document.q)
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
                        };
                        if(inp == lastName) {
                            setErrorFor(lastName, 'Please enter a last name');
                        };
                        if(inp == email) {
                            setErrorFor(email, 'Please enter a valid e-mail address.');
                        };
                        if(inp == street) {
                            setErrorFor(street, 'Enter your Street and Number.');
                        };
                        if(inp == zip) {
                            setErrorFor(zip, 'Enter your Postal Code');
                        };
                        if(inp == town) {
                            setErrorFor(town, 'Please enter a city');
                        };
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
                        };
                        if(inp == lastNameDel) {
                            setErrorFor(lastNameDel, 'Please enter a last name');
                        };
                        if(inp == streetDel) {
                            setErrorFor(streetDel, 'Enter your Street and Number.');
                        };
                        if(inp == zipDel) {
                            setErrorFor(zipDel, 'Enter your PostCode');
                        };
                        if(inp == townDel) {
                            setErrorFor(townDel, 'Please enter a city');
                        };
                        if(inp == countriesDel) {
                            setErrorFor(countriesDel, 'Select your Country.');
                        };
                    };
                });
            };

            

            if(checkCCInputs() != true) {
                document.querySelectorAll('.form_container input').forEach(inp => {                
                    const inputCont = inp.parentElement;
                    const small = inputCont.querySelector('.verify');

                    if(small.innerHTML !== 'Success!') {
                        if(inp == ccFullName) {
                            setErrorFor(ccFullName, 'Please enter your full name');
                        };
                        if(inp == ccNumber) {
                            setErrorFor(ccNumber, 'Please enter credit card number');
                        };
                        if(inp == ccExpDate) {
                            setErrorFor(ccExpDate, 'Please enter card expiration date.');
                        };
                        if(inp == ccSecCode) {
                            setErrorFor(ccSecCode, 'Please enter valid security code');
                        };
                    };
                });
            };

            if(checkBillingInputs() != true || checkDeliveryInputs() != true || checkCCInputs() != true && document.querySelector('.checkbox').checked == false)


            console.log(checkBillingInputs() != true, checkDeliveryInputs() != true, checkCCInputs() != true)
            if((checkBillingInputs() != true && document.querySelector('.checkbox').checked != false) || checkCCInputs() != true) {
                console.log('no 1')
            } else if(checkBillingInputs() != true || checkDeliveryInputs() != true || checkCCInputs() != true && document.querySelector('.checkbox').checked == false){
                console.log('no2')
            } else {
                console.log('yes')
            }

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

            const shippingCosts = localStorage.getItem('shippingCost');
            console.log(shippingCosts)

            if(checkBillingInputs() == true && document.querySelector('.checkbox').checked == false && checkCCInputs() == true) {
                console.log('aaa')
                let billingData = JSON.parse(localStorage.getItem('checkBillingData')) || [];
                billingData.push({firstNameVal, lastNameVal, emailVal, streetVal, townVal, zipVal, countryVal, phoneVal, user});
                localStorage.setItem('checkBillingData', JSON.stringify(billingData));

                let deliveryData = JSON.parse(localStorage.getItem('checkDeliveryData')) || [];
                deliveryData.push({firstNameVal, lastNameVal, streetVal, townVal, zipVal, countryVal});
                localStorage.setItem('checkDeliveryData', JSON.stringify(deliveryData));
                setCheckCCInputs()
            } else if(checkBillingInputs() == true && checkDeliveryInputs() == true && document.querySelector('.checkbox').checked == true && checkCCInputs() == true) {
                console.log('bbb')
                let billingData = JSON.parse(localStorage.getItem('checkBillingData')) || [];
                billingData.push({firstNameVal, lastNameVal, emailVal, streetVal, townVal, zipVal, countryVal, phoneVal, user, });
                localStorage.setItem('checkBillingData', JSON.stringify(billingData));

                let deliveryData = JSON.parse(localStorage.getItem('checkDeliveryData')) || [];
                deliveryData.push({firstNameDelVal, lastNameDelVal, streetDelVal, townDelVal, zipDelVal, countryDelVal, user});
                localStorage.setItem('checkDeliveryData', JSON.stringify(deliveryData));
                setCheckCCInputs()
            };

            function setCheckCCInputs() {
                if(checkCCInputs() == true) {
                    if(ccType == 'visa') {
                        ccType = 'Visa Card';
                    } else if (ccType == 'visa') {
                        ccType = 'Visa Card';
                    } else if (ccType == 'visa') {
                        ccType = 'Visa Card';
                    };
    
                    const ccFullNameValue = ccFullName.value,
                        ccNumberValue = ccNumber.value,
                        ccExpDateValue = ccExpDate.value,
                        ccSecCodeValue = ccSecCode.value;
                    
                    let checkCC = JSON.parse(localStorage.getItem('checkCC')) || [];
                    checkCC.push({ccFullNameValue, ccNumberValue, ccExpDateValue, ccSecCodeValue, ccType});
                    localStorage.setItem('checkCC', JSON.stringify(checkCC));
                };
            }
            


        });
    };
    checkoutBtn();


    firstName.addEventListener('blur', setFirstName, true);
    lastName.addEventListener('blur', setLastName, true);
    email.addEventListener('blur', setEmail, true);
    street.addEventListener('blur', setStreet, true);
    zip.addEventListener('blur', setZip, true);
    town.addEventListener('blur', setTown, true);
    countries.addEventListener('change', setCountries, true);


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
    countriesDel.addEventListener('change', setCountriesDel, true);

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
};



/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// CC ///////////////////////////////////////////


//////////////////////////////// set card type & input fields ////////////////////////////////
const ccFullName = document.querySelector('#cc_name'),
    ccNumber = document.querySelector('#cc_number'),
    ccExpDate = document.querySelector('#cc_exp_date'),
    ccSecCode = document.querySelector('#cc_security_code');

let ccType = '';
function choseCC() {
    const ccLink = document.querySelectorAll('.cards a');
    const spanPic = document.querySelector('#cc_number').nextElementSibling;   
    const verify = 
    ccLink.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.form_container').classList.add('show_form');

            if(this.getAttribute('class') === 'visa') {
                spanPic.innerHTML = `<img class="visa" src="/images/checkout/visa-panel.png">`;
                ccType = 'visa';
                setFields(ccNumber, ccSecCode, ccExpDate, '4xxx xxxx xxxx xxxx', 'xxxx');
            } else if(this.getAttribute('class') === 'master') {
                spanPic.innerHTML = `<img class="master" src="/images/checkout/master-panel.png">`;
                ccType = 'master';
                setFields(ccNumber, ccSecCode, ccExpDate, '5xxx xxxx xxxx xxxx', 'xxxx');
            } else if(this.getAttribute('class') === 'american') {
                spanPic.innerHTML = `<img class="american" src="/images/checkout/american-panel.png">`;
                ccType = 'american';
                setFields(ccNumber, ccSecCode, ccExpDate, '3xxx xxxxxx xxxxx', 'xxx');
            };
        });
    });
};
choseCC();

function setFields(numInput, secInput, expFormat, numFormat, secFormat) {
    numInput.setAttribute('placeholder', numFormat);
    numInput.value = '';
    numInput.parentElement.querySelector('.verify').textContent = '';
    
    secInput.setAttribute('placeholder', secFormat);
    secInput.value = '';
    secInput.parentElement.querySelector('.verify').textContent = '';
    
    expFormat.setAttribute('placeholder', 'MM/YY');
    expFormat.value = '';
    expFormat.parentElement.querySelector('.verify').textContent = '';
}

//////////////////////////////// CC Full Name ////////////////////////////////
ccFullName.addEventListener('keyup', ccFullNameInput);

function ccFullNameInput(e) {
    const string = ccFullName.value;
    let sp = string.split(' ')
    let word = new Array();
    let f,l;

    for(let i=0 ; i<sp.length ; i++) {            
        f = sp[i].substring(0,1).toUpperCase(); 
        l = sp[i].substring(1).toLowerCase(); 
        word[i] = f + l;            
    }
    e.target.value = word.join(' ');
}

//////////////////////////////// CC Number Input ////////////////////////////////
ccNumber.addEventListener('keyup', ccNumInput);

function ccNumInput() {
    let ccNumStr = ccNumber.value
    
    ccNumStr = ccNumStr.replace(/[^0-9]/g, '');
    
    let typeCheck = ccNumStr.substring(0, 2);
    let ccType = '';
    let group1 = '';
    let group2 = '';
    let group3 = '';
    let group4 = '';
    let form = '';

    if(typeCheck.length == 2) {
        typeCheck = parseInt(typeCheck);
        if(typeCheck >= 40 && typeCheck <= 49) {
            ccType = 'Visa';
        } else if(typeCheck >= 51 && typeCheck <= 59) {
            ccType = 'Master Card';
        } else if(typeCheck == 34 || typeCheck == 37) {
            ccType = 'American Express';
        } else {
            ccType = 'Invalid';
        };
    };

    group1 = ccNumStr.substring(0, 4);
        if (group1.length == 4) {
            group1 = group1 + ' ';
        };

        if (ccType == 'Visa' || ccType == 'Master Card') {
            group2 = ccNumStr.substring(4, 8);
            if (group2.length == 4) {
                group2 = group2 + ' ';
            };
            group3 = ccNumStr.substring(8, 12);
            if (group3.length == 4) {
                group3 = group3 + ' ';
            };
            group4 = ccNumStr.substring(12, 16);

        } else if (ccType == 'American Express') {
            group2 =  ccNumStr.substring(4, 10);
            
            if (group2.length == 6) {
                group2 = group2 + ' ';
            };

            group3 =  ccNumStr.substring(10, 15);
            group4 = '';

        } else if (ccType == 'Invalid') {
            // American Express 34 or 37
            group1 = typeCheck;
            group2='';
            group3='';
            group4='';

            setErrorFor(ccNumber, 'First two digits must be 34 or 37.');                
        };

        form = group1 + group2 + group3 + group4;
        ccNumber.value = form;
};

function ccExpInput() {
    ccExpDate.addEventListener('keyup', function(e) {
        let ccExpStr = ccExpDate.value;
        let numOfKeys = [8];
        
        if(numOfKeys.indexOf(ccExpStr) !== -1) return;
        
        e.target.value = e.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/'
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/'
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2'
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
        ).replace(
            /^([0]+)\/|[0]+$/g, '0'
        ).replace(
            /[^\d\/]|^[\/]*$/g, ''
        ).replace(
            /\/\//g, '/'
        );            
    });        
};
ccExpInput();

function ccSecCodeInput() {
    ccSecCode.addEventListener('keyup', function(e) {            
        if (ccType == 'visa' || ccType == 'master') {
            e.target.setAttribute('maxlength', '4');
        }else if (ccType == 'american') {
            e.target.setAttribute('maxlength', '3');
        };
    });
};
ccSecCodeInput();

//////////////////////////////// CC Validation ////////////////////////////////
ccFullName.addEventListener('blur', setFullName, true);
ccNumber.addEventListener('blur', setCCNumber, true);
ccExpDate.addEventListener('blur', setExpDate, true);
ccSecCode.addEventListener('blur', setSecCodeDate, true);

function checkCCInputs() {
    let retVal = true;
    
    if(setFullName() != true) return;
    if(setCCNumber() != true) return;
    if(setExpDate() != true) return;
    if(setSecCodeDate() != true) return;

    return retVal;
};

function setFullName() {
    let retVal = true;
    const ccFullNameValue = ccFullName.value.trim();

    if(ccFullNameValue == null || ccFullNameValue == '') {
        setErrorFor(ccFullName, 'Please enter your full name');
        retVal = false;
    } else if(ccFullNameValue.charAt(0) != ccFullNameValue.charAt(0).toUpperCase()) {
        setErrorFor(ccFullName, 'First character must by uppercase.');
        retVal = false;
    } else {
        setSuccessFor(ccFullName, 'Success!');
    };

    return retVal;
};

function setCCNumber() {
    const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterRegEx = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
    const americanRegEx = /^3[47][0-9]{13}$/;
    
    const ccNumberValue = Number(ccNumber.value.replace(/\s/g, ''));
    let retVal = true;

    // 4155279860457
    // 5114496353984312
    // 341256789012345
    if(ccNumberValue == '') {
        setErrorFor(ccNumber, 'Please enter your credit card number.');
        retVal = false;
    } else if(ccType === 'visa' && !visaRegEx.test(ccNumberValue)) {
        setErrorFor(ccNumber, 'Please enter a valid credit card number.');
        retVal = false;
    } else if(ccType === 'master' && !masterRegEx.test(ccNumberValue)) {    
        setErrorFor(ccNumber, 'Please enter a valid credit card number.');    
        retVal = false;
    } else if(ccType === 'american' && !americanRegEx.test(ccNumberValue)) {  
        setErrorFor(ccNumber, 'Please enter a valid credit card number.');      
        retVal = false;
    } else {
        // console.log('ok', ccType, ccNumberValue)
        setSuccessFor(ccNumber, 'Success!');
    };

    return retVal
};

function setExpDate() {
    let retVal = true;
    let expNum = ccExpDate.value;
    let newStr = expNum.replace('/', '');    
    
    const date = new Date()
    const month = date.getMonth() + 1;
    const year = date.getYear() - 100;
    let today = ''
    let tMM = Number(today.concat(0, month))
    let MM = Number(expNum.slice(0, 2));
    let YY = Number(expNum.slice(3, 5));


    if(newStr == null || newStr == '') {
        setErrorFor(ccExpDate, 'Please enter card expiration date');
        retVal = false;
    } else if(MM < tMM) {
        setErrorFor(ccExpDate, 'Your card has expired (MM)!');
        retVal = false;
    } else if(YY < year) {
        setErrorFor(ccExpDate, 'Your card has expired (YY)!');
        retVal = false;
    } else if (newStr.length != 4) {
        setErrorFor(ccExpDate, 'Format shold be mm/yy');
        retVal = false;
    } else {
        setSuccessFor(ccExpDate, 'Success!');
    };

    return retVal;
};

function setSecCodeDate() {
    let retVal = true;
    const ccSecCodeValue = ccSecCode.value.trim(); 

    if(ccSecCodeValue == null || ccSecCodeValue == '' || ccSecCodeValue == NaN) {
        setErrorFor(ccSecCode, 'Please enter valid security code');
        retVal = false;
    } else if ((ccType == 'visa' || ccType == 'master') && ccSecCodeValue.length != 4) {
        setErrorFor(ccSecCode, 'Please enter 4 digits');
        retVal = false;
    } else if (ccType == 'american' && ccSecCodeValue.length != 3) {
        setErrorFor(ccSecCode, 'Please enter 3 digits');
        retVal = false;
    }else {
        setSuccessFor(ccSecCode, 'Success!');
    };

    return retVal;
};

//////////////////////////////// set Error / Success msg ////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Accordions ///////////////////////////////////////
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

function init() {
    // onPageLoad();
    fetchCountry();
};
init();