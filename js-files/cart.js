function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('logedUser') == null ? localStorage.getItem('localCartNumbers') : localStorage.getItem('userCartNumbers');
    if( productNumbers >= 1 ) {
        span(productNumbers);
        document.querySelector('.empty_cart').style.display = "none";
        document.querySelector('.cart_items_container').style.display = "block";
    } else {
        document.querySelectorAll('.shop span').forEach(s => {
            s.style.display = "none";
            document.querySelector('.empty_cart').style.display = "block";
            document.querySelector('.cart_items_container').style.display = "none";
        });
    };
};

//////////////////////////////// cartNumbers ///////////////////////////////////
function setCartNumbers(product, change) {
    if(localStorage.getItem('logedUser') == null) { 
        let productNumbers = parseInt(localStorage.getItem('localCartNumbers'));
        const cnKey = "localCartNumbers";
        cartNumbers(product, change, productNumbers, cnKey);
    } else {
        let productNumbers = parseInt(localStorage.getItem('userCartNumbers'));
        const cnKey = "userCartNumbers";
        cartNumbers(product, change, productNumbers, cnKey);
    };
};


function cartNumbers(product, change, productNumbers, cnKey) {
    if(change) {
        localStorage.setItem(cnKey, productNumbers - 1);
        span(productNumbers - 1);
    } else if(productNumbers) {
        localStorage.setItem(cnKey, productNumbers + 1);
        span(productNumbers + 1);
    } else {
        localStorage.setItem(cnKey, 1);
        span(1);
    };
    
    setSetItems(product);
};

///////////////////////////////// setItems ///////////////////////////////////
function setSetItems(product) {
    if(localStorage.getItem('logedUser') == null) { 
        let cartItems = JSON.parse(localStorage.getItem('localProductsInCart'));
        setItems(product, cartItems);
    } else {
        let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
        setItems(product, cartItems);
    };
};

function setItems(product, cartItems) {
    if(cartItems != null){
        let currentProduct = product.name;
        if(cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            };
        };
        cartItems[currentProduct].inCart += 1;
    } else {
        product.inCart = 1
        cartItems = {
            [product.name]: product
        };
    };
    
    localStorage.getItem('logedUser') == null ? localStorage.setItem('localProductsInCart', JSON.stringify(cartItems)) : localStorage.setItem('userProductsInCart', JSON.stringify(cartItems));
};

//////////////////////////////////// SPAN ///////////////////////////////////
function span(number) {
    const numSpan = document.querySelectorAll('.shop span');

    numSpan.forEach(s => {
        s.textContent = `${number}`;
    });
};

///////////////////////////////// totalCost ///////////////////////////////////
function setTotalCost(product, action) {
    if(localStorage.getItem('logedUser') == null) { 
        let totalPrice = localStorage.getItem("localTotalCost");
        const tcKey = "localTotalCost"
        totalCost(product, action, totalPrice, tcKey)
    } else {
        let totalPrice = localStorage.getItem("userTotalCost");
        const tcKey = "userTotalCost"
        totalCost(product, action, totalPrice, tcKey)
    }
}

function totalCost(product, action, totalPrice, tcKey) {
    if(action) {
        totalPrice = parseInt(totalPrice);
        localStorage.setItem(tcKey, totalPrice - product.price);
    } else if(totalPrice != null) {        
        totalPrice = parseInt(totalPrice);
        localStorage.setItem(tcKey, totalPrice + product.price);    
    } else {
        localStorage.setItem(tcKey, product.price);
    };
};

///////////////////////// Display Cart /////////////////////////
function displayCart() {
    if(localStorage.getItem('logedUser') == null) {
        let cartItems = JSON.parse(localStorage.getItem('localProductsInCart'));
        let totalPrice = parseInt(localStorage.getItem("localTotalCost"));
        display(cartItems, totalPrice)
    } else {
        let cartItems = JSON.parse(localStorage.getItem('userProductsInCart'));
        let totalPrice = parseInt(localStorage.getItem("userTotalCost"));
        display(cartItems, totalPrice)
    };
    
    function display(cartItems, totalPrice) {
        const tp = document.querySelector('.total_price_value');
        const cartContainer = document.querySelector('.cart_items_container');
        
        if(cartItems && cartContainer) {
            cartContainer.innerHTML = '';
            tp.textContent = `€ ${totalPrice}`;
            Object.values(cartItems).map(item => {
                cartContainer.innerHTML += `
                    <div class="cart_item">
                        <div class="img_container">
                            <img src="${item.image}" alt="">
                        </div>
                        <div class="cart_info">
                            <div class="cart_info_left">
                                <p class="item_name">${item.name}</p>
                                <p class="item_stock">${item.stock === true ? 'In stock' : 'Available soon'}</p>
                                <button>
                                    <i class='far fa-trash-alt'></i>
                                </button>
                            </div>
                            <div class="cart_info_right">
                                <div class="cart_quantity">
                                    <i class="fa-solid fa-angle-left"></i>
                                    <span>${item.inCart}</span>
                                    <i class="fa-solid fa-angle-right"></i>
                                </div>
                                <span class="item_price">€ ${item.inCart * item.price}</span>
                            </div>
                        </div>
                    </div>
                    <hr>
                    `
                setDeleteButtons();
                setManageQuantity();
            });

            const stock = document.querySelectorAll('.item_stock');
                    
            for(let s of stock) {
                if(s.textContent === 'In stock') {
                    s.classList.add('green');
                } else {
                    s.classList.add('yellow');
                };
            };
        };
    };
    display();
};

//////////////////////////////////////// Quantaty /////////////////////////////////////////
function setManageQuantity() {
    if(localStorage.getItem('logedUser') == null) { 
        let cartItems = JSON.parse(localStorage.getItem("localProductsInCart"));
        const tcKey = "localProductsInCart";
        manageQuantity(cartItems, tcKey);
    } else {
        let cartItems = JSON.parse(localStorage.getItem("userProductsInCart"));
        const tcKey = "userProductsInCart";
        manageQuantity(cartItems, tcKey);
    };
};


function manageQuantity(cartItems, tcKey) {
    let decreaseButtons = document.querySelectorAll('.fa-angle-left');
    let increaseButtons = document.querySelectorAll('.fa-angle-right');
    let currentQuantity = 0;
    let currentProduct = '';
    
    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.parentElement.previousElementSibling.querySelector('.item_name').textContent;
            
            if(cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                setCartNumbers(cartItems[currentProduct], "decrease");
                setTotalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem(tcKey, JSON.stringify(cartItems));
                
                displayCart();
            };
        });

        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.parentElement.previousElementSibling.querySelector('.item_name').textContent;
                        
            cartItems[currentProduct].inCart += 1;
            setCartNumbers(cartItems[currentProduct]);
            setTotalCost(cartItems[currentProduct]);
            localStorage.setItem(tcKey, JSON.stringify(cartItems));

            displayCart();
        });
    };
};

/////////////////////////////////////// Delete Btns ////////////////////////////////////////////////
function setDeleteButtons() {
    if(localStorage.getItem('logedUser') == null) { 
        let cartItems = JSON.parse(localStorage.getItem("localProductsInCart"));
        let productNumbers = localStorage.getItem('localCartNumbers');
        let cartCost = localStorage.getItem("localTotalCost");
        const picKey = "localProductsInCart";
        const tcKey = "localTotalCost";
        const cnKey = "localCartNumbers";
        deleteButtons(cartItems, productNumbers, cartCost, picKey, cnKey, tcKey);
    } else {
        let cartItems = JSON.parse(localStorage.getItem("userProductsInCart"));
        let productNumbers = localStorage.getItem('userCartNumbers');
        let cartCost = localStorage.getItem("userTotalCost");
        const picKey = "userProductsInCart";
        const tcKey = "userTotalCost";
        const cnKey = "userCartNumbers";
        deleteButtons(cartItems, productNumbers, cartCost, picKey, cnKey, tcKey);
    };
};


function deleteButtons(cartItems, productNumbers, cartCost, picKey, cnKey, tcKey) {
    let deleteButtons = document.querySelectorAll('.fa-trash-alt'); 
    let productName;
    
    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            productName = deleteButtons[i].parentElement.previousElementSibling.previousElementSibling.textContent;
            
            localStorage.setItem(cnKey, productNumbers - cartItems[productName].inCart);
            localStorage.setItem(tcKey, cartCost - (cartItems[productName].price * cartItems[productName].inCart));
            
            delete cartItems[productName];
            localStorage.setItem(picKey, JSON.stringify(cartItems));
            
            displayCart();
            onLoadCartNumbers();
        });
    };
};
onLoadCartNumbers();
displayCart();